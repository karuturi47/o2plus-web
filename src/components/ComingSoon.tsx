import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title={title} />
        <section className="mx-auto max-w-xl px-6 py-24 text-center">
          <p className="text-sm text-brand-navy/65">
            This page is on its way. In the meantime, head back home or check out our products.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-full border border-brand-blue px-5 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue/10"
            >
              Back Home
            </Link>
            <Link
              href="/products"
              className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
            >
              View Products
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
