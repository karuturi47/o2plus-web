import type { Metadata } from "next";
import InternalHeader from "@/components/InternalHeader";
import InventoryTable from "@/components/InventoryTable";

export const metadata: Metadata = {
  title: "Inventory — O2+ Super User",
};

export default function AdminInventoryPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-slate-50">
      <InternalHeader title="Super User" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <h1 className="text-2xl font-bold text-brand-navy">Inventory</h1>
        <p className="mt-1 text-sm text-brand-navy/60">
          Stock on hand for daily direct sales. Every adjustment is logged below.
        </p>
        <div className="mt-6">
          <InventoryTable />
        </div>
      </main>
    </div>
  );
}
