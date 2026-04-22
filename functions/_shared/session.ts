/**
 * Tiny signed-cookie session for the admin panel.
 *
 * Stores `{iat, exp, sub}` in an HMAC-SHA256 signed cookie. No DB round-trip
 * per request, no external dependencies, revocable only by rotating
 * SESSION_SECRET.
 */

const COOKIE_NAME = "kt_admin_session";
const TTL_SECONDS = 60 * 60 * 8; // 8 hours

interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createSessionCookie(
  subject: string,
  secret: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: Payload = {
    sub: subject,
    iat: now,
    exp: now + TTL_SECONDS,
  };
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  const token = `${body}.${b64url(sig)}`;
  return buildCookie(COOKIE_NAME, token, TTL_SECONDS);
}

export function clearSessionCookie(): string {
  return buildCookie(COOKIE_NAME, "", 0);
}

export async function verifySessionCookie(
  cookieHeader: string | null,
  secret: string,
): Promise<Payload | null> {
  if (!cookieHeader) return null;
  const raw = readCookie(cookieHeader, COOKIE_NAME);
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 2) return null;
  const [body, sigB64] = parts;
  const key = await hmacKey(secret);
  const sig = b64urlDecode(sigB64);
  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    sig as BufferSource,
    enc.encode(body),
  );
  if (!ok) return null;
  try {
    const payload = JSON.parse(dec.decode(b64urlDecode(body))) as Payload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function buildCookie(name: string, value: string, maxAge: number): string {
  const parts = [
    `${name}=${value}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  return parts.join("; ");
}

function readCookie(header: string, name: string): string | null {
  const parts = header.split(/;\s*/);
  for (const p of parts) {
    const idx = p.indexOf("=");
    if (idx === -1) continue;
    if (p.slice(0, idx) === name) return p.slice(idx + 1);
  }
  return null;
}

/**
 * Uses constant-time comparison to avoid timing side channels when checking
 * the admin password.
 */
export async function constantTimeEqual(a: string, b: string): Promise<boolean> {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}
