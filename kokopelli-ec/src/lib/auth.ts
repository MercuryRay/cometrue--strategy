import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "kk_session";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

function getSecret(): string {
  const secret = process.env.MAGIC_LINK_SECRET;
  if (!secret) throw new Error("MAGIC_LINK_SECRET is not set");
  return secret;
}

export function createMagicToken(customerId: string, email: string): string {
  return jwt.sign({ customerId, email }, getSecret(), { expiresIn: "15m" });
}

export function verifyMagicToken(token: string): { customerId: string; email: string } {
  return jwt.verify(token, getSecret()) as { customerId: string; email: string };
}

export function createSessionToken(customerId: string, email: string): string {
  return jwt.sign({ customerId, email }, getSecret(), { expiresIn: "7d" });
}

export function verifySessionToken(token: string): { customerId: string; email: string } | null {
  try {
    return jwt.verify(token, getSecret()) as { customerId: string; email: string };
  } catch {
    return null;
  }
}

export async function setSessionCookie(customerId: string, email: string) {
  const token = createSessionToken(customerId, email);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function getSession(): Promise<{ customerId: string; email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
