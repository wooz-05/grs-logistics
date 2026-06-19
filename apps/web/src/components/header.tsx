import { Logo } from "./logo";
import { GlobeIcon } from "./icons";

const NAV_LINKS = [
  "About Us",
  "Services",
  "Transportations",
  "Directions",
  "Resources",
  "Career",
  "Contacts",
];

export const Header = () => (
  <header className="-translate-x-1/2 absolute top-5 left-1/2 z-20 w-[min(1180px,calc(100%-2rem))]">
    <nav className="flex items-center gap-4 rounded-full bg-white py-2 pr-2 pl-5 shadow-lg shadow-black/5">
      <Logo className="h-7 w-auto shrink-0 text-[#242527]" />
      <ul className="mx-auto hidden items-center gap-6 font-medium text-[#242527] text-sm lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="whitespace-nowrap text-neutral-600 transition-colors hover:text-[#EE1C4D]"
            >
              {link}
            </a>
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
    </nav>
  </header>
);
