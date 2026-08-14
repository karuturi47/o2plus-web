"use client";

import { useState, type FormEvent } from "react";

export type DemoField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "password";
  placeholder?: string;
};

type DemoFormProps = {
  fields: DemoField[];
  submitLabel: string;
  successMessage?: string;
  accent?: "blue" | "teal" | "navy";
};

export default function DemoForm({
  fields,
  submitLabel,
  successMessage = "Thanks! This is a demo form — nothing was actually submitted.",
  accent = "blue",
}: DemoFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const buttonClasses =
    accent === "teal"
      ? "bg-brand-teal hover:bg-brand-teal-dark"
      : accent === "navy"
        ? "bg-brand-navy hover:bg-brand-blue"
        : "bg-brand-blue hover:bg-brand-navy";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-6 text-center">
        <p className="text-sm font-semibold text-brand-navy">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-brand-navy">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              rows={4}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-blue focus:outline-none"
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-blue focus:outline-none"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className={`w-full rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors ${buttonClasses}`}
      >
        {submitLabel}
      </button>
      <p className="text-center text-xs text-brand-navy/45">
        Demo only — this form isn&apos;t connected to a backend yet.
      </p>
    </form>
  );
}
