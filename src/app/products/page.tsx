import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsFilter from "@/components/ProductsFilter";
import type { Product } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Products — O2+",
  description: "Choose the right O2+ pack for your home, shop, or bulk needs.",
};

const PRODUCTS: Product[] = [
  {
    id: "bottle-500ml",
    name: "500ml Bottle",
    category: "home",
    tag: "Local",
    blurb: "For personal use.",
  },
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

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand-sky to-brand-blue py-16 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Products</h1>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <h2 className="text-center text-2xl font-bold text-brand-navy sm:text-3xl">
            Choose the right O2+ pack for you
          </h2>
          <div className="mt-10">
            <ProductsFilter products={PRODUCTS} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
