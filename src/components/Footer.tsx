import Link from "next/link";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "For Business",
    links: [
      { href: "/retailers", label: "For Retailers" },
      { href: "/distributor", label: "Become a Distributor" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact & Support" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-brand-navy">
              <span
                aria-hidden
                className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-brand-sky to-brand-blue"
              />
              O2+
            </Link>
            <p className="mt-2 text-sm font-medium tracking-wide text-brand-navy/60">
              PURITY, ELEVATED.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-brand-navy">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-navy/70 transition-colors hover:text-brand-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 sm:flex-row">
          <p className="text-sm text-brand-navy/60">© 2026 O2+. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy/5 text-brand-navy/60 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
              >
                <span className="text-xs font-semibold">{s.label[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
