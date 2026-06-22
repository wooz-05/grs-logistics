"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./reveal";

const GrsArrow = () => (
  <svg
    width="14"
    height="12"
    viewBox="0 0 30 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z"
      fill="#EE1C4D"
    />
    <path
      d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z"
      fill="#EE1C4D"
    />
  </svg>
);

const DETAILS = [
  { icon: Mail, label: "Email us", value: "hello@grslogistics.com" },
  { icon: Phone, label: "Call us", value: "+1 (555) 018-2200" },
  { icon: MapPin, label: "Visit us", value: "Pier 17, Harbor Bay, NY 10004" },
];

const fieldClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-[#242527] outline-none transition placeholder:text-neutral-400 focus:border-[#EE1C4D] focus:ring-2 focus:ring-[#EE1C4D]/15";

export const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left — intro + contact details */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 font-medium text-neutral-500 text-sm">
              <GrsArrow />
              Contacts
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 line-clamp-2 max-w-lg text-pretty font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Let's move your cargo <span className="text-[#EE1C4D]">forward</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-neutral-500 text-base leading-relaxed">
              Tell us about your shipment and we'll get back to you within one
              business day with a tailored logistics solution.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-5">
            {DETAILS.map((d, i) => (
              <Reveal key={d.label} delay={0.3 + i * 0.08} blur={false}>
                <div className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EE1C4D]/10 text-[#EE1C4D]">
                    <d.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-neutral-400 text-xs">{d.label}</p>
                    <p className="font-medium text-[#242527] text-sm">{d.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex flex-col gap-4 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={fieldClass} placeholder="Full name" required />
              <input
                type="email"
                className={fieldClass}
                placeholder="Email address"
                required
              />
            </div>
            <input className={fieldClass} placeholder="Company (optional)" />
            <textarea
              rows={5}
              className={`${fieldClass} resize-none`}
              placeholder="Tell us about your shipment — origin, destination, cargo type…"
              required
            />
            <button
              type="submit"
              disabled={sent}
              className="mt-2 flex h-12 items-center justify-center rounded-full bg-[#EE1C4D] px-6 font-medium text-sm text-white transition-colors hover:bg-[#d2123f] disabled:cursor-default disabled:bg-emerald-600"
            >
              {sent ? "Thanks — we'll be in touch ✓" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
