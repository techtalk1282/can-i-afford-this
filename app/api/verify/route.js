/**
 * File: app/api/verify/route.js
 * Version: v1.1
 * Date: 2026-04-22
 *
 * Purpose:
 * - Verify CIAT premium unlock from KV
 * - Set premium cookie after webhook-confirmed payment
 * - Use the correct relative import path for the CIAT project
 *
 * Rollback:
 * - Revert to prior app/api/verify/route.js if needed
 */

import { NextResponse } from "next/server";
import { readUnlockStatus } from "../../../lib/storage/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json(
        { ok: false, reason: "missing_session_id" },
        { status: 400 }
      );
    }

    console.log(`UNLOCK_READ: Verifying unlock for session ${session_id}`);

    const unlockStatus = await readUnlockStatus(session_id);

    if (!unlockStatus) {
      console.log(
        `UNLOCK_READ: No unlock found in KV for ${session_id}, webhook pending`
      );

      return NextResponse.json(
        { ok: false, reason: "webhook_pending", retry: true },
        { status: 200 }
      );
    }

    console.log(
      `UNLOCK_READ: Unlock confirmed in KV for ${session_id}, setting cookie`
    );

    const res = NextResponse.json({ ok: true });

    res.cookies.set("premium", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return res;
  } catch (err) {
    console.error("UNLOCK_READ: verify error:", err);

    return NextResponse.json(
      { ok: false, reason: "verify_exception" },
      { status: 500 }
    );
  }
}
