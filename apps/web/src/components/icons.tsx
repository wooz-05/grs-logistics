import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const PinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const SwapIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M7 4 4 7l3 3" />
    <path d="M4 7h13" />
    <path d="m17 20 3-3-3-3" />
    <path d="M20 17H7" />
  </svg>
);

export const GlobeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
  </svg>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="m14 7-5 5 5 5" />
  </svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="m10 7 5 5-5 5" />
  </svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
  </svg>
);

export const BoxIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
    <path d="m3 8 9 5 9-5" />
    <path d="M12 13v8.5" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
