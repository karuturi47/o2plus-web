"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const TABS = [
  { id: "ADMIN", label: "Admin", placeholder: "admin" },
  { id: "SUPER_USER", label: "Super User", placeholder: "superuser" },
] as const;

export default function AdminLoginForm() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("ADMIN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const activeTab = TABS.find((t) => t.id === tab)!;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.message ?? "Invalid username or password.");
        return;
      }

      router.push(data.role === "ADMIN" ? "/admin/pricing" : "/admin/inventory");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex rounded-full bg-white/10 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              tab === t.id ? "bg-white text-brand-navy" : "text-white/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-brand-navy">
            Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={activeTab.placeholder}
            autoComplete="username"
            required
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-blue focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-brand-navy">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-blue focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue disabled:opacity-60"
        >
          {loading ? "Logging in…" : `${activeTab.label} Login`}
        </button>
      </form>
    </div>
  );
}
