import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "For Retailers — O2+",
  description: "Bulk water deliveries and shop pricing for local retailers, on O2+.",
};

const BENEFITS = [
  {
    title: "Shop pricing",
    body: "Bulk rates built for supermarkets, kirana stores, and cafés — better margins on every case.",
  },
  {
    title: "Reliable delivery",
    body: "Scheduled or on-demand delivery windows that fit your store's stocking routine.",
  },
  {
    title: "Never run out",
    body: "Set reorder thresholds and let O2+ keep your shelves stocked automatically.",
  },
  {
    title: "Dedicated support",
    body: "A retailer support line for order changes, invoicing, and account questions.",
  },
];

export default function RetailersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          title="Water, stocked and sorted for your store."
          subtitle="Bulk deliveries, shop pricing, and a support team that keeps your shelves full."
        />

        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">Why shops choose O2+</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-brand-navy">{b.title}</h3>
                    <p className="mt-2 text-sm text-brand-navy/65">{b.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-brand-navy">Order for my store</h2>
              <p className="mt-1 text-sm text-brand-navy/65">
                Tell us about your shop and we&apos;ll set up your account.
              </p>
              <div className="mt-6">
                <DemoForm
                  fields={[
                    { name: "shopName", label: "Shop / Store name", placeholder: "e.g. QuickMart" },
                    { name: "ownerName", label: "Your name", placeholder: "Full name" },
                    { name: "phone", label: "Phone number", type: "tel", placeholder: "+91 " },
                    { name: "pincode", label: "Pincode", placeholder: "6-digit pincode" },
                  ]}
                  submitLabel="Order for My Store"
                  successMessage="Thanks! A demo confirmation only — we'll wire this up to real onboarding soon."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
