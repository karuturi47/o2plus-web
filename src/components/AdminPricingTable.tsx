"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";

type CustomerType = "CUSTOMER" | "RETAILER" | "DISTRIBUTOR";

type ProductPricing = {
  id: number;
  sku: string;
  name: string;
  packSize: string;
  category: string;
  prices: Partial<Record<CustomerType, number>>;
};

const CUSTOMER_TYPES: { id: CustomerType; label: string }[] = [
  { id: "CUSTOMER", label: "Customer" },
  { id: "RETAILER", label: "Retailer" },
  { id: "DISTRIBUTOR", label: "Distributor" },
];

export default function AdminPricingTable() {
  const [products, setProducts] = useState<ProductPricing[] | null>(null);
  const [drafts, setDrafts] = useState<Record<number, Partial<Record<CustomerType, string>>>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [status, setStatus] = useState<{ id: number; message: string; ok: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<ProductPricing[]>("/api/admin/products")
      .then((data) => {
        setProducts(data);
        const initialDrafts: Record<number, Partial<Record<CustomerType, string>>> = {};
        for (const p of data) {
          initialDrafts[p.id] = Object.fromEntries(
            CUSTOMER_TYPES.map((ct) => [ct.id, p.prices[ct.id]?.toString() ?? ""])
          );
        }
        setDrafts(initialDrafts);
      })
      .catch((e) => setError(e.message));
  }, []);

  function updateDraft(productId: number, type: CustomerType, value: string) {
    setDrafts((prev) => ({ ...prev, [productId]: { ...prev[productId], [type]: value } }));
  }

  async function save(productId: number) {
    setSavingId(productId);
    setStatus(null);
    try {
      const draft = drafts[productId] ?? {};
      const prices: Partial<Record<CustomerType, number>> = {};
      for (const ct of CUSTOMER_TYPES) {
        const raw = draft[ct.id];
        if (raw !== undefined && raw !== "") prices[ct.id] = Number(raw);
      }
      const updated = await apiFetch<ProductPricing>(`/api/admin/products/${productId}/prices`, {
        method: "PUT",
        body: JSON.stringify({ prices }),
      });
      setProducts((prev) => prev?.map((p) => (p.id === productId ? updated : p)) ?? prev);
      setStatus({ id: productId, message: "Saved", ok: true });
    } catch (e) {
      setStatus({ id: productId, message: e instanceof Error ? e.message : "Failed to save", ok: false });
    } finally {
      setSavingId(null);
    }
  }

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!products) return <p className="text-sm text-brand-navy/60">Loading products…</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-black/5 text-left text-xs font-semibold uppercase tracking-wide text-brand-navy/50">
            <th className="px-5 py-3">Product</th>
            {CUSTOMER_TYPES.map((ct) => (
              <th key={ct.id} className="px-5 py-3">
                {ct.label} (₹)
              </th>
            ))}
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-black/5 last:border-0">
              <td className="px-5 py-4">
                <p className="font-semibold text-brand-navy">{p.name}</p>
                <p className="text-xs text-brand-navy/50">{p.sku}</p>
              </td>
              {CUSTOMER_TYPES.map((ct) => (
                <td key={ct.id} className="px-5 py-4">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    aria-label={`${p.name} ${ct.label} price`}
                    value={drafts[p.id]?.[ct.id] ?? ""}
                    onChange={(e) => updateDraft(p.id, ct.id, e.target.value)}
                    className="w-24 rounded-lg border border-black/10 px-2.5 py-1.5 text-sm focus:border-brand-blue focus:outline-none"
                  />
                </td>
              ))}
              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() => save(p.id)}
                  disabled={savingId === p.id}
                  className="rounded-full bg-brand-blue px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-navy disabled:opacity-60"
                >
                  {savingId === p.id ? "Saving…" : "Save"}
                </button>
                {status?.id === p.id && (
                  <p className={`mt-1 text-xs ${status.ok ? "text-brand-teal-dark" : "text-red-600"}`}>
                    {status.message}
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
