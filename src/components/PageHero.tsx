export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-sky to-brand-blue py-16 text-center text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 text-base text-white/90">{subtitle}</p>}
      </div>
    </section>
  );
}
