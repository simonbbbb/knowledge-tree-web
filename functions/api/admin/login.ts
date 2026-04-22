import { error, json, type Env } from "../../_shared/db";
import {
  createSessionCookie,
  constantTimeEqual,
} from "../../_shared/session";

interface Body {
  password?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.ADMIN_PASSWORD) {
    return error(500, "Server not configured: ADMIN_PASSWORD missing");
  }
  if (!env.SESSION_SECRET) {
    return error(500, "Server not configured: SESSION_SECRET missing");
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return error(400, "Invalid JSON body");
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!password) return error(400, "Missing password");

  const ok = await constantTimeEqual(password, env.ADMIN_PASSWORD);
  if (!ok) {
    // Constant-ish delay to further smooth out timing
    await new Promise((r) => setTimeout(r, 250));
    return error(401, "Invalid password");
  }

  const cookie = await createSessionCookie("admin", env.SESSION_SECRET);
  return json({ ok: true }, { headers: { "set-cookie": cookie } });
};

export const onRequest: PagesFunction<Env> = async ({ request }) => {
  if (request.method === "POST") return error(500, "Router misconfigured");
  return error(405, "Method not allowed", { allow: "POST" });
};
