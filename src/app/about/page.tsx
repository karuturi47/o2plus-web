import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About — O2+",
  description: "O2+ is building a smarter water distribution network across India.",
};

const STATS = [
  { value: "1,200+", label: "Pincodes served" },
  { value: "300+", label: "Retail partners" },
  { value: "50+", label: "Active distributors" },
  { value: "2024", label: "Founded" },
];

const VALUES = [
  { title: "Purity first", body: "Every batch is tested and traceable, from source to doorstep." },
  { title: "Built for scale", body: "A distribution network designed to reach the last mile reliably." },
  { title: "Partners, not just customers", body: "Shops and distributors grow alongside us, not just through us." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          title="Purity, elevated — and delivered at scale."
          subtitle="O2+ connects manufacturers, distributors, local shops, and customers on one smart water distribution network."
        />

        <section className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10">
          <p className="text-base leading-relaxed text-brand-navy/75">
            We started O2+ with a simple idea: getting clean drinking water to shops and homes
            shouldn&apos;t depend on which street you&apos;re on. By connecting manufacturers,
            regional distributors, and local retailers on one platform, we&apos;re building a
            supply chain that reaches further, moves faster, and stays reliable — pincode by
            pincode, across India.
          </p>
        </section>

        <section className="border-y border-black/5 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-14 text-center sm:grid-cols-4 lg:px-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-brand-blue">{s.value}</p>
                <p className="mt-1 text-sm text-brand-navy/65">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <h2 className="text-center text-2xl font-bold text-brand-navy sm:text-3xl">What we stand for</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-brand-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-brand-navy/65">{v.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
