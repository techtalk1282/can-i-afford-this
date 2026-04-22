/**
 * File: app/api/checkout/route.js
 * Version: v1.0
 * Date: 2026-04-22
 *
 * Purpose:
 * - Create the CIAT Stripe checkout session
 * - Use the CIAT STRIPE_PRICE_ID from this project
 * - Keep checkout isolated from Best Meeting Time
 *
 * Rollback:
 * - Safe to delete this file if payment flow wiring needs to be backed out
 */

import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

function requireEnv(name) {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing env: ${name}`);
  }

  return value.trim();
}

const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  try {
    const origin = req.headers.get("origin");

    if (!origin) {
      return NextResponse.json(
        { error: "Unable to determine request origin" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: requireEnv("STRIPE_PRICE_ID"),
          quantity: 1,
        },
      ],
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancel`,
      metadata: {
        app: "can-i-afford-this",
        unlock_type: "premium",
        created_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("CIAT_STRIPE_CHECKOUT_ERROR:", err);

    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Stripe checkout failed",
      },
      { status: 500 }
    );
  }
}
