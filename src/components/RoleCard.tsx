import Link from "next/link";
import type { ReactNode } from "react";

type RoleCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  variant?: "blue" | "teal";
};

export default function RoleCard({
  icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  variant = "blue",
}: RoleCardProps) {
  const buttonClasses =
    variant === "teal"
      ? "bg-brand-teal hover:bg-brand-teal-dark"
      : "bg-brand-blue hover:bg-brand-navy";

  return (
    <div className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-brand-navy">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-navy/65">{description}</p>
      <Link
        href={ctaHref}
        className={`mt-5 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-colors ${buttonClasses}`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
