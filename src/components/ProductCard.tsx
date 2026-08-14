"use client";

import { useState } from "react";
import BottleIllustration from "./BottleIllustration";

export type Product = {
  id: string;
  name: string;
  category: "home" | "shops" | "bulk";
  tag: string;
  blurb: string;
  price?: string;
  orderable?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="flex items-center gap-6 rounded-2xl border border-black/5 bg-slate-50 p-6">
      <BottleIllustration className="h-28 w-16 shrink-0" />

      <div className="flex-1">
        <span className="inline-block rounded-md bg-brand-blue/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand-blue">
          {product.tag}
        </span>
        <h3 className="mt-2 text-lg font-bold text-brand-navy">{product.name}</h3>
        <p className="mt-1 text-sm text-brand-navy/65">{product.blurb}</p>
        {product.price && (
          <p className="mt-2 text-sm font-semibold text-brand-navy">{product.price}</p>
        )}

        {product.orderable && (
          <button
            type="button"
            onClick={() => setAdded(true)}
            className={`mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${
              added ? "bg-brand-teal-dark" : "bg-brand-blue hover:bg-brand-navy"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}
