import Image from "next/image";

type BottleIllustrationProps = {
  className?: string;
  /** Set true for the large hero placement to get eager loading + higher priority. */
  priority?: boolean;
};

/**
 * The real O2+ bottle product photo, framed in a soft rounded card so it
 * reads intentionally against colored backgrounds (the source photo has a
 * plain white background rather than a transparent cutout).
 */
export default function BottleIllustration({ className = "", priority = false }: BottleIllustrationProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white shadow-xl ${className}`}>
      <Image
        src="/images/bottle.jpg"
        alt="O2+ packaged drinking water bottle"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 320px, 200px"
        className="object-contain p-3"
      />
    </div>
  );
}
