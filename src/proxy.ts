import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROLE_COOKIE } from "@/lib/adminAuth";

/**
 * Gates the internal-only Admin/Super User pages. Not linked from the public
 * site - reachable only by direct URL, and only usable after a real login
 * against the Java backend (see /admin/login).
 *
 * This only checks for the *presence* of the right role cookie so a page
 * doesn't even render for the wrong role. The Java backend independently
 * re-validates the JWT signature/expiry on every API call, so a stale or
 * tampered cookie just results in a 401 from the API and a redirect back to
 * login from the client.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get(ROLE_COOKIE)?.value;

  if (pathname.startsWith("/admin/pricing") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/admin/inventory") && role !== "SUPER_USER") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/pricing/:path*", "/admin/inventory/:path*"],
};
