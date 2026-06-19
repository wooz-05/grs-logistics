import { Placeholder } from "./placeholder";

const CARDS = [
  {
    title: "Customs Clearance",
    description: "Full documentation handling and regulatory compliance across every border.",
  },
  {
    title: "Real-Time Tracking",
    description: "Live shipment visibility from origin to destination, 24/7.",
  },
  {
    title: "Cold Chain Logistics",
    description: "Temperature-controlled transport for pharmaceuticals, food, and sensitive cargo.",
  },
  {
    title: "Project Cargo",
    description: "Heavy-lift and oversized freight solutions for the most complex shipments.",
  },
  {
    title: "Last-Mile Delivery",
    description: "Reliable final-leg distribution that gets your goods to the right hands on time.",
  },
];

export const Showcase = () => (
  <section className="relative">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(115deg, #242527 0 2px, transparent 2px 26px)",
      }}
    />

    <div className="relative mx-auto w-[min(1180px,calc(100%-2rem))]">
      <div className="flex flex-col gap-0 lg:flex-row lg:items-start">

        {/* Left — sticky while cards scroll */}
        <div className="top-0 py-24 lg:sticky lg:h-screen lg:w-1/2 lg:flex lg:items-center lg:pr-16">
          <div>
            <span className="mb-4 inline-block rounded-full bg-[#EE1C4D]/10 px-3 py-1 font-medium text-[#EE1C4D] text-xs uppercase tracking-widest">
              Our Capabilities
            </span>
            <h2 className="mt-2 max-w-md text-pretty font-bold text-4xl text-[#242527] leading-tight tracking-tight sm:text-5xl">
              Every shipment backed by{" "}
              <span className="text-[#EE1C4D]">end-to-end</span> expertise
            </h2>
            <p className="mt-6 max-w-sm text-neutral-500 text-sm leading-relaxed">
              From the first mile to the last, GRS Logistics handles every
              detail — documentation, compliance, real-time visibility, and
              dedicated support — so you can focus on growing your business.
            </p>

            {/* Stat pills */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { value: "150+", label: "Countries served" },
                { value: "20K+", label: "Shipments / year" },
                { value: "99.2%", label: "On-time delivery" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col rounded-2xl border border-neutral-200 px-5 py-4"
                >
                  <span className="font-bold text-2xl text-[#242527]">{stat.value}</span>
                  <span className="mt-0.5 text-neutral-500 text-xs">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — scrolls past the sticky left */}
        <div className="flex flex-col gap-6 py-24 lg:w-1/2">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <Placeholder className="aspect-[16/7] w-full" />
              <div className="px-6 py-5">
                <h3 className="font-bold text-[#242527] text-lg">{card.title}</h3>
                <p className="mt-1.5 text-neutral-500 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  </section>
);
