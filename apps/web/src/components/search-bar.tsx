"use client";

import { useEffect, useRef, useState } from "react";
import {
  BoxIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PinIcon,
  SearchIcon,
  SwapIcon,
} from "./icons";

type Location = { city: string; country: string; code: string };

const LOCATIONS: Location[] = [
  { city: "Shanghai", country: "China", code: "CNSHA" },
  { city: "Singapore", country: "Singapore", code: "SGSIN" },
  { city: "Rotterdam", country: "Netherlands", code: "NLRTM" },
  { city: "Los Angeles", country: "United States", code: "USLAX" },
  { city: "New York", country: "United States", code: "USNYC" },
  { city: "Hamburg", country: "Germany", code: "DEHAM" },
  { city: "Dubai", country: "United Arab Emirates", code: "AEJEA" },
  { city: "Hong Kong", country: "China", code: "HKHKG" },
  { city: "Antwerp", country: "Belgium", code: "BEANR" },
  { city: "Busan", country: "South Korea", code: "KRPUS" },
  { city: "London", country: "United Kingdom", code: "GBLGP" },
  { city: "Tokyo", country: "Japan", code: "JPTYO" },
  { city: "São Paulo", country: "Brazil", code: "BRSSZ" },
  { city: "Mumbai", country: "India", code: "INNSA" },
  { city: "Sydney", country: "Australia", code: "AUSYD" },
];

const CARGO_OPTIONS = [
  "FCL, 20' ST",
  "FCL, 40' ST",
  "FCL, 40' HC",
  "LCL",
  "Reefer",
  "Breakbulk / Project",
];

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const locLabel = (l: Location) => `${l.city}, ${l.country}`;
const parseIso = (iso: string): [number, number, number] => {
  const [y, m, d] = iso.split("-");
  return [Number(y), Number(m), Number(d)];
};
const formatDate = (iso: string) => {
  const [y, m, d] = parseIso(iso);
  return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
};
const toIso = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const filterLocations = (q: string) => {
  const term = q.trim().toLowerCase();
  const list = term
    ? LOCATIONS.filter((l) =>
        `${l.city} ${l.country} ${l.code}`.toLowerCase().includes(term),
      )
    : LOCATIONS;
  return list.slice(0, 6);
};

const fieldWrap =
  "flex min-w-0 flex-1 items-center gap-2.5 rounded-full px-4 py-2.5 text-left transition-colors focus-within:bg-neutral-100";
const inputBase =
  "min-w-0 flex-1 bg-transparent text-sm text-[#242527] outline-none placeholder:text-neutral-400";
const panel =
  "absolute top-full z-50 mt-2 rounded-2xl border border-neutral-100 bg-white p-1.5 shadow-xl shadow-black/10";
const Divider = () => (
  <span className="hidden h-7 w-px shrink-0 bg-neutral-200 sm:block" />
);

