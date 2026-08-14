"use client";

import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";

const FILTERS: { id: "all" | Product["category"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "home", label: "For Home" },
  { id: "shops", label: "For Shops" },
  { id: "bulk", label: "Bulk" },
];

export default function ProductsFilter({ products }: { products: Product[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]["id"]>("all");

  const visible = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f.id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              active === f.id
                ? "bg-brand-blue text-white"
                : "bg-transparent text-brand-navy/70 hover:bg-brand-blue/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
