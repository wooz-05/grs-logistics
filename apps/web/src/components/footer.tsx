import { Logo } from "./logo";

const FOOTER_LINKS = [
  "About Us",
  "Services",
  "Transportations",
  "Directions",
  "Resources",
  "Career",
  "Contacts",
];

export const Footer = () => (
  // Floating rounded panel, mirrors the hero, with an even white gap on all sides
  <footer className="bg-white p-3 sm:p-4">
    <div className="overflow-hidden rounded-[28px] bg-[#242527] text-white">
      <div className="mx-auto flex w-[min(1180px,calc(100%-3rem))] flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <Logo className="h-8 w-auto text-white" />
        <ul className="flex flex-wrap gap-x-6 gap-y-3 font-medium text-sm">
          {FOOTER_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-white/70 transition-colors hover:text-white"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-white/10 border-t">
        <p className="mx-auto w-[min(1180px,calc(100%-3rem))] py-6 text-white/50 text-xs">
          © {2026} GRS Logistics. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
