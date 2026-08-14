import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Become a Distributor — O2+",
  description: "Grow a protected territory with O2+'s distributor program.",
};

const BENEFITS = [
  { title: "Territory protection", body: "Exclusive rights to serve your assigned region — no overlap." },
  { title: "Online order management", body: "A full toolkit to accept, route, and fulfil orders." },
  { title: "Marketing support", body: "Co-branded materials and demand generation in your area." },
  { title: "Growth incentives", body: "Volume-based pricing that rewards you as you scale." },
];

const STEPS = [
  "Apply with your target region and business details",
  "Get verified and complete distributor onboarding",
  "Receive your first stock allocation and territory rights",
  "Start fulfilling orders through the distributor dashboard",
];

export default function DistributorPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          title="Grow with O2+ as a distributor."
          subtitle="Protected territory, real support, and a product people reorder."
        />

        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <h2 className="text-2xl font-bold text-brand-navy">Why partner with O2+</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                  ✓
                </span>
                <h3 className="mt-4 font-semibold text-brand-navy">{b.title}</h3>
                <p className="mt-1 text-sm text-brand-navy/65">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-black/5 bg-slate-50">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:px-10">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">How it works</h2>
              <ol className="mt-8 space-y-6">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="mt-1 text-sm text-brand-navy/75">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm text-brand-navy/65">
                Already a distributor?{" "}
                <Link href="/distributor/login" className="font-semibold text-brand-teal underline underline-offset-2">
                  Log in to your dashboard
                </Link>
                .
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-navy">Apply to become a distributor</h2>
              <p className="mt-1 text-sm text-brand-navy/65">
                Tell us about your region — we&apos;ll reach out to discuss territory availability.
              </p>
              <div className="mt-6">
                <DemoForm
                  accent="teal"
                  fields={[
                    { name: "name", label: "Full name", placeholder: "Your name" },
                    { name: "business", label: "Business name", placeholder: "e.g. Sharma Distribution Co." },
                    { name: "phone", label: "Phone number", type: "tel", placeholder: "+91 " },
                    { name: "region", label: "Target region / city", placeholder: "e.g. Pune, Maharashtra" },
                  ]}
                  submitLabel="Apply Now"
                  successMessage="Thanks for applying! A demo confirmation only — real applications aren't processed yet."
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
