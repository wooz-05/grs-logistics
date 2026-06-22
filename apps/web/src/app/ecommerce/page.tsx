"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Box,
  Boxes,
  ChevronRight,
  ClipboardList,
  Layers,
  type LucideIcon,
  MapPin,
  Menu,
  Package,
  PackageOpen,
  Printer,
  Scale,
  Search,
  ShoppingCart,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";

const TINTS = {
  sky: "bg-[#d2e6f8] text-[#2474b8]",
  mint: "bg-[#d3eee0] text-[#2f8f59]",
  lavender: "bg-[#e5d9f6] text-[#7649be]",
  blush: "bg-[#fbdce5] text-[#e04a72]",
  peach: "bg-[#fbe3cd] text-[#e5732b]",
  butter: "bg-[#f8edc2] text-[#ce9e28]",
} as const;

type Tint = keyof typeof TINTS;

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  listPrice?: number;
  rating: number;
  reviews: number;
  icon: LucideIcon;
  tint: Tint;
  badge?: string;
};

const CATEGORIES = [
  "Boxes & Mailers",
  "Tape & Wrap",
  "Pallets & Handling",
  "Labels & Scales",
  "Moving Supplies",
];

const PRODUCTS: Product[] = [
  { id: 1, title: "Corrugated Shipping Boxes, 25 Pack", category: "Boxes & Mailers", price: 24.99, listPrice: 32.99, rating: 4.7, reviews: 1432, icon: Box, tint: "sky", badge: "Best Seller" },
  { id: 2, title: "Poly Mailer Bags, 100 Pack", category: "Boxes & Mailers", price: 13.49, listPrice: 18.0, rating: 4.6, reviews: 980, icon: Package, tint: "blush" },
  { id: 3, title: "Bubble Cushion Wrap Roll, 175 ft", category: "Tape & Wrap", price: 19.99, listPrice: 27.99, rating: 4.8, reviews: 2103, icon: PackageOpen, tint: "mint", badge: "GRS Prime" },
  { id: 4, title: "Heavy-Duty Packing Tape, 6 Pack", category: "Tape & Wrap", price: 11.99, listPrice: 15.99, rating: 4.5, reviews: 760, icon: Layers, tint: "butter" },
  { id: 5, title: "Stretch Wrap Film, 5 Pack", category: "Tape & Wrap", price: 22.5, listPrice: 29.0, rating: 4.4, reviews: 405, icon: Layers, tint: "lavender" },
  { id: 6, title: "Standard Wooden Pallet, 48 x 40", category: "Pallets & Handling", price: 14.0, rating: 4.3, reviews: 210, icon: Boxes, tint: "peach" },
  { id: 7, title: "Hydraulic Pallet Jack, 5500 lb", category: "Pallets & Handling", price: 279.0, listPrice: 329.0, rating: 4.7, reviews: 88, icon: Truck, tint: "sky", badge: "Best Seller" },
  { id: 8, title: "Thermal Shipping Label Printer", category: "Labels & Scales", price: 169.99, listPrice: 199.99, rating: 4.6, reviews: 540, icon: Printer, tint: "mint", badge: "GRS Prime" },
  { id: 9, title: "Direct Thermal Shipping Labels, 1000", category: "Labels & Scales", price: 16.99, rating: 4.8, reviews: 1290, icon: Tag, tint: "blush" },
  { id: 10, title: "Digital Shipping Scale, 110 lb", category: "Labels & Scales", price: 34.99, listPrice: 44.99, rating: 4.7, reviews: 870, icon: Scale, tint: "lavender" },
  { id: 11, title: "Quilted Moving Blankets, 6 Pack", category: "Moving Supplies", price: 39.99, rating: 4.5, reviews: 318, icon: Package, tint: "butter" },
  { id: 12, title: "Ratchet Strap Tie-Down Kit, 4 Pack", category: "Moving Supplies", price: 27.99, listPrice: 34.99, rating: 4.6, reviews: 466, icon: ClipboardList, tint: "peach" },
];

const CATEGORY_CARDS: { title: string; tiles: { icon: LucideIcon; tint: Tint }[] }[] = [
  { title: "Boxes & Mailers", tiles: [{ icon: Box, tint: "sky" }, { icon: Package, tint: "blush" }, { icon: Boxes, tint: "peach" }, { icon: PackageOpen, tint: "mint" }] },
  { title: "Tape & Wrap", tiles: [{ icon: Layers, tint: "lavender" }, { icon: PackageOpen, tint: "mint" }, { icon: Tag, tint: "blush" }, { icon: Box, tint: "butter" }] },
  { title: "Pallets & Handling", tiles: [{ icon: Boxes, tint: "peach" }, { icon: Truck, tint: "sky" }, { icon: Layers, tint: "butter" }, { icon: Package, tint: "mint" }] },
  { title: "Labels & Scales", tiles: [{ icon: Printer, tint: "mint" }, { icon: Tag, tint: "blush" }, { icon: Scale, tint: "lavender" }, { icon: ClipboardList, tint: "sky" }] },
];

