import { SearchBar } from "./search-bar";

// The GRS arrow mark, sized for the hero band
const HeroArrow = () => (
  <svg
    width="96"
    height="80"
    viewBox="0 0 30 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="mr-[5px] shrink-0"
  >
    <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" fill="white" />
    <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" fill="white" />
  </svg>
);

// One repeating segment of arrows — duplicated side by side so the
// -50% marquee shift loops seamlessly
const ArrowRow = () => (
  <div className="flex shrink-0 items-center">
    {Array.from({ length: 48 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
      <HeroArrow key={i} />
    ))}
  </div>
);

export const Hero = () => (
  <section className="bg-white p-3 sm:p-4">
    {/* Floating rounded hero panel — fills the screen with an even white gap on all sides */}
    <div className="relative isolate h-[calc(100dvh-1.5rem)] min-h-[600px] overflow-hidden rounded-[28px] bg-neutral-300 sm:h-[calc(100dvh-2rem)]">
      {/* Background video */}
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/transport/sea.png"
      >
        <source src="/hero.webm" type="video/webm" />
      </video>
      {/* Darkening layers — a light scrim plus a gradient keep the white
          headline and search bar readable without dimming the clip too much */}
      <div aria-hidden className="absolute inset-0 bg-[#242527]/30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#242527]/40 via-[#242527]/10 to-[#242527]/45"
      />

      {/* Infinite leftward marquee of GRS arrows behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex items-start overflow-hidden opacity-10"
      >
        <div className="flex w-max shrink-0 animate-arrow-marquee">
          <ArrowRow />
          <ArrowRow />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full w-[min(1180px,calc(100%-3rem))] flex-col justify-center pt-28 pb-12">
      <h1 className="max-w-2xl text-balance font-bold text-5xl text-white leading-[1.05] tracking-tight sm:text-6xl">
        Your cargo, delivered with precision.
      </h1>

      {/* Search bar */}
      <SearchBar />

      {/* Sub row */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-white/80 leading-relaxed">
          Global reach. Real-time visibility.
          <br />
          Logistics solutions built for your business.
        </p>
        <button
          type="button"
          className="w-fit rounded-full border border-white/40 px-6 py-3 font-medium text-sm text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#242527]"
        >
          Tender Invitation
        </button>
      </div>
      </div>
    </div>
  </section>
);
