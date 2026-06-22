"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChevronDownIcon } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

const FAQS = [
  {
    q: "Which regions and trade lanes do you cover?",
    a: "We operate across 150+ countries by sea, air, rail, and road, with established lanes between Asia, Europe, and the Americas. If a route isn't already on our network, our team will build it around your shipment.",
  },
  {
    q: "How do I track my shipment in real time?",
    a: "Every booking comes with access to our digital platform, where you can follow your cargo from origin to destination 24/7, with milestone alerts, ETA updates, and document access in one place.",
  },
  {
    q: "Can you handle customs clearance and documentation?",
    a: "Yes. Our in-house brokerage team manages full customs clearance, duty calculation, and regulatory compliance across every border, so your goods keep moving without paperwork delays.",
  },
  {
    q: "Do you transport temperature-sensitive or oversized cargo?",
    a: "Absolutely. We offer dedicated cold-chain solutions for pharmaceuticals and perishables, plus heavy-lift and project-cargo handling for oversized and out-of-gauge freight.",
  },
  {
    q: "How do I request a quote?",
    a: "Use the contact form below or reach out directly, share your origin, destination, cargo type, and timeline, and we'll send a tailored quote within one business day.",
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#faf6f1] py-20 sm:py-28">
      <div className="mx-auto w-[min(1180px,calc(100%-2rem))]">
        <SectionHeader
          tag="FAQ"
          heading={
            <>
              Answers to your <span className="text-[#EE1C4D]">most asked</span>{" "}
              questions
            </>
          }
        />

        <div className="mx-auto mt-12 max-w-3xl border-neutral-200 border-t">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={item.q}
                delay={i * 0.05}
                blur={false}
                className="border-neutral-200 border-b last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-medium text-[#242527] text-base sm:text-lg">
                    {item.q}
                  </span>
                  <ChevronDownIcon
                    className={`size-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#EE1C4D]" : "text-neutral-400"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pr-10 pb-5 text-neutral-500 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
