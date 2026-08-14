import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "../apiClient";

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("apiFetch", () => {
  const originalFetch = global.fetch;
  const originalLocation = window.location;

  beforeEach(() => {
    // window.location.href assignment isn't implemented in jsdom navigation - stub it out.
    // @ts-expect-error - deliberately replacing location for the redirect assertion below
    delete window.location;
    window.location = { ...originalLocation, href: "" } as Location;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    window.location = originalLocation;
    vi.restoreAllMocks();
  });

  it("returns parsed JSON on a successful response", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ hello: "world" }));

    const result = await apiFetch<{ hello: string }>("/api/whatever");

    expect(result).toEqual({ hello: "world" });
  });

  it("sends a Content-Type header when a body is present", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}));
    global.fetch = fetchMock;

    await apiFetch("/api/thing", { method: "POST", body: JSON.stringify({ a: 1 }) });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers["Content-Type"]).toBe("application/json");
  });

  it("throws with the server's message when the response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ message: "Nope" }, 400));

    await expect(apiFetch("/api/thing")).rejects.toThrow("Nope");
  });

  it("redirects to the admin login page on 401", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse(null, 401));

    await expect(apiFetch("/api/admin/products")).rejects.toThrow("Unauthorized");
    expect(window.location.href).toBe("/admin/login");
  });

  it("redirects to the admin login page on 403", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse(null, 403));

    await expect(apiFetch("/api/inventory")).rejects.toThrow("Unauthorized");
    expect(window.location.href).toBe("/admin/login");
  });
});
