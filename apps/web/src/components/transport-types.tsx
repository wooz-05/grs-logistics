import { SectionHeader } from "./section-header";

const TRANSPORT = [
  "Sea Transport",
  "Ground Transport",
  "Rail Transport",
  "Air Transport",
];

const TransportCard = ({ title }: { title: string }) => (
  <article
    className="group relative flex aspect-[16/10] items-start overflow-hidden rounded-2xl bg-neutral-200 p-6"
    style={{
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(0,0,0,0.035) 0 12px, transparent 12px 24px)",
    }}
  >
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/30"
    />
    <h3 className="relative font-semibold text-white text-xl drop-shadow-sm">
      {title}
    </h3>
  </article>
);

export const TransportTypes = () => (
  <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
    <SectionHeader tag="Types of Transport" />
    <div className="mt-10 grid gap-5 sm:grid-cols-2">
      {TRANSPORT.map((title) => (
        <TransportCard key={title} title={title} />
      ))}
    </div>
  </section>
);
