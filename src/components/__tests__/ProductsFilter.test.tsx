import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsFilter from "../ProductsFilter";
import type { Product } from "../ProductCard";

const products: Product[] = [
  { id: "bottle-500ml", name: "500ml Bottle", category: "home", tag: "Local", blurb: "For personal use." },
  {
    id: "bottle-1l",
    name: "O2+ 1L Bottle",
    category: "home",
    tag: "Home",
    blurb: "Our most popular everyday pack.",
    price: "₹18 / bottle",
    orderable: true,
  },
  {
    id: "bottle-250ml",
    name: "O2+ 250ml Bottle",
    category: "shops",
    tag: "Shops",
    blurb: "Perfect for travel & hospitality.",
  },
  {
    id: "can-20l",
    name: "20L Water Can",
    category: "bulk",
    tag: "Bulk",
    blurb: "Great for offices & warehouses.",
    price: "₹85 / can",
    orderable: true,
  },
];

describe("ProductsFilter", () => {
  it("shows all products by default", () => {
    render(<ProductsFilter products={products} />);

    for (const p of products) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
  });

  it("filters to only the selected category", async () => {
    const user = userEvent.setup();
    render(<ProductsFilter products={products} />);

    await user.click(screen.getByRole("button", { name: "Bulk" }));

    expect(screen.getByText("20L Water Can")).toBeInTheDocument();
    expect(screen.queryByText("500ml Bottle")).not.toBeInTheDocument();
    expect(screen.queryByText("O2+ 1L Bottle")).not.toBeInTheDocument();
    expect(screen.queryByText("O2+ 250ml Bottle")).not.toBeInTheDocument();
  });

  it("returns to showing everything when All is clicked again", async () => {
    const user = userEvent.setup();
    render(<ProductsFilter products={products} />);

    await user.click(screen.getByRole("button", { name: "For Home" }));
    expect(screen.queryByText("20L Water Can")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("20L Water Can")).toBeInTheDocument();
  });

  it("lets an orderable product be added to the cart", async () => {
    const user = userEvent.setup();
    render(<ProductsFilter products={products} />);

    const addButtons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(addButtons[0]);

    expect(screen.getByRole("button", { name: "Added ✓" })).toBeInTheDocument();
  });
});