const money = (n: number) => `$${n.toFixed(2)}`;

const Stars = ({ value }: { value: number }) => (
  <span className="flex items-center gap-px">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length star row
        key={i}
        className="size-3.5"
        strokeWidth={1.5}
        style={{
          color: "#deb23c",
          fill: i < Math.round(value) ? "#deb23c" : "transparent",
        }}
      />
    ))}
  </span>
);

const ProductCard = ({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (title: string) => void;
}) => {
  const Icon = product.icon;
  return (
    <div className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-3 transition-shadow hover:shadow-md">
      <div
        className={`relative mb-3 flex aspect-square items-center justify-center rounded-xl ${TINTS[product.tint]}`}
      >
        <Icon className="size-16 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.4} />
        {product.badge && (
          <span className="absolute top-2 left-2 rounded-full bg-[#EE1C4D] px-2 py-0.5 font-semibold text-[10px] text-white uppercase tracking-wide">
            {product.badge}
          </span>
        )}
      </div>
      <h3 className="line-clamp-2 min-h-[2.5rem] font-medium text-[#242527] text-sm leading-snug">
        {product.title}
      </h3>
      <div className="mt-1 flex items-center gap-1.5">
        <Stars value={product.rating} />
        <span className="text-neutral-400 text-xs">
          {product.reviews.toLocaleString()}
        </span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="font-bold text-[#242527] text-lg">
          {money(product.price)}
        </span>
        {product.listPrice && (
          <span className="text-neutral-400 text-xs line-through">
            {money(product.listPrice)}
          </span>
        )}
      </div>
      <span className="mt-0.5 font-medium text-[#2474b8] text-xs">
        GRS Prime · Free 2-day delivery
      </span>
      <button
        type="button"
        onClick={() => onAdd(product.title)}
        className="mt-3 h-9 rounded-full bg-[#f2dc8e] font-semibold text-[#242527] text-sm transition-colors hover:bg-[#ebcb63]"
      >
        Add to cart
      </button>
    </div>
  );
};

