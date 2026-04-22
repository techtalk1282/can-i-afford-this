/**
 * File: lib/storage/kv.js
 * Version: v1.0
 * Date: 2026-04-22
 *
 * Purpose:
 * - Provide CIAT KV helpers for Stripe unlock state
 * - Mirror the stable Best Meeting Time KV unlock pattern
 *
 * Rollback:
 * - Safe to delete this file if payment flow wiring needs to be backed out
 */

import { kv } from "@vercel/kv";

/**
 * Unlock status shape stored in KV
 */
function buildUnlockStatus() {
  return {
    unlocked: true,
    unlockedAt: new Date().toISOString(),
  };
}

/**
 * Detect which KV env vars are present
 * Prefer KV_* pair used by Best Meeting Time
 */
function getKVConfig() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return {
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
      source: "KV_*",
    };
  }

  if (
    process.env.NEWKV_KV_REST_API_URL &&
    process.env.NEWKV_KV_REST_API_TOKEN
  ) {
    return {
      url: process.env.NEWKV_KV_REST_API_URL,
      token: process.env.NEWKV_KV_REST_API_TOKEN,
      source: "NEWKV_*",
    };
  }

  return null;
}

/**
 * Read unlock status from KV
 */
export async function readUnlockStatus(sessionId) {
  const cfg = getKVConfig();

  if (!cfg) {
    console.error("UNLOCK_READ: No KV env vars found");
    return null;
  }

  const key = `paid:session:${sessionId}`;
  console.log(`UNLOCK_READ: Using ${cfg.source}, key=${key}`);

  const value = await kv.get(key);
  return value ?? null;
}

/**
 * Write unlock status to KV
 * Only webhook route should call this
 */
export async function writeUnlockStatus(sessionId) {
  const cfg = getKVConfig();

  if (!cfg) {
    throw new Error("UNLOCK_WRITE: No KV env vars found");
  }

  const key = `paid:session:${sessionId}`;
  const value = buildUnlockStatus();

  console.log(`UNLOCK_WRITE: Using ${cfg.source}, key=${key}`);

  await kv.set(key, value, {
    ex: 60 * 60 * 24 * 365,
  });
}

/**
 * Idempotency check
 */
export async function hasUnlockStatus(sessionId) {
  const cfg = getKVConfig();

  if (!cfg) {
    return false;
  }

  const key = `paid:session:${sessionId}`;
  const value = await kv.get(key);

  return value !== null;
}
