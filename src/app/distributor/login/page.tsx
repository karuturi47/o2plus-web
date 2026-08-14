import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Distributor Login — O2+",
};

export default function DistributorLoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title="Distributor Login" subtitle="Manage your territory, orders, and deliveries." />

        <section className="mx-auto max-w-md px-6 py-20">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <DemoForm
              accent="teal"
              fields={[
                { name: "email", label: "Distributor email", type: "email", placeholder: "you@example.com" },
                { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
              ]}
              submitLabel="Distributor Login"
              successMessage="Demo only — authentication isn't wired up yet."
            />
          </div>

          <p className="mt-6 text-center text-sm text-brand-navy/65">
            Not a distributor yet?{" "}
            <Link href="/distributor" className="font-semibold text-brand-teal underline underline-offset-2">
              Apply here
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
