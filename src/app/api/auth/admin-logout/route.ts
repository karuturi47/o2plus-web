import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROLE_COOKIE, TOKEN_COOKIE } from "@/lib/adminAuth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(ROLE_COOKIE);
  return NextResponse.json({ ok: true });
}
