import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoleCard from "@/components/RoleCard";
import BottleIllustration from "@/components/BottleIllustration";

const ROLES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
    title: "Customer",
    description: "Order packaged drinking water for your home or office.",
    ctaLabel: "Shop Now",
    ctaHref: "/products",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
        <path d="M3 9l1.5-5h15L21 9" />
        <path d="M3 9h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Z" />
        <path d="M9 13a3 3 0 0 0 6 0" />
      </svg>
    ),
    title: "Local Shop / Retailer",
    description: "Bulk water deliveries for small stores, supermarkets, and cafés.",
    ctaLabel: "Order for My Store",
    ctaHref: "/retailers",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
    title: "Distributor",
    description: "Manage regional supply and deliveries across your territory.",
    ctaLabel: "Distributor Login",
    ctaHref: "/distributor/login",
    variant: "teal" as const,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
        <path d="M12 3l8 3v6c0 4.5-3.4 7.9-8 9-4.6-1.1-8-4.5-8-9V6l8-3Z" />
      </svg>
    ),
    title: "Admin / Owner",
    description: "Access internal tools, supply oversight, and analytics.",
    ctaLabel: "Team Login",
    ctaHref: "/admin/login",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Great service and timely delivery. O2+ keeps our store shelves stocked without the hassle.",
    name: "Shankar R.",
    role: "Shopowner",
  },
  {
    quote:
      "Excellent quality water and a reliable delivery network. Highly recommend O2+ to any shop owner.",
    name: "Nora M.",
    role: "Shopowner",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-sky to-brand-blue text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                O2+ — Purity, Elevated. Delivered.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90">
                A smart water distribution network connecting manufacturers, distributors,
                local shops, and customers across India.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/distributor"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-blue-50"
                >
                  Become a Distributor
                </Link>
                <Link
                  href="/retailers"
                  className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Order for My Shop
                </Link>
              </div>
              <p className="mt-6 text-sm text-white/80">
                Looking for home delivery?{" "}
                <Link href="/products" className="font-semibold underline underline-offset-2">
                  Shop as a customer
                </Link>
              </p>
            </div>

            <div className="relative mx-auto flex justify-center">
              <BottleIllustration
                priority
                className="h-80 w-44 drop-shadow-2xl sm:h-96 sm:w-56"
              />
              <div className="absolute -right-2 top-4 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 text-brand-navy shadow-lg sm:right-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  ▶
                </span>
                <span className="text-xs font-semibold leading-tight">
                  Serving 1,200+ pincodes
                  <br />
                  and growing
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Role selection */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            Choose how you want to use O2+
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((role) => (
              <RoleCard key={role.title} {...role} />
            ))}
          </div>
        </section>

        {/* How it works + Distributor growth */}
        <section className="border-t border-black/5 bg-slate-50">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">How O2+ works for you</h2>
              <ol className="mt-8 space-y-8">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand-blue text-sm font-bold text-brand-blue">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-navy">Sign Up</h3>
                    <p className="mt-1 text-sm text-brand-navy/65">
                      Create an account as a customer, local shop, or distributor.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand-blue text-sm font-bold text-brand-blue">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-navy">Place Orders</h3>
                    <p className="mt-1 text-sm text-brand-navy/65">
                      Browse products, select quantities, and confirm deliveries.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-navy">
                Grow with O2+ as a distributor.
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                    ✓
                  </span>
                  <h3 className="mt-4 font-semibold text-brand-navy">Territory protection</h3>
                  <p className="mt-1 text-sm text-brand-navy/65">
                    Exclusive rights to serve your assigned region.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    ⚙
                  </span>
                  <h3 className="mt-4 font-semibold text-brand-navy">
                    Online order management &amp; support
                  </h3>
                  <p className="mt-1 text-sm text-brand-navy/65">
                    Track and fulfil orders with full platform support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            Trusted by shops and families.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <div className="text-amber-400">★★★★★</div>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-bold text-brand-blue">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{t.name}</p>
                    <p className="text-xs text-brand-navy/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-50 px-6 py-6 sm:flex-row">
            <p className="text-sm font-semibold text-brand-navy">
              Trusted partners across the market
            </p>
            <div className="flex items-center gap-8 text-sm font-semibold text-brand-navy/50">
              <span>QuickMart</span>
              <span>CITYMax</span>
              <span>FreshCo</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
