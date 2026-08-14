import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/retailers", label: "For Retailers" },
  { href: "/distributor", label: "Become a Distributor" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-brand-navy">
          <span
            aria-hidden
            className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-brand-sky to-brand-blue"
          />
          O2+
        </Link>

        <ul className="hidden items-center gap-7 text-sm font-medium text-brand-navy/80 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-brand-blue">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/login"
          className="rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
