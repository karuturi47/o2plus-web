/**
 * Client-side fetch helper for the internal Admin/Super User pages. Sends
 * requests to our own Next.js API routes (which proxy to the Java backend),
 * and bounces to the login page on 401/403 since that means the session
 * cookie is missing, expired, or wrong-role.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (res.status === 401 || res.status === 403) {
    // Full reload (not router.push) is intentional: this clears any stale
    // client state left over from the expired/invalid session.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error((data && data.message) || `Request failed (${res.status})`);
  }
  return data as T;
}
