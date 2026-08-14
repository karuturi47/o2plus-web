import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROLE_COOKIE, SESSION_MAX_AGE_SECONDS, TOKEN_COOKIE } from "@/lib/adminAuth";

const JAVA_API_URL = process.env.JAVA_API_URL ?? "http://localhost:8080";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${JAVA_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Login failed" }));
    return NextResponse.json(err, { status: res.status });
  }

  const data: { token: string; role: string; username: string } = await res.json();

  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, data.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  cookieStore.set(ROLE_COOKIE, data.role, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ role: data.role, username: data.username });
}
