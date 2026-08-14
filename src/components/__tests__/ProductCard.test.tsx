import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard, { type Product } from "../ProductCard";

const orderableProduct: Product = {
  id: "bottle-1l",
  name: "O2+ 1L Bottle",
  category: "home",
  tag: "Home",
  blurb: "Our most popular everyday pack.",
  price: "₹18 / bottle",
  orderable: true,
};

const nonOrderableProduct: Product = {
  id: "bottle-500ml",
  name: "500ml Bottle",
  category: "home",
  tag: "Local",
  blurb: "For personal use.",
};

describe("ProductCard", () => {
  test("renders product name, tag, and price", () => {
    render(<ProductCard product={orderableProduct} />);

    expect(screen.getByText("O2+ 1L Bottle")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("₹18 / bottle")).toBeInTheDocument();
  });

  test("shows an Add to Cart button only when orderable", () => {
    render(<ProductCard product={nonOrderableProduct} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("clicking Add to Cart switches the button to an Added state", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={orderableProduct} />);

    const button = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(button);

    expect(screen.getByRole("button", { name: "Added ✓" })).toBeInTheDocument();
  });
});
