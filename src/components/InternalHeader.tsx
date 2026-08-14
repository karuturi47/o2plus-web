"use client";

import { useRouter } from "next/navigation";

export default function InternalHeader({ title }: { title: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/admin-logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="border-b border-black/10 bg-brand-navy px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block h-3.5 w-3.5 rounded-full bg-gradient-to-br from-brand-sky to-brand-blue"
          />
          <span className="font-bold tracking-tight">
            O2+ <span className="font-normal text-white/60">{title}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
