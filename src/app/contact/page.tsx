import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Contact — O2+",
  description: "Get in touch with the O2+ team.",
};

const CHANNELS = [
  { label: "Email", value: "hello@o2plus.example" },
  { label: "Phone", value: "+91 98765 43210" },
  { label: "Office", value: "O2+ HQ, Bengaluru, Karnataka, India" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title="Contact & Support" subtitle="Questions, feedback, or partnership ideas — we'd love to hear from you." />

        <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <div>
            <h2 className="text-lg font-bold text-brand-navy">Reach us directly</h2>
            <ul className="mt-6 space-y-4">
              {CHANNELS.map((c) => (
                <li key={c.label} className="rounded-xl border border-black/5 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/50">{c.label}</p>
                  <p className="mt-1 text-sm font-medium text-brand-navy">{c.value}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-brand-navy">Send us a message</h2>
            <div className="mt-6">
              <DemoForm
                fields={[
                  { name: "name", label: "Name", placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                  { name: "message", label: "Message", type: "textarea", placeholder: "How can we help?" },
                ]}
                submitLabel="Send Message"
                successMessage="Thanks for reaching out! A demo confirmation only — messages aren't sent yet."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
