import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Team Login — O2+ Admin",
};

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-brand-navy px-6 py-20">
      <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
        <span
          aria-hidden
          className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-brand-sky to-brand-blue"
        />
        O2+ <span className="font-normal text-white/60">Admin</span>
      </div>
      <p className="mt-2 text-sm text-white/60">Internal tools &amp; analytics — team members only.</p>

      <div className="mt-8">
        <AdminLoginForm />
      </div>

      <Link href="/" className="mt-8 text-sm text-white/50 hover:text-white/80">
        ← Back to O2+
      </Link>
    </main>
  );
}
