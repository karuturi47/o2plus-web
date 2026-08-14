import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminPricingTable from "../AdminPricingTable";

function jsonResponse(body: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

const oneProduct = [
  {
    id: 1,
    sku: "bottle-1l",
    name: "O2+ 1L Bottle",
    packSize: "1L",
    category: "home",
    prices: { CUSTOMER: 18, RETAILER: 15, DISTRIBUTOR: 12 },
  },
];

describe("AdminPricingTable", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads products and pre-fills the price inputs", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse(oneProduct));

    render(<AdminPricingTable />);

    expect(await screen.findByText("O2+ 1L Bottle")).toBeInTheDocument();
    expect(screen.getByLabelText("O2+ 1L Bottle Customer price")).toHaveValue(18);
    expect(screen.getByLabelText("O2+ 1L Bottle Retailer price")).toHaveValue(15);
    expect(screen.getByLabelText("O2+ 1L Bottle Distributor price")).toHaveValue(12);
  });

  it("saves an edited price via PUT and shows a confirmation", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url === "/api/admin/products") return Promise.resolve(jsonResponse(oneProduct));
      return Promise.resolve(
        jsonResponse({ ...oneProduct[0], prices: { CUSTOMER: 20, RETAILER: 15, DISTRIBUTOR: 12 } })
      );
    });
    global.fetch = fetchMock;
    const user = userEvent.setup();

    render(<AdminPricingTable />);
    await screen.findByText("O2+ 1L Bottle");

    const customerInput = screen.getByLabelText("O2+ 1L Bottle Customer price");
    await user.clear(customerInput);
    await user.type(customerInput, "20");
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Saved")).toBeInTheDocument();
    const [, putInit] = fetchMock.mock.calls[1];
    expect(putInit.method).toBe("PUT");
    expect(JSON.parse(putInit.body).prices.CUSTOMER).toBe(20);
  });

  it("shows an error message when the save request fails", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url === "/api/admin/products") return Promise.resolve(jsonResponse(oneProduct));
      return Promise.resolve(jsonResponse({ message: "Product not found" }, 404));
    });
    global.fetch = fetchMock;
    const user = userEvent.setup();

    render(<AdminPricingTable />);
    await screen.findByText("O2+ 1L Bottle");

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Product not found")).toBeInTheDocument();
  });

  it("shows a load error when the initial fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ message: "Server error" }, 500));

    render(<AdminPricingTable />);

    expect(await screen.findByText("Server error")).toBeInTheDocument();
  });
});
