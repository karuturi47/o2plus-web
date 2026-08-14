import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminLoginForm from "../AdminLoginForm";

const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

function jsonResponse(body: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

describe("AdminLoginForm", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    pushMock.mockClear();
    refreshMock.mockClear();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("defaults to the Admin tab and routes to /admin/pricing on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ role: "ADMIN", username: "admin" }));
    global.fetch = fetchMock;
    const user = userEvent.setup();

    render(<AdminLoginForm />);

    await user.type(screen.getByLabelText("Username"), "admin");
    await user.type(screen.getByLabelText("Password"), "changeme123");
    await user.click(screen.getByRole("button", { name: "Admin Login" }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/admin-login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ username: "admin", password: "changeme123" }),
      })
    );
    expect(pushMock).toHaveBeenCalledWith("/admin/pricing");
  });

  it("routes to /admin/inventory when logging in on the Super User tab", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ role: "SUPER_USER", username: "superuser" }));
    const user = userEvent.setup();

    render(<AdminLoginForm />);

    await user.click(screen.getByRole("button", { name: "Super User" }));
    await user.type(screen.getByLabelText("Username"), "superuser");
    await user.type(screen.getByLabelText("Password"), "changeme123");
    await user.click(screen.getByRole("button", { name: "Super User Login" }));

    expect(pushMock).toHaveBeenCalledWith("/admin/inventory");
  });

  it("shows the server's error message and does not navigate on failed login", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ message: "Invalid username or password" }, 401));
    const user = userEvent.setup();

    render(<AdminLoginForm />);

    await user.type(screen.getByLabelText("Username"), "admin");
    await user.type(screen.getByLabelText("Password"), "wrong");
    await user.click(screen.getByRole("button", { name: "Admin Login" }));

    expect(await screen.findByText("Invalid username or password")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("shows a connection error message when the request throws", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));
    const user = userEvent.setup();

    render(<AdminLoginForm />);

    await user.type(screen.getByLabelText("Username"), "admin");
    await user.type(screen.getByLabelText("Password"), "changeme123");
    await user.click(screen.getByRole("button", { name: "Admin Login" }));

    expect(await screen.findByText(/couldn't reach the server/i)).toBeInTheDocument();
  });
});
