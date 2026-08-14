import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_COOKIE } from "./adminAuth";

const JAVA_API_URL = process.env.JAVA_API_URL ?? "http://localhost:8080";

/**
 * Forwards a request to the Java backend, attaching the admin/super-user JWT
 * (read from the httpOnly cookie) as a Bearer token. The token never reaches
 * browser JS - only this server-side code ever sees it.
 */
export async function proxyToJava(path: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  const headers: Record<string, string> = { ...(init?.headers as Record<string, string>) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (init?.body) headers["Content-Type"] = "application/json";

  const res = await fetch(`${JAVA_API_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  return NextResponse.json(body, { status: res.status });
}