const LocationField = ({
  value,
  setValue,
  placeholder,
  isOpen,
  requestOpen,
  close,
}: {
  value: string;
  setValue: (v: string) => void;
  placeholder: string;
  isOpen: boolean;
  requestOpen: () => void;
  close: () => void;
}) => {
  const [active, setActive] = useState(0);
  const matches = filterLocations(value);

  const choose = (loc: Location) => {
    setValue(locLabel(loc));
    close();
  };

  return (
    <div className="relative flex min-w-0 flex-1">
      <div className={fieldWrap}>
        <span className="shrink-0 text-[#EE1C4D]">
          <PinIcon className="size-4" />
        </span>
        <input
          className={inputBase}
          placeholder={placeholder}
          value={value}
          onFocus={requestOpen}
          onChange={(e) => {
            setValue(e.target.value);
            requestOpen();
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (!isOpen || matches.length === 0) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % matches.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a - 1 + matches.length) % matches.length);
            } else if (e.key === "Enter") {
              e.preventDefault();
              const loc = matches[active];
              if (loc) choose(loc);
            } else if (e.key === "Escape") {
              close();
            }
          }}
        />
      </div>

      {isOpen && matches.length > 0 && (
        <div className={`${panel} left-0 w-72`}>
          {matches.map((loc, i) => (
            <button
              key={loc.code}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(loc)}
              onMouseEnter={() => setActive(i)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                i === active ? "bg-neutral-100" : "hover:bg-neutral-100"
              }`}
            >
              <span className="shrink-0 text-[#EE1C4D]">
                <PinIcon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[#242527] text-sm">
                  {loc.city}
                </span>
                <span className="block truncate text-neutral-400 text-xs">
                  {loc.country}
                </span>
              </span>
              <span className="ml-auto shrink-0 font-medium text-neutral-400 text-xs tracking-wide">
                {loc.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

type OpenField = "origin" | "destination" | "date" | "cargo" | null;

export const SearchBar = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("2026-06-16");
  const [cargo, setCargo] = useState(CARGO_OPTIONS[0]);
  const [open, setOpen] = useState<OpenField>(null);
  const [view, setView] = useState(() => {
    const [y, m] = parseIso("2026-06-16");
    return { year: y, month: m - 1 };
  });
  const rootRef = useRef<HTMLFormElement>(null);

  // Close any open popover on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openDate = () => {
    const [y, m] = date.split("-").map(Number);
    setView({ year: y, month: m - 1 });
    setOpen(open === "date" ? null : "date");
  };

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const stepMonth = (dir: number) =>
    setView((v) => {
      const next = v.month + dir;
      return {
        year: v.year + Math.floor(next / 12),
        month: ((next % 12) + 12) % 12,
      };
    });
  const pickDate = (day: number) => {
    setDate(toIso(view.year, view.month, day));
    setOpen(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(null);
    const contact = document.getElementById("contact");
    if (!contact) return;
    contact.scrollIntoView({ behavior: "smooth" });
    const message = contact.querySelector<HTMLTextAreaElement>("textarea");
    if (message && origin && destination) {
      message.value = `Quote request: ${origin} → ${destination}, ${cargo}, ready ${formatDate(date)}.`;
      message.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  return (
    <form
      ref={rootRef}
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-1.5 rounded-2xl bg-white p-1.5 shadow-xl shadow-black/10 sm:flex-row sm:items-center sm:rounded-full"
    >
      <LocationField
        value={origin}
        setValue={setOrigin}
        placeholder="Origin — city, port, ZIP"
        isOpen={open === "origin"}
        requestOpen={() => setOpen("origin")}
        close={() => setOpen(null)}
      />

      <button
        type="button"
        onClick={swap}
        aria-label="Swap origin and destination"
        className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 sm:flex"
      >
        <SwapIcon className="size-4" />
      </button>

      <Divider />

      <LocationField
        value={destination}
        setValue={setDestination}
        placeholder="Destination — city, port, ZIP"
        isOpen={open === "destination"}
        requestOpen={() => setOpen("destination")}
        close={() => setOpen(null)}
      />

      <Divider />

      {/* Date */}
      <div className="relative flex min-w-0 flex-1">
        <button
          type="button"
          onClick={openDate}
          className={fieldWrap}
        >
          <span className="shrink-0 text-[#EE1C4D]">
            <CalendarIcon className="size-4" />
          </span>
          <span className="truncate text-sm text-[#242527]">
            {formatDate(date)}
          </span>
        </button>

        {open === "date" && (
          <div className={`${panel} left-0 w-72 p-3`}>
            <div className="mb-2 flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => stepMonth(-1)}
                aria-label="Previous month"
                className="grid size-7 place-items-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100"
              >
                <ChevronLeftIcon className="size-4" />
              </button>
              <span className="font-medium text-[#242527] text-sm">
                {MONTHS_LONG[view.month]} {view.year}
              </span>
              <button
                type="button"
                onClick={() => stepMonth(1)}
                aria-label="Next month"
                className="grid size-7 place-items-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100"
              >
                <ChevronRightIcon className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {WEEKDAYS.map((w) => (
                <div
                  key={w}
                  className="grid h-8 place-items-center text-neutral-400 text-xs"
                >
                  {w}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed leading blanks
                <div key={`blank-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const iso = toIso(view.year, view.month, day);
                const selected = iso === date;
                const past = new Date(view.year, view.month, day) < today;
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={past}
                    onClick={() => pickDate(day)}
                    className={`grid h-8 place-items-center rounded-lg text-sm transition-colors ${
                      selected
                        ? "bg-[#EE1C4D] font-medium text-white"
                        : past
                          ? "cursor-not-allowed text-neutral-300"
                          : "text-[#242527] hover:bg-neutral-100"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Divider />

      {/* Cargo */}
      <div className="relative flex min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setOpen(open === "cargo" ? null : "cargo")}
          className={fieldWrap}
        >
          <span className="shrink-0 text-[#EE1C4D]">
            <BoxIcon className="size-4" />
          </span>
          <span className="truncate text-sm text-[#242527]">{cargo}</span>
          <ChevronDownIcon
            className={`ml-auto size-4 shrink-0 text-neutral-400 transition-transform ${
              open === "cargo" ? "rotate-180" : ""
            }`}
          />
        </button>

        {open === "cargo" && (
          <div className={`${panel} right-0 w-56`}>
            {CARGO_OPTIONS.map((option) => {
              const selected = option === cargo;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setCargo(option);
                    setOpen(null);
                  }}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "font-medium text-[#EE1C4D]"
                      : "text-[#242527] hover:bg-neutral-100"
                  }`}
                >
                  {option}
                  {selected && <CheckIcon className="ml-auto size-4" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        aria-label="Search shipments"
        className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#EE1C4D] px-5 font-medium text-sm text-white transition-colors hover:bg-[#d2123f] sm:size-12 sm:px-0"
      >
        <SearchIcon className="size-5" />
        <span className="sm:hidden">Search</span>
      </button>
    </form>
  );
};
