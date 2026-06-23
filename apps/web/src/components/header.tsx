"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { GlobeIcon } from "./icons";
import { Logo } from "./logo";

const NAV_LINKS: { label: string; href: string; accent?: boolean }[] = [
  { label: "E-Commerce", href: "/ecommerce", accent: true },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Transportations", href: "/transportations" },
  { label: "Directions", href: "/directions" },
  { label: "Resources", href: "/resources" },
  { label: "Career", href: "/career" },
  { label: "Contacts", href: "/contacts" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="-translate-x-1/2 absolute top-6 left-1/2 z-20 w-[min(1180px,calc(100%-2rem))] sm:top-8">
      <nav className="flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-5 shadow-lg shadow-black/5">
        <Link href="/" aria-label="GRS Logistics home" className="shrink-0">
          <Logo className="h-7 w-auto text-[#242527]" />
        </Link>
        <ul className="mx-auto hidden items-center gap-6 font-medium text-sm lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`whitespace-nowrap transition-colors ${
                  link.accent
                    ? "font-semibold text-[#EE1C4D] hover:text-[#d2123f]"
                    : "text-neutral-600 hover:text-[#EE1C4D]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Change language"
          className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[#242527] transition-colors hover:bg-neutral-200 lg:ml-0"
        >
          <GlobeIcon className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[#242527] transition-colors hover:bg-neutral-200 lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-2 overflow-hidden rounded-3xl bg-white p-2 shadow-lg shadow-black/5 lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-neutral-50 ${
                  link.accent ? "font-semibold text-[#EE1C4D]" : "text-neutral-700"
                }`}
              >
                {link.label}
                {link.accent && (
                  <span className="rounded-full bg-[#EE1C4D]/10 px-2 py-0.5 font-medium text-[10px] text-[#EE1C4D] uppercase tracking-wide">
                    Shop
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
