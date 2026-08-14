"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";

type MovementReason = "RESTOCK" | "SALE" | "ADJUSTMENT" | "DAMAGE";

type InventoryItem = {
  productId: number;
  sku: string;
  name: string;
  packSize: string;
  quantityOnHand: number;
  reorderThreshold: number;
  lowStock: boolean;
};

type Movement = {
  id: number;
  sku: string;
  productName: string;
  changeQty: number;
  reason: MovementReason;
  note: string | null;
  createdBy: string | null;
  createdAt: string;
};

const REASONS: { id: MovementReason; label: string }[] = [
  { id: "RESTOCK", label: "Restock" },
  { id: "SALE", label: "Sale" },
  { id: "ADJUSTMENT", label: "Adjustment" },
  { id: "DAMAGE", label: "Damage" },
];

export default function InventoryTable() {
  const [items, setItems] = useState<InventoryItem[] | null>(null);
  const [movements, setMovements] = useState<Movement[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<number, { qty: string; reason: MovementReason; note: string }>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [rowError, setRowError] = useState<{ id: number; message: string } | null>(null);

  function load() {
    Promise.all([
      apiFetch<InventoryItem[]>("/api/inventory"),
      apiFetch<Movement[]>("/api/inventory/movements?limit=20"),
    ])
      .then(([inv, mov]) => {
        setItems(inv);
        setMovements(mov);
      })
      .catch((e) => setError(e.message));
  }

  useEffect(load, []);

  function draftFor(productId: number) {
    return drafts[productId] ?? { qty: "", reason: "RESTOCK" as MovementReason, note: "" };
  }

  function updateDraft(productId: number, patch: Partial<{ qty: string; reason: MovementReason; note: string }>) {
    setDrafts((prev) => ({ ...prev, [productId]: { ...draftFor(productId), ...patch } }));
  }

  async function apply(productId: number) {
    const draft = draftFor(productId);
    const changeQty = Number(draft.qty);
    if (!draft.qty || Number.isNaN(changeQty) || changeQty === 0) {
      setRowError({ id: productId, message: "Enter a non-zero quantity (use - for a decrease)." });
      return;
    }
    setSavingId(productId);
    setRowError(null);
    try {
      await apiFetch(`/api/inventory/${productId}/adjust`, {
        method: "POST",
        body: JSON.stringify({ changeQty, reason: draft.reason, note: draft.note || null }),
      });
      updateDraft(productId, { qty: "", note: "" });
      load();
    } catch (e) {
      setRowError({ id: productId, message: e instanceof Error ? e.message : "Adjustment failed" });
    } finally {
      setSavingId(null);
    }
  }

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!items) return <p className="text-sm text-brand-navy/60">Loading inventory…</p>;

  return (
    <div className="space-y-10">
      <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-xs font-semibold uppercase tracking-wide text-brand-navy/50">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">On hand</th>
              <th className="px-5 py-3">Reorder at</th>
              <th className="px-5 py-3">Adjust</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const draft = draftFor(item.productId);
              return (
                <tr key={item.productId} className="border-b border-black/5 last:border-0 align-top">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-brand-navy">{item.name}</p>
                    <p className="text-xs text-brand-navy/50">{item.sku}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-semibold ${item.lowStock ? "text-red-600" : "text-brand-navy"}`}>
                      {item.quantityOnHand}
                    </span>
                    {item.lowStock && <p className="text-xs text-red-600">Low stock</p>}
                  </td>
                  <td className="px-5 py-4 text-brand-navy/70">{item.reorderThreshold}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        placeholder="±qty"
                        aria-label={`${item.name} quantity adjustment`}
                        value={draft.qty}
                        onChange={(e) => updateDraft(item.productId, { qty: e.target.value })}
                        className="w-20 rounded-lg border border-black/10 px-2.5 py-1.5 text-sm focus:border-brand-blue focus:outline-none"
                      />
                      <select
                        aria-label={`${item.name} adjustment reason`}
                        value={draft.reason}
                        onChange={(e) => updateDraft(item.productId, { reason: e.target.value as MovementReason })}
                        className="rounded-lg border border-black/10 px-2 py-1.5 text-sm focus:border-brand-blue focus:outline-none"
                      >
                        {REASONS.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Note (optional)"
                        aria-label={`${item.name} adjustment note`}
                        value={draft.note}
                        onChange={(e) => updateDraft(item.productId, { note: e.target.value })}
                        className="w-32 rounded-lg border border-black/10 px-2.5 py-1.5 text-sm focus:border-brand-blue focus:outline-none"
                      />
                    </div>
                    {rowError?.id === item.productId && (
                      <p className="mt-1 text-xs text-red-600">{rowError.message}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => apply(item.productId)}
                      disabled={savingId === item.productId}
                      className="rounded-full bg-brand-teal px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-teal-dark disabled:opacity-60"
                    >
                      {savingId === item.productId ? "Saving…" : "Apply"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-brand-navy">Recent activity</h3>
        {!movements || movements.length === 0 ? (
          <p className="mt-3 text-sm text-brand-navy/60">No stock movements yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {movements.map((m) => (
              <li key={m.id} className="flex items-center justify-between border-b border-black/5 pb-2 text-sm last:border-0">
                <span>
                  <span className={m.changeQty >= 0 ? "text-brand-teal-dark" : "text-red-600"}>
                    {m.changeQty >= 0 ? `+${m.changeQty}` : m.changeQty}
                  </span>{" "}
                  <span className="font-medium text-brand-navy">{m.productName}</span>{" "}
                  <span className="text-brand-navy/50">
                    · {m.reason.toLowerCase()}
                    {m.note ? ` — ${m.note}` : ""}
                    {m.createdBy ? ` · ${m.createdBy}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-brand-navy/40">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
