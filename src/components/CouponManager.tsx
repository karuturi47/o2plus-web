"use client";

import { useEffect, useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/apiClient";

type CustomerType = "CUSTOMER" | "RETAILER" | "DISTRIBUTOR";
type DiscountType = "PERCENT" | "FLAT";

type Coupon = {
  id: number;
  code: string;
  description: string | null;
  discountType: DiscountType;
  discountValue: number;
  appliesToCustomerType: CustomerType | null;
  minOrderAmount: number | null;
  maxUses: number | null;
  usedCount: number;
  validFrom: string | null;
  validUntil: string | null;
  active: boolean;
};

const CUSTOMER_TYPE_OPTIONS: { id: CustomerType | ""; label: string }[] = [
  { id: "", label: "All customer types" },
  { id: "CUSTOMER", label: "Customer" },
  { id: "RETAILER", label: "Retailer" },
  { id: "DISTRIBUTOR", label: "Distributor" },
];

const emptyForm = {
  code: "",
  description: "",
  discountType: "PERCENT" as DiscountType,
  discountValue: "",
  appliesToCustomerType: "" as CustomerType | "",
  maxUses: "",
  validUntil: "",
};

export default function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[] | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  function loadCoupons() {
    apiFetch<Coupon[]>("/api/admin/coupons")
      .then(setCoupons)
      .catch((e) => setListError(e.message));
  }

  useEffect(loadCoupons, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await apiFetch<Coupon>("/api/admin/coupons", {
        method: "POST",
        body: JSON.stringify({
          code: form.code,
          description: form.description || null,
          discountType: form.discountType,
          discountValue: Number(form.discountValue),
          appliesToCustomerType: form.appliesToCustomerType || null,
          maxUses: form.maxUses ? Number(form.maxUses) : null,
          validUntil: form.validUntil || null,
        }),
      });
      setForm(emptyForm);
      loadCoupons();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Failed to create coupon");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(coupon: Coupon) {
    try {
      const updated = await apiFetch<Coupon>(`/api/admin/coupons/${coupon.id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !coupon.active }),
      });
      setCoupons((prev) => prev?.map((c) => (c.id === coupon.id ? updated : c)) ?? prev);
    } catch {
      // leave state as-is; list will self-correct on next reload
    }
  }

  async function remove(id: number) {
    try {
      await apiFetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      setCoupons((prev) => prev?.filter((c) => c.id !== id) ?? prev);
    } catch {
      // no-op
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr]">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-brand-navy">Add a coupon</h3>

        <div>
          <label htmlFor="coupon-code" className="mb-1.5 block text-sm font-medium text-brand-navy">
            Code
          </label>
          <input
            id="coupon-code"
            required
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="e.g. WELCOME10"
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm uppercase focus:border-brand-blue focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="coupon-description" className="mb-1.5 block text-sm font-medium text-brand-navy">
            Description
          </label>
          <input
            id="coupon-description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Optional note for your team"
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="coupon-discount-type" className="mb-1.5 block text-sm font-medium text-brand-navy">
              Type
            </label>
            <select
              id="coupon-discount-type"
              value={form.discountType}
              onChange={(e) => setForm({ ...form, discountType: e.target.value as DiscountType })}
              className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            >
              <option value="PERCENT">Percent off</option>
              <option value="FLAT">Flat amount off</option>
            </select>
          </div>
          <div>
            <label htmlFor="coupon-discount-value" className="mb-1.5 block text-sm font-medium text-brand-navy">
              Value {form.discountType === "PERCENT" ? "(%)" : "(₹)"}
            </label>
            <input
              id="coupon-discount-value"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.discountValue}
              onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="coupon-applies-to" className="mb-1.5 block text-sm font-medium text-brand-navy">
            Applies to
          </label>
          <select
            id="coupon-applies-to"
            value={form.appliesToCustomerType}
            onChange={(e) => setForm({ ...form, appliesToCustomerType: e.target.value as CustomerType | "" })}
            className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
          >
            {CUSTOMER_TYPE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="coupon-max-uses" className="mb-1.5 block text-sm font-medium text-brand-navy">
              Max uses
            </label>
            <input
              id="coupon-max-uses"
              type="number"
              min="1"
              value={form.maxUses}
              onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
              placeholder="Unlimited"
              className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="coupon-valid-until" className="mb-1.5 block text-sm font-medium text-brand-navy">
              Valid until
            </label>
            <input
              id="coupon-valid-until"
              type="date"
              value={form.validUntil}
              onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
              className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
            />
          </div>
        </div>

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark disabled:opacity-60"
        >
          {submitting ? "Adding…" : "Add Coupon"}
        </button>
      </form>

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-brand-navy">Coupons</h3>
        {listError && <p className="mt-3 text-sm text-red-600">{listError}</p>}
        {!coupons && !listError && <p className="mt-3 text-sm text-brand-navy/60">Loading…</p>}
        {coupons && coupons.length === 0 && (
          <p className="mt-3 text-sm text-brand-navy/60">No coupons yet — add one on the left.</p>
        )}
        <ul className="mt-4 space-y-3">
          {coupons?.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="font-mono text-sm font-bold text-brand-navy">{c.code}</p>
                <p className="text-xs text-brand-navy/60">
                  {c.discountType === "PERCENT" ? `${c.discountValue}% off` : `₹${c.discountValue} off`}
                  {c.appliesToCustomerType ? ` · ${c.appliesToCustomerType}` : " · all types"}
                  {c.maxUses ? ` · ${c.usedCount}/${c.maxUses} used` : ` · ${c.usedCount} used`}
                  {c.validUntil ? ` · expires ${c.validUntil}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleActive(c)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    c.active ? "bg-brand-teal/10 text-brand-teal-dark" : "bg-black/5 text-brand-navy/50"
                  }`}
                >
                  {c.active ? "Active" : "Inactive"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(c.id)}
                  className="rounded-full px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
