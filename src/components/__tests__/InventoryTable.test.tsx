import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InventoryTable from "../InventoryTable";

function jsonResponse(body: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

const item = {
  productId: 1,
  sku: "can-20l",
  name: "20L Water Can",
  packSize: "20L",
  quantityOnHand: 15,
  reorderThreshold: 20,
  lowStock: true,
};

const movement = {
  id: 1,
  sku: "can-20l",
  productName: "20L Water Can",
  changeQty: -5,
  reason: "SALE" as const,
  note: "counter sale",
  createdBy: "superuser",
  createdAt: "2026-08-01T10:00:00Z",
};

function mockInventoryFetch({
  items = [item],
  movements = [movement],
  onAdjust,
}: {
  items?: typeof item[];
  movements?: typeof movement[];
  onAdjust?: () => void;
} = {}) {
  return vi.fn().mockImplementation((url: string) => {
    if (url.endsWith("/adjust")) {
      onAdjust?.();
      return Promise.resolve(jsonResponse({}));
    }
    if (url.startsWith("/api/inventory/movements")) return Promise.resolve(jsonResponse(movements));
    if (url === "/api/inventory") return Promise.resolve(jsonResponse(items));
    return Promise.resolve(jsonResponse(null, 404));
  });
}

describe("InventoryTable", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows stock levels and flags low stock", async () => {
    global.fetch = mockInventoryFetch();

    render(<InventoryTable />);

    // "20L Water Can" legitimately appears twice once loaded: once in the
    // stock table, once in the recent-activity feed below it.
    expect(await screen.findAllByText("20L Water Can")).toHaveLength(2);
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("Low stock")).toBeInTheDocument();
  });

  it("shows recent activity", async () => {
    global.fetch = mockInventoryFetch();

    render(<InventoryTable />);

    expect(await screen.findByText(/counter sale/)).toBeInTheDocument();
    expect(screen.getByText(/-5/)).toBeInTheDocument();
  });

  it("rejects a zero-quantity adjustment without calling the API", async () => {
    global.fetch = mockInventoryFetch();
    const user = userEvent.setup();

    render(<InventoryTable />);
    await screen.findByRole("button", { name: "Apply" });

    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(await screen.findByText(/enter a non-zero quantity/i)).toBeInTheDocument();
  });

  it("submits a stock adjustment and refreshes the table", async () => {
    let adjustCalled = false;
    global.fetch = mockInventoryFetch({ onAdjust: () => (adjustCalled = true) });
    const user = userEvent.setup();

    render(<InventoryTable />);
    await screen.findByRole("button", { name: "Apply" });

    await user.type(screen.getByLabelText("20L Water Can quantity adjustment"), "25");
    await user.selectOptions(screen.getByLabelText("20L Water Can adjustment reason"), "RESTOCK");
    await user.type(screen.getByLabelText("20L Water Can adjustment note"), "weekly delivery");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(adjustCalled).toBe(true);
  });
});
