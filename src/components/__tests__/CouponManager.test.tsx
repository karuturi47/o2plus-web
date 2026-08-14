import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CouponManager from "../CouponManager";

function jsonResponse(body: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

const existingCoupon = {
  id: 1,
  code: "WELCOME10",
  description: "First order",
  discountType: "PERCENT" as const,
  discountValue: 10,
  appliesToCustomerType: null,
  minOrderAmount: null,
  maxUses: 100,
  usedCount: 5,
  validFrom: null,
  validUntil: null,
  active: true,
};

describe("CouponManager", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("lists existing coupons", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse([existingCoupon]));

    render(<CouponManager />);

    expect(await screen.findByText("WELCOME10")).toBeInTheDocument();
    expect(screen.getByText(/10% off/)).toBeInTheDocument();
    expect(screen.getByText(/5\/100 used/)).toBeInTheDocument();
  });

  it("shows an empty state when there are no coupons", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse([]));

    render(<CouponManager />);

    expect(await screen.findByText(/no coupons yet/i)).toBeInTheDocument();
  });

  it("submits a new coupon and refreshes the list", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (init?.method === "POST") return Promise.resolve(jsonResponse({ ...existingCoupon, id: 2, code: "SAVE20" }));
      return Promise.resolve(jsonResponse([existingCoupon]));
    });
    global.fetch = fetchMock;
    const user = userEvent.setup();

    render(<CouponManager />);
    await screen.findByText("WELCOME10");

    await user.type(screen.getByLabelText("Code"), "save20");
    await user.type(screen.getByLabelText("Value (%)"), "20");
    await user.click(screen.getByRole("button", { name: "Add Coupon" }));

    const postCall = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
    expect(postCall).toBeTruthy();
    const body = JSON.parse((postCall as [string, RequestInit])[1].body as string);
    expect(body.code).toBe("save20");
    expect(body.discountValue).toBe(20);
  });

  it("toggles a coupon's active state", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (init?.method === "PATCH") return Promise.resolve(jsonResponse({ ...existingCoupon, active: false }));
      return Promise.resolve(jsonResponse([existingCoupon]));
    });
    global.fetch = fetchMock;
    const user = userEvent.setup();

    render(<CouponManager />);
    await screen.findByText("WELCOME10");

    await user.click(screen.getByRole("button", { name: "Active" }));

    expect(await screen.findByRole("button", { name: "Inactive" })).toBeInTheDocument();
  });

  it("removes a coupon from the list on delete", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (init?.method === "DELETE") return Promise.resolve(jsonResponse(null));
      return Promise.resolve(jsonResponse([existingCoupon]));
    });
    global.fetch = fetchMock;
    const user = userEvent.setup();

    render(<CouponManager />);
    await screen.findByText("WELCOME10");

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("WELCOME10")).not.toBeInTheDocument();
  });
});
