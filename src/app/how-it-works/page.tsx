import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "How It Works — O2+",
  description: "How O2+ works for customers, local shops, and distributors.",
};

const TRACKS = [
  {
    role: "Customer",
    accent: "text-brand-blue bg-brand-blue/10",
    steps: [
      { title: "Sign up", body: "Create a free account with your name and delivery address." },
      { title: "Browse & order", body: "Pick your pack size and place an order in a few taps." },
      { title: "Track delivery", body: "Follow your order from dispatch to your doorstep." },
      { title: "Reorder easily", body: "Set up repeat deliveries so you never run out." },
    ],
    cta: { label: "Shop Now", href: "/products" },
  },
  {
    role: "Local Shop / Retailer",
    accent: "text-brand-teal bg-brand-teal/10",
    steps: [
      { title: "Register your store", body: "Tell us about your shop and the areas you serve." },
      { title: "Get shop pricing", body: "Access bulk rates built for supermarkets and cafés." },
      { title: "Place bulk orders", body: "Order by the case, with flexible delivery windows." },
      { title: "Manage on the go", body: "Track orders and invoices from your retailer dashboard." },
    ],
    cta: { label: "Order for My Store", href: "/retailers" },
  },
  {
    role: "Distributor",
    accent: "text-brand-navy bg-brand-navy/10",
    steps: [
      { title: "Apply for territory", body: "Tell us your region — we protect it exclusively for you." },
      { title: "Onboard & train", body: "Get set up on the O2+ distributor tools and workflows." },
      { title: "Manage deliveries", body: "Accept, route, and fulfil orders across your area." },
      { title: "Grow with support", body: "Ongoing operational and marketing support from O2+." },
    ],
    cta: { label: "Become a Distributor", href: "/distributor" },
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          title="How O2+ works"
          subtitle="One network, three ways in — pick the path that fits you."
        />

        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {TRACKS.map((track) => (
              <div key={track.role} className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <span className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${track.accent}`}>
                  {track.role}
                </span>
                <ol className="mt-6 flex-1 space-y-6">
                  {track.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-brand-blue text-xs font-bold text-brand-blue">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-brand-navy">{step.title}</h3>
                        <p className="mt-1 text-sm text-brand-navy/65">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link
                  href={track.cta.href}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
                >
                  {track.cta.label}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-black/5 bg-slate-50 py-16 text-center">
          <h2 className="text-2xl font-bold text-brand-navy">Still have questions?</h2>
          <p className="mt-3 text-sm text-brand-navy/65">
            Check our FAQ or reach out — we&apos;re happy to help.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/faq"
              className="rounded-full border border-brand-blue px-5 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue/10"
            >
              View FAQ
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