export default function EcommercePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = (title: string) => {
    setCart((c) => c + 1);
    setAdded(title);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(null), 2400);
  };

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (term === "" ||
          `${p.title} ${p.category}`.toLowerCase().includes(term)),
    );
  }, [query, category]);

  const deals = PRODUCTS.filter((p) => p.listPrice);

  return (
    <div className="min-h-screen bg-[#faf6f1]">
      {/* Top bar */}
      <div className="bg-[#242527] text-white">
        <div className="mx-auto flex w-[min(1280px,calc(100%-2rem))] items-center gap-4 py-3">
          <Link href="/" aria-label="GRS Logistics home" className="shrink-0">
            <Logo className="h-7 w-auto text-white" />
          </Link>

          <div className="hidden items-center gap-1.5 text-xs sm:flex">
            <MapPin className="size-5 text-[#EE1C4D]" strokeWidth={1.75} />
            <div className="leading-tight">
              <div className="text-white/60">Deliver to</div>
              <div className="font-semibold">New York 10004</div>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex min-w-0 flex-1 items-center overflow-hidden rounded-full bg-white"
          >
            <select
              aria-label="Search category"
              className="hidden h-10 shrink-0 border-neutral-200 border-r bg-neutral-50 px-3 text-neutral-600 text-xs outline-none sm:block"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search packing and shipping supplies"
              className="min-w-0 flex-1 px-4 py-2.5 text-[#242527] text-sm outline-none placeholder:text-neutral-400"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex h-10 shrink-0 items-center justify-center bg-[#EE1C4D] px-5 text-white transition-colors hover:bg-[#d2123f]"
            >
              <Search className="size-5" />
            </button>
          </form>

          <div className="hidden items-center gap-5 text-xs sm:flex">
            <div className="leading-tight">
              <div className="text-white/60">Hello, sign in</div>
              <div className="font-semibold">Account</div>
            </div>
            <div className="leading-tight">
              <div className="text-white/60">Returns</div>
              <div className="font-semibold">& Orders</div>
            </div>
          </div>

          <button
            type="button"
            className="relative flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-white/10"
          >
            <span className="relative">
              <ShoppingCart className="size-6" strokeWidth={1.75} />
              <span className="-right-2 -top-2 absolute flex min-w-5 items-center justify-center rounded-full bg-[#EE1C4D] px-1 font-bold text-[11px] text-white">
                {cart}
              </span>
            </span>
            <span className="hidden font-semibold text-sm sm:inline">Cart</span>
          </button>
        </div>
      </div>

      {/* Department nav */}
      <div className="bg-[#1c1d1f] text-white">
        <div className="mx-auto flex w-[min(1280px,calc(100%-2rem))] items-center gap-1 overflow-x-auto py-2 text-sm">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className="flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 font-semibold transition-colors hover:bg-white/10"
          >
            <Menu className="size-4" />
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 transition-colors hover:bg-white/10 ${
                category === c ? "text-[#EE1C4D]" : "text-white/80"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto hidden shrink-0 whitespace-nowrap pr-2 text-white/70 lg:block">
            GRS Prime · Free 2-day delivery
          </span>
        </div>
      </div>

      <main className="mx-auto w-[min(1280px,calc(100%-2rem))] pb-16">
        {/* Hero deal banner */}
        <section className="py-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#242527] via-[#341826] to-[#7a1734] px-8 py-12 sm:px-12 sm:py-16">
            <div className="relative z-10 max-w-xl">
              <span className="inline-flex rounded-full bg-[#EE1C4D] px-3 py-1 font-semibold text-white text-xs uppercase tracking-wide">
                GRS Supply Store
              </span>
              <h1 className="mt-4 text-balance font-bold text-3xl text-white leading-[1.1] tracking-tight sm:text-5xl">
                Everything to pack, ship, and move.
              </h1>
              <p className="mt-3 max-w-md text-sm text-white/70 leading-relaxed sm:text-base">
                Warehouse-grade supplies at wholesale prices, delivered fast.
                Stock up and save on boxes, tape, pallets, and more.
              </p>
              <a
                href="#deals"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-white px-6 font-semibold text-[#242527] text-sm transition-colors hover:bg-neutral-100"
              >
                Shop today's deals
              </a>
            </div>
            <Boxes
              className="-right-6 absolute bottom-0 hidden size-64 text-white/5 sm:block"
              strokeWidth={1}
            />
          </div>
        </section>

        {/* Category tiles */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <h2 className="font-bold text-[#242527] text-base">
                {card.title}
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {card.tiles.map((tile, i) => {
                  const TileIcon = tile.icon;
                  return (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: fixed tile grid
                      key={i}
                      className={`flex aspect-square items-center justify-center rounded-lg ${TINTS[tile.tint]}`}
                    >
                      <TileIcon className="size-7" strokeWidth={1.5} />
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setCategory(card.title)}
                className="mt-4 inline-flex items-center gap-1 font-semibold text-[#EE1C4D] text-sm transition-colors hover:text-[#d2123f]"
              >
                Shop now
                <ChevronRight className="size-4" />
              </button>
            </div>
          ))}
        </section>

        {/* Today's deals */}
        <section id="deals" className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-bold text-[#242527] text-xl">Today's Deals</h2>
            <span className="font-medium text-[#EE1C4D] text-sm">
              Limited time
            </span>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {deals.map((product) => {
              const off = product.listPrice
                ? Math.round((1 - product.price / product.listPrice) * 100)
                : 0;
              const Icon = product.icon;
              return (
                <div key={product.id} className="w-44 shrink-0">
                  <div
                    className={`relative flex aspect-square items-center justify-center rounded-xl ${TINTS[product.tint]}`}
                  >
                    <Icon className="size-14" strokeWidth={1.4} />
                    <span className="absolute top-2 left-2 rounded-full bg-[#EE1C4D] px-2 py-0.5 font-bold text-[11px] text-white">
                      -{off}%
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-[#242527] text-sm leading-snug">
                    {product.title}
                  </p>
                  <p className="mt-1 font-bold text-[#242527]">
                    {money(product.price)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Product grid */}
        <section className="mt-8">
          <div className="flex items-baseline justify-between">
            <h2 className="font-bold text-[#242527] text-xl">
              {category === "All" ? "Recommended for you" : category}
            </h2>
            <span className="text-neutral-500 text-sm">
              {filtered.length} item{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-neutral-200 border-dashed bg-white py-16 text-center text-neutral-500 text-sm">
              No products match "{query}". Try a different search.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Back to top */}
      <button
        type="button"
        onClick={() =>
          typeof window !== "undefined" &&
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="w-full bg-[#242527] py-4 text-center font-medium text-sm text-white transition-colors hover:bg-[#2e3033]"
      >
        Back to top
      </button>

      <Footer />

      {/* Added-to-cart toast */}
      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="-translate-x-1/2 fixed bottom-6 left-1/2 z-50 flex max-w-[90vw] items-center gap-3 rounded-full border border-neutral-100 bg-white py-3 pr-5 pl-4 shadow-xl shadow-black/10"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d3eee0] text-[#2f8f59]">
              ✓
            </span>
            <span className="truncate text-[#242527] text-sm">
              Added to cart, <span className="font-semibold">{added}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
