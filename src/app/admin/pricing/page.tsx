import type { Metadata } from "next";
import InternalHeader from "@/components/InternalHeader";
import AdminPricingTable from "@/components/AdminPricingTable";
import CouponManager from "@/components/CouponManager";

export const metadata: Metadata = {
  title: "Pricing — O2+ Admin",
};

export default function AdminPricingPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-slate-50">
      <InternalHeader title="Admin" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <h1 className="text-2xl font-bold text-brand-navy">Pricing</h1>
        <p className="mt-1 text-sm text-brand-navy/60">
          Set the price of each pack per customer type. Changes save immediately.
        </p>
        <div className="mt-6">
          <AdminPricingTable />
        </div>

        <h2 className="mt-12 text-2xl font-bold text-brand-navy">Coupons</h2>
        <p className="mt-1 text-sm text-brand-navy/60">Create and manage discount codes.</p>
        <div className="mt-6">
          <CouponManager />
        </div>
      </main>
    </div>
  );
}
