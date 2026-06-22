"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { GlobeIcon } from "./icons";
import { Logo } from "./logo";

// E-Commerce is a live page; the rest are placeholders that show a notice.
const NAV_LINKS: { label: string; href?: string }[] = [
  { label: "E-Commerce", href: "/ecommerce" },
  { label: "About Us" },
  { label: "Services" },
  { label: "Transportations" },
  { label: "Directions" },
  { label: "Resources" },
  { label: "Career" },
  { label: "Contacts" },
];

export const Header = () => {
  const [notice, setNotice] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotice = (link: string) => {
    setNotice(link);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(null), 2800);
  };

  return (
    <>
      <header className="-translate-x-1/2 absolute top-6 left-1/2 z-20 w-[min(1180px,calc(100%-2rem))] sm:top-8">
        <nav className="flex items-center gap-4 rounded-full bg-white py-2 pr-2 pl-5 shadow-lg shadow-black/5">
          <Logo className="h-7 w-auto shrink-0 text-[#242527]" />
          <ul className="mx-auto hidden items-center gap-6 font-medium text-[#242527] text-sm lg:flex">
            {NAV_LINKS.map((link) =>
              link.href ? (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="whitespace-nowrap font-semibold text-[#EE1C4D] transition-colors hover:text-[#d2123f]"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => showNotice(link.label)}
                    className="whitespace-nowrap text-neutral-600 transition-colors hover:text-[#EE1C4D]"
                  >
                    {link.label}
                  </button>
                </li>
              ),
            )}
          </ul>
          <button
            type="button"
            aria-label="Change language"
            className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[#242527] transition-colors hover:bg-neutral-200 lg:ml-0"
          >
            <GlobeIcon className="size-5" />
          </button>
        </nav>
      </header>

      {/* Under-development notice for not-yet-built pages */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="-translate-x-1/2 fixed bottom-6 left-1/2 z-50 flex items-center gap-3 rounded-full border border-neutral-100 bg-white py-3 pr-5 pl-4 shadow-xl shadow-black/10"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EE1C4D]/10">
              🚧
            </span>
            <span className="text-[#242527] text-sm">
              <span className="font-semibold">{notice}</span>, Page is under
              development
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
