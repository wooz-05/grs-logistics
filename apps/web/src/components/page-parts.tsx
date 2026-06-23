import Link from "next/link";
import type { ReactNode } from "react";

const Arrow = ({ light = false }: { light?: boolean }) => (
  <svg width="14" height="12" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" fill={light ? "#fff" : "#EE1C4D"} />
    <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" fill={light ? "#fff" : "#EE1C4D"} />
  </svg>
);

export const PageHero = ({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
}) => (
  <section className="bg-white p-3 sm:p-4">
    <div className="relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[28px] bg-[#242527] px-6 py-12 sm:min-h-[460px] sm:px-12 sm:py-16">
      {image && (
        <img src={image} alt="" className="absolute inset-0 size-full object-cover opacity-40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#242527] via-[#242527]/70 to-[#242527]/30" />
      <div className="relative z-10 mx-auto w-full max-w-[min(1180px,calc(100%-1.5rem))]">
        <span className="inline-flex items-center gap-1.5 font-medium text-sm text-white/70">
          <Arrow light />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl text-balance font-bold text-4xl text-white leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-base text-white/70 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  </section>
);

export const SectionEyebrow = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2">
    <Arrow />
    <span className="font-semibold text-[#EE1C4D] text-xs uppercase tracking-[0.22em]">
      {label}
    </span>
  </div>
);

export const CtaBand = ({
  title,
  text,
  primaryLabel = "Get in touch",
  primaryHref = "/contacts",
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  text: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) => (
  <section className="bg-white p-3 sm:p-4">
    <div className="relative isolate overflow-hidden rounded-[28px] bg-[#EE1C4D]">
      <svg
        aria-hidden
        viewBox="0 0 30 25"
        fill="currentColor"
        className="pointer-events-none absolute -right-6 -bottom-10 h-72 w-auto text-white/10"
      >
        <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" />
        <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" />
      </svg>
      <div className="relative z-10 mx-auto flex w-[min(1180px,calc(100%-3rem))] flex-col items-start gap-6 py-16 sm:items-center sm:text-center">
        <h2 className="max-w-xl font-bold text-3xl text-white leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-md text-white/80 leading-relaxed">{text}</p>
        <div className="flex flex-wrap gap-3">
          <Link href={primaryHref} className="inline-flex h-12 items-center rounded-full bg-white px-7 font-medium text-[#EE1C4D] text-sm transition-colors hover:bg-neutral-100">
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} className="inline-flex h-12 items-center rounded-full border border-white/60 px-7 font-medium text-sm text-white transition-colors hover:bg-white hover:text-[#EE1C4D]">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  </section>
);
