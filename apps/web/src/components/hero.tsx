import { PinIcon, SearchIcon, SwapIcon, ChevronDownIcon } from "./icons";

const SearchField = ({
  icon,
  value,
  muted = false,
  trailing,
}: {
  icon?: React.ReactNode;
  value: string;
  muted?: boolean;
  trailing?: React.ReactNode;
}) => (
  <div className="flex min-w-0 flex-1 items-center gap-2.5 px-4">
    {icon && <span className="shrink-0 text-[#EE1C4D]">{icon}</span>}
    <span
      className={`truncate text-sm ${muted ? "text-neutral-400" : "text-[#242527]"}`}
    >
      {value}
    </span>
    {trailing && <span className="ml-auto shrink-0">{trailing}</span>}
  </div>
);

const Divider = () => <span className="h-7 w-px shrink-0 bg-neutral-200" />;

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

      <div className="relative z-10 mx-auto flex h-full w-[min(1180px,calc(100%-3rem))] flex-col justify-center pt-28 pb-12">
      <h1 className="max-w-2xl text-balance font-bold text-5xl text-white leading-[1.05] tracking-tight sm:text-6xl">
        Improving efficiency with logistics.
      </h1>

      {/* Search bar */}
      <div className="mt-10 flex flex-col gap-1.5 rounded-2xl bg-white p-1.5 shadow-xl shadow-black/10 sm:flex-row sm:items-center sm:rounded-full">
        <SearchField
          icon={<PinIcon className="size-4" />}
          value="City, terminal, ZIP code etc."
          muted
        />
        <button
          type="button"
          aria-label="Swap origin and destination"
          className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 sm:flex"
        >
          <SwapIcon className="size-4" />
        </button>
        <Divider />
        <SearchField
          icon={<PinIcon className="size-4" />}
          value="City, terminal, ZIP code etc."
          muted
        />
        <Divider />
        <SearchField value="16 Jun 2026" />
        <Divider />
        <SearchField
          value="FCL, 20' ST"
          trailing={<ChevronDownIcon className="size-4 text-neutral-400" />}
        />
        <button
          type="button"
          aria-label="Search"
          className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#EE1C4D] px-5 font-medium text-sm text-white transition-colors hover:bg-[#d2123f] sm:size-12 sm:px-0"
        >
          <SearchIcon className="size-5" />
          <span className="sm:hidden">Search</span>
        </button>
      </div>

      {/* Sub row */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-white/80 leading-relaxed">
          Reliable transport. Real-time tracking.
          <br />
          Tailored logistics for your business.
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
