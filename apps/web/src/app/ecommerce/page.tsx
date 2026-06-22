"use client";

import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import {
  CATEGORIES,
  discountPct,
  findProduct,
  money,
  PRODUCTS,
} from "./products";
import { ProductCard, SectionLabel, Tag, useCart } from "./store";

const DEPARTMENTS = [
  { name: "Boxes & Mailers", image: "/shop/boxes.jpg" },
  { name: "Tape & Wrap", image: "/shop/tapegun.jpg" },
  { name: "Pallets & Handling", image: "/shop/forklift.jpg" },
  { name: "Storage & Handling", image: "/shop/shelving.jpg" },
  { name: "Labels & Printing", image: "/shop/labels.jpg" },
];

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export default function StorePage() {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const featured = findProduct(9);

  const goToCatalog = (c: string) => {
    setCategory(c);
    if (typeof document !== "undefined") {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (term === "" || `${p.title} ${p.category}`.toLowerCase().includes(term)),
    );
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [query, category, sort]);

  return (
    <>
      {/* Hero, floating photo panel */}
      <section className="p-3 sm:p-4">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[#242527]">
          <img src="/shop/shelving.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#242527] via-[#242527]/85 to-[#242527]/30" />
          <div className="relative z-10 mx-auto w-[min(1180px,calc(100%-3rem))] py-16 sm:py-24">
            <Tag label="GRS Supply Store" light />
            <h1 className="mt-4 max-w-xl text-balance font-bold text-4xl text-white leading-[1.1] tracking-tight sm:text-5xl">
              Everything to pack, ship, and move.
            </h1>
            <p className="mt-4 max-w-md text-base text-white/70 leading-relaxed">
              Warehouse-grade supplies at trade prices, delivered fast. Stock up on boxes, tape, pallets, and racking built for real logistics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalog" className="inline-flex h-11 items-center rounded-full bg-[#EE1C4D] px-6 font-medium text-sm text-white transition-colors hover:bg-[#d2123f]">
                Shop products
              </a>
              <a href="#departments" className="inline-flex h-11 items-center rounded-full border border-white/40 px-6 font-medium text-sm text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#242527]">
                Browse departments
              </a>
            </div>
            <p className="mt-6 text-white/50 text-xs">Trusted by 4,000+ businesses that ship with GRS</p>
          </div>
        </div>
      </section>

      {/* Departments bento */}
      <section id="departments" className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
        <Reveal>
          <SectionLabel eyebrow="Departments" title="Shop every corner of the warehouse" />
        </Reveal>
        <div className="mt-8 grid auto-rows-[180px] gap-3 sm:auto-rows-[210px] sm:grid-cols-2 lg:grid-cols-4">
          {DEPARTMENTS.map((d, i) => {
            const n = PRODUCTS.filter((p) => p.category === d.name).length;
            const big = i === 0;
            return (
              <button
                key={d.name}
                type="button"
                onClick={() => goToCatalog(d.name)}
                className={`group relative overflow-hidden rounded-2xl text-left ${big ? "sm:col-span-2 sm:row-span-2" : ""}`}
              >
                <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242527] via-[#242527]/30 to-transparent" />
                <span className="absolute top-4 left-4 font-bold text-sm text-white/70 tabular-nums">
                  0{i + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className={`font-bold text-white ${big ? "text-2xl" : "text-lg"}`}>{d.name}</h3>
                  <p className="text-white/70 text-sm">{n} products</p>
                  <span className="mt-2 inline-flex items-center gap-1 font-medium text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Shop now
                    <ChevronRight className="size-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Deal of the week */}
      {featured && (
        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] pb-4">
          <Reveal blur={false}>
            <div className="grid overflow-hidden rounded-[28px] border border-neutral-200 bg-white lg:grid-cols-2">
              <div className="relative min-h-[260px] lg:min-h-full">
                <img src={featured.image} alt={featured.title} className="absolute inset-0 size-full object-cover" />
              </div>
              <div className="flex flex-col justify-center gap-3 p-8 sm:p-12">
                <span className="inline-flex w-fit rounded-full bg-[#EE1C4D] px-3 py-1 font-semibold text-white text-xs uppercase tracking-wide">
                  Deal of the week
                </span>
                <h2 className="font-bold text-3xl text-[#242527] leading-tight tracking-tight">{featured.title}</h2>
                <p className="max-w-md text-neutral-500 text-sm leading-relaxed">{featured.blurb}</p>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-bold text-3xl text-[#242527]">{money(featured.price)}</span>
                  {featured.listPrice && (
                    <span className="text-lg text-neutral-400 line-through">{money(featured.listPrice)}</span>
                  )}
                  {featured.listPrice && (
                    <span className="rounded-full bg-[#d3eee0] px-2.5 py-1 font-semibold text-[#2f8f59] text-xs">
                      Save {discountPct(featured)}%
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button type="button" onClick={() => addToCart(featured)} className="h-11 rounded-full bg-[#EE1C4D] px-6 font-medium text-sm text-white transition-colors hover:bg-[#d2123f]">
                    Add to cart
                  </button>
                  <Link href={`/ecommerce/${featured.id}`} className="inline-flex h-11 items-center rounded-full border border-neutral-300 px-6 font-medium text-[#242527] text-sm transition-colors hover:bg-neutral-50">
                    View product
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Catalog: filter rail + grid */}
      <section id="catalog" className="bg-white">
        <div className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
          <Reveal>
            <SectionLabel eyebrow="The catalog" title="Every supply, one cart" />
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[230px_1fr]">
            {/* Filter rail */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 transition-colors focus-within:border-[#EE1C4D]">
                <Search className="size-4 shrink-0 text-neutral-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search supplies"
                  className="min-w-0 flex-1 bg-transparent text-[#242527] text-sm outline-none placeholder:text-neutral-400"
                />
              </div>

              <p className="mt-7 mb-3 font-semibold text-[11px] text-neutral-400 uppercase tracking-wider">
                Departments
              </p>
              <div className="flex flex-col gap-1">
                {["All", ...CATEGORIES].map((c) => {
                  const active = category === c;
                  const n = c === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        active ? "bg-[#EE1C4D]/10 font-semibold text-[#EE1C4D]" : "text-[#242527] hover:bg-neutral-100"
                      }`}
                    >
                      <span>{c}</span>
                      <span className={active ? "text-[#EE1C4D]" : "text-neutral-400"}>{n}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Grid */}
            <div>
              <div className="flex items-center justify-between gap-4 border-neutral-100 border-b pb-4">
                <p className="text-neutral-500 text-sm">
                  <span className="font-semibold text-[#242527]">{results.length}</span> product{results.length === 1 ? "" : "s"}
                  {category !== "All" ? ` in ${category}` : ""}
                </p>
                <label className="flex items-center gap-2 text-sm">
                  <span className="hidden text-neutral-500 sm:inline">Sort</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[#242527] text-sm outline-none transition-colors hover:border-neutral-300"
                  >
                    {SORTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {results.length === 0 ? (
                <p className="mt-6 rounded-2xl border border-neutral-200 border-dashed bg-neutral-50 py-20 text-center text-neutral-500 text-sm">
                  No products match "{query}". Try a different search.
                </p>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
                  {results.map((product, i) => (
                    <Reveal key={product.id} delay={(i % 3) * 0.05} blur={false}>
                      <ProductCard product={product} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
