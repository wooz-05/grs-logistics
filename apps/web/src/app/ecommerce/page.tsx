"use client";

import {
  ArrowRight,
  BadgePercent,
  ChevronRight,
  Headset,
  RotateCcw,
  Search,
  Truck,
} from "lucide-react";
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
import { GrsArrow, ProductCard, Tag, useCart } from "./store";

const CATEGORY_CARDS = [
  { name: "Boxes & Mailers", image: "/shop/boxes.jpg" },
  { name: "Tape & Wrap", image: "/shop/tapegun.jpg" },
  { name: "Pallets & Handling", image: "/shop/forklift.jpg" },
  { name: "Storage & Handling", image: "/shop/shelving.jpg" },
  { name: "Labels & Printing", image: "/shop/labels.jpg" },
];

const VALUE_PROPS = [
  { icon: Truck, title: "Free 2-day delivery", text: "On every GRS Prime order", tint: "bg-[#d2e6f8] text-[#2474b8]" },
  { icon: BadgePercent, title: "Trade pricing", text: "Volume discounts for business", tint: "bg-[#d3eee0] text-[#2f8f59]" },
  { icon: RotateCcw, title: "30-day returns", text: "No-hassle, free returns", tint: "bg-[#fbdce5] text-[#e04a72]" },
  { icon: Headset, title: "Expert support", text: "Real logistics specialists", tint: "bg-[#e5d9f6] text-[#7649be]" },
];

export default function StorePage() {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const goToProducts = (c: string) => {
    setCategory(c);
    if (typeof document !== "undefined") {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const featured = findProduct(10);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (term === "" || `${p.title} ${p.category}`.toLowerCase().includes(term)),
    );
  }, [query, category]);

  return (
    <>
      {/* Hero */}
      <section className="bg-white p-3 sm:p-4">
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
              <a href="#products" className="inline-flex h-11 items-center rounded-full bg-[#EE1C4D] px-6 font-medium text-sm text-white transition-colors hover:bg-[#d2123f]">Shop products</a>
              <a href="#categories" className="inline-flex h-11 items-center rounded-full border border-white/40 px-6 font-medium text-sm text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#242527]">Browse categories</a>
            </div>
            <p className="mt-6 text-white/50 text-xs">Trusted by 4,000+ businesses that ship with GRS</p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto grid w-[min(1180px,calc(100%-2rem))] grid-cols-2 gap-4 pt-10 lg:grid-cols-4">
        {VALUE_PROPS.map((v) => (
          <div key={v.title} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${v.tint}`}>
              <v.icon className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-semibold text-[#242527] text-sm">{v.title}</p>
              <p className="text-neutral-500 text-xs">{v.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Shop by category */}
      <section id="categories" className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-16">
        <Reveal>
          <Tag label="Shop by category" />
          <h2 className="mt-3 font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
            Built for the way you ship
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_CARDS.map((cat, i) => {
            const n = PRODUCTS.filter((p) => p.category === cat.name).length;
            return (
              <Reveal key={cat.name} delay={(i % 3) * 0.06} blur={false}>
                <button
                  type="button"
                  onClick={() => goToProducts(cat.name)}
                  className="group relative h-64 w-full overflow-hidden rounded-3xl text-left"
                >
                  <img src={cat.image} alt={cat.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242527] via-[#242527]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-bold text-white text-xl">{cat.name}</h3>
                    <p className="text-white/70 text-sm">{n} products</p>
                    <span className="mt-2 inline-flex items-center gap-1 font-medium text-sm text-white">
                      Shop now
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
          <Reveal delay={0.12} blur={false}>
            <button
              type="button"
              onClick={() => goToProducts("All")}
              className="group flex h-64 w-full flex-col justify-between rounded-3xl bg-[#242527] p-5 text-left"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-white/10">
                <GrsArrow light />
              </span>
              <div>
                <h3 className="font-bold text-white text-xl">Browse all products</h3>
                <p className="text-white/70 text-sm">{PRODUCTS.length} items in stock</p>
                <span className="mt-2 inline-flex items-center gap-1 font-medium text-[#EE1C4D] text-sm">
                  View all
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          </Reveal>
        </div>
      </section>

      {/* Deal of the week */}
      {featured && (
        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-16">
          <Reveal blur={false}>
            <div className="grid overflow-hidden rounded-[28px] border border-neutral-200 bg-[#faf6f1] lg:grid-cols-2">
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
                  <span className="rounded-full bg-[#d3eee0] px-2.5 py-1 font-semibold text-[#2f8f59] text-xs">
                    Save {discountPct(featured)}%
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button type="button" onClick={() => addToCart(featured)} className="h-11 rounded-full bg-[#EE1C4D] px-6 font-medium text-sm text-white transition-colors hover:bg-[#d2123f]">
                    Add to cart
                  </button>
                  <Link href={`/ecommerce/${featured.id}`} className="inline-flex h-11 items-center rounded-full border border-neutral-300 px-6 font-medium text-[#242527] text-sm transition-colors hover:bg-white">
                    View product
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Product grid */}
      <section id="products" className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-16 pb-4">
        <Reveal>
          <Tag label="The catalog" />
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
              {category === "All" ? "All products" : category}
            </h2>
            <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 transition-colors focus-within:border-[#EE1C4D] sm:w-72">
              <Search className="size-4 shrink-0 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the GRS store"
                className="min-w-0 flex-1 bg-transparent text-[#242527] text-sm outline-none placeholder:text-neutral-400"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 font-medium text-sm transition-colors ${
                category === c
                  ? "bg-[#EE1C4D] text-white"
                  : "border border-neutral-200 text-[#242527] hover:border-neutral-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="mt-4 text-neutral-500 text-sm">
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length === 0 ? (
          <p className="mt-6 rounded-3xl border border-neutral-200 border-dashed bg-neutral-50 py-20 text-center text-neutral-500 text-sm">
            No products match "{query}". Try a different search.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 0.05} blur={false}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
