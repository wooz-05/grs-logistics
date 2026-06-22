import { Reveal } from "./reveal";

const GrsArrow = () => (
  <svg width="14" height="12" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" fill="#EE1C4D"/>
    <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" fill="#EE1C4D"/>
  </svg>
);

// The GRS arrow mark (same as the hero marquee), stacked for the vertical marquee
const MarqueeArrow = () => (
  <svg
    width="180"
    height="150"
    viewBox="0 0 30 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="mb-[10px] shrink-0"
  >
    <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" fill="#242527" />
    <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" fill="#242527" />
  </svg>
);

// One repeating segment of the vertical marquee, stacked twice so the
// -50% translateY shift loops seamlessly
const ArrowColumn = () => (
  <div className="flex shrink-0 flex-col items-center">
    {Array.from({ length: 48 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
      <MarqueeArrow key={i} />
    ))}
  </div>
);

const GrsTag = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-1.5 font-medium text-neutral-500 text-sm">
    <GrsArrow />
    {label}
  </span>
);

const CARDS = [
  {
    title: "Customs Clearance",
    description: "Full documentation handling and regulatory compliance across every border.",
    image: "/cards/customs.jpg",
  },
  {
    title: "Real-Time Tracking",
    description: "Live shipment visibility from origin to destination, 24/7.",
    image: "/cards/tracking.jpg",
  },
  {
    title: "Cold Chain Logistics",
    description: "Temperature-controlled transport for pharmaceuticals, food, and sensitive cargo.",
    image: "/cards/coldchain.jpg",
  },
  {
    title: "Project Cargo",
    description: "Heavy-lift and oversized freight solutions for the most complex shipments.",
    image: "/cards/project.jpg",
  },
  {
    title: "Last-Mile Delivery",
    description: "Reliable final-leg distribution that gets your goods to the right hands on time.",
    image: "/cards/lastmile.jpg",
  },
];

export const Showcase = () => (
  <section className="relative">
    {/* Vertical chevron marquee, subtle moving texture behind the left content */}
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="mx-auto h-full w-[min(1180px,calc(100%-2rem))]">
        <div className="relative h-full w-1/2">
          <div className="absolute inset-y-0 left-0 flex w-48 justify-center overflow-hidden opacity-[0.03]">
            <div className="flex h-max shrink-0 flex-col animate-marquee-y">
              <ArrowColumn />
              <ArrowColumn />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="relative mx-auto w-[min(1180px,calc(100%-2rem))]">
      <div className="flex flex-col gap-0 lg:flex-row lg:items-start">

        {/* Left, sticky while cards scroll */}
        <div className="top-0 py-20 sm:py-28 lg:sticky lg:h-screen lg:w-1/2 lg:flex lg:items-center lg:pr-16">
          <div>
            <Reveal><GrsTag label="Our Capabilities" /></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 line-clamp-2 max-w-lg text-pretty font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                <span className="text-[#EE1C4D]">End-to-end</span> expertise on
                every shipment
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-neutral-500 text-base leading-relaxed">
                From first mile to last, we handle every detail, so you can
                focus on growing your business.
              </p>
            </Reveal>

            {/* Key stats, inline, divider-separated for a cleaner read */}
            <Reveal delay={0.3} blur={false}>
              <div className="mt-10 flex divide-x divide-neutral-200">
                {[
                  { value: "150+", label: "Countries served" },
                  { value: "20K+", label: "Shipments / year" },
                  { value: "99.2%", label: "On-time delivery" },
                ].map((stat) => (
                  <div key={stat.label} className="px-6 first:pl-0 last:pr-0">
                    <div className="font-bold text-3xl text-[#242527] tracking-tight sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-neutral-400 text-xs uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right, scrolls past the sticky left */}
        <div className="flex flex-col gap-6 py-20 sm:py-28 lg:w-1/2">
          {CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.1}>
              <article className="group overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="aspect-[16/7] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="px-6 py-5">
                  <h3 className="font-bold text-[#242527] text-lg">{card.title}</h3>
                  <p className="mt-1.5 text-neutral-500 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </div>
  </section>
);
