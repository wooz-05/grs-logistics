import { Reveal } from "./reveal";

const GrsArrow = () => (
  <svg width="14" height="12" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" fill="#EE1C4D"/>
    <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" fill="#EE1C4D"/>
  </svg>
);

type SectionHeaderProps = {
  tag: string;
  heading: React.ReactNode;
  light?: boolean;
};

export const SectionHeader = ({ tag, heading, light = false }: SectionHeaderProps) => (
  <div
    className={`flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between ${
      light ? "text-white" : "text-[#242527]"
    }`}
  >
    <Reveal>
      <span
        className={`inline-flex items-center gap-1.5 font-medium text-sm ${
          light ? "text-white/70" : "text-neutral-500"
        }`}
      >
        <GrsArrow />
        {tag}
      </span>
    </Reveal>
    <Reveal delay={0.1}>
      <h2 className="max-w-xl text-pretty text-right font-bold text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    </Reveal>
  </div>
);
