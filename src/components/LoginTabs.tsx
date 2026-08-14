"use client";

import { useState } from "react";
import Link from "next/link";
import DemoForm from "./DemoForm";

const TABS = [
  { id: "customer", label: "Customer" },
  { id: "shop", label: "Shop Owner" },
] as const;

export default function LoginTabs() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("customer");

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="flex rounded-full bg-slate-100 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              tab === t.id ? "bg-white text-brand-blue shadow-sm" : "text-brand-navy/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <DemoForm
          key={tab}
          fields={[
            { name: "email", label: "Email or phone", type: "email", placeholder: "you@example.com" },
            { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
          ]}
          submitLabel={tab === "customer" ? "Log In" : "Log In to Shop Account"}
          successMessage="Demo only — authentication isn't wired up yet."
        />
      </div>

      <p className="mt-6 text-center text-sm text-brand-navy/65">
        New to O2+?{" "}
        <Link href="/products" className="font-semibold text-brand-blue underline underline-offset-2">
          Shop as a guest
        </Link>
      </p>

      <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-center text-sm text-brand-navy/55">
        <Link href="/distributor/login" className="hover:text-brand-blue">
          Distributor? Log in here →
        </Link>
        <Link href="/admin/login" className="hover:text-brand-blue">
          Team member? Log in here →
        </Link>
      </div>
    </div>
  );
}
