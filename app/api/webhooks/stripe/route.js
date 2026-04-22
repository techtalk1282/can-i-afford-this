/**
 * File: app/api/webhooks/stripe/route.js
 * Version: v1.0
 * Date: 2026-04-22
 *
 * Purpose:
 * - Handle CIAT Stripe webhook events
 * - Write paid session unlock state to KV
 * - Keep CIAT payment unlock flow isolated from Best Meeting Time
 *
 * Rollback:
 * - Safe to delete this file if payment flow wiring needs to be backed out
 */

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { hasUnlockStatus, writeUnlockStatus } from "../../../../lib/storage/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function requireEnv(name) {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing env: ${name}`);
  }

  return value.trim();
}

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("STRIPE_WEBHOOK: Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
    apiVersion: "2024-06-20",
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      requireEnv("STRIPE_WEBHOOK_SECRET")
    );

    console.log(`STRIPE_WEBHOOK: Verified event ${event.id} (${event.type})`);
  } catch (err) {
    console.error(
      `STRIPE_WEBHOOK: Signature verification failed: ${err.message}`
    );

    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (!session.id) {
      console.error("STRIPE_WEBHOOK: Missing session.id");
      return NextResponse.json({ received: true });
    }

    console.log(
      `STRIPE_WEBHOOK: Processing session ${session.id} | payment_status=${session.payment_status}`
    );

    if (session.payment_status !== "paid") {
      console.log(
        `STRIPE_WEBHOOK: Session ${session.id} not paid yet. Skipping.`
      );
      return NextResponse.json({ received: true });
    }

    try {
      const alreadyUnlocked = await hasUnlockStatus(session.id);

      if (alreadyUnlocked) {
        console.log(
          `STRIPE_WEBHOOK: Session ${session.id} already unlocked.`
        );
        return NextResponse.json({ received: true });
      }

      const kvKey = `paid:session:${session.id}`;
      console.log("KV_WRITE_KEY =", kvKey);

      await writeUnlockStatus(session.id);

      console.log(
        `STRIPE_WEBHOOK: Successfully wrote unlock for ${session.id}`
      );
    } catch (err) {
      console.error(
        `STRIPE_WEBHOOK: KV write failed for ${session.id}`,
        err
      );

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  }

  console.log(`STRIPE_WEBHOOK: Unhandled event type ${event.type}`);
  return NextResponse.json({ received: true });
}
