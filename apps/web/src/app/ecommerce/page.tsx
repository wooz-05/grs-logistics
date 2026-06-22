"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  listPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  blurb: string;
  badge?: string;
};

const CATEGORIES = [
  "Boxes & Mailers",
  "Tape & Wrap",
  "Pallets & Handling",
  "Storage & Handling",
  "Labels & Printing",
];

const PRODUCTS: Product[] = [
  { id: 1, title: "Corrugated Shipping Boxes, 25 Pack", category: "Boxes & Mailers", price: 24.99, listPrice: 32.99, rating: 4.7, reviews: 1432, image: "/shop/boxes.jpg", badge: "Best Seller", blurb: "Double-wall corrugated boxes built to take a beating in transit. Flat-packed and ready to assemble in seconds." },
  { id: 2, title: "Fragile-Safe Moving Boxes, 10 Pack", category: "Boxes & Mailers", price: 18.49, listPrice: 23.0, rating: 4.6, reviews: 980, image: "/shop/moving.jpg", blurb: "Reinforced corners and clear fragile marking keep delicate cargo protected from dock to doorstep." },
  { id: 3, title: "Pro Tape Gun & Packing Tape, 6 Pack", category: "Tape & Wrap", price: 21.99, listPrice: 27.99, rating: 4.8, reviews: 2103, image: "/shop/tapegun.jpg", badge: "Best Seller", blurb: "Industrial dispenser with a steel blade and six rolls of heavy-duty tape. Seal a hundred boxes without a refill." },
  { id: 4, title: "Box Sealing Tape Kit", category: "Tape & Wrap", price: 12.99, listPrice: 16.99, rating: 4.5, reviews: 760, image: "/shop/sealing.jpg", blurb: "Quiet-release acrylic tape that holds in heat, cold, and humidity. Crystal clear and residue free." },
  { id: 5, title: "Standard Wooden Pallets, 48 x 40", category: "Pallets & Handling", price: 14.0, rating: 4.3, reviews: 210, image: "/shop/pallets.jpg", blurb: "Kiln-dried four-way entry pallets rated for 2,500 lb. Compatible with every forklift and jack in your fleet." },
  { id: 6, title: "Barcoded Export Pallets, 5 Pack", category: "Pallets & Handling", price: 89.0, listPrice: 109.0, rating: 4.7, reviews: 88, image: "/shop/barcoded.jpg", badge: "GRS Prime", blurb: "ISPM-15 certified and pre-barcoded for instant scan-in at any GRS hub. Built for international freight." },
  { id: 7, title: "Heavy-Duty Pallet Racking", category: "Storage & Handling", price: 279.0, listPrice: 329.0, rating: 4.7, reviews: 142, image: "/shop/shelving.jpg", badge: "Best Seller", blurb: "Bolt-together steel racking with a powder-coat finish. Each beam level holds a full loaded pallet." },
  { id: 8, title: "Pre-Printed Shipping Labels, 1000", category: "Labels & Printing", price: 16.99, rating: 4.8, reviews: 1290, image: "/shop/labels.jpg", blurb: "Smudge-proof thermal labels with a permanent adhesive that sticks to cardboard, poly, and shrink wrap." },
  { id: 9, title: "Last-Mile Delivery Totes, 12 Pack", category: "Storage & Handling", price: 39.99, listPrice: 49.0, rating: 4.5, reviews: 318, image: "/shop/lastmile.jpg", blurb: "Stackable, nestable totes that keep parcels sorted on the van and snap shut for secure last-mile runs." },
];

const money = (n: number) => `$${n.toFixed(2)}`;

const GrsArrow = ({ light = false }: { light?: boolean }) => (
  <svg width="14" height="12" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" fill={light ? "#fff" : "#EE1C4D"} />
    <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" fill={light ? "#fff" : "#EE1C4D"} />
  </svg>
);

const Stars = ({ value }: { value: number }) => (
  <span className="flex items-center gap-px">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length star row
        key={i}
        className="size-3.5"
        strokeWidth={1.5}
        style={{ color: "#deb23c", fill: i < Math.round(value) ? "#deb23c" : "transparent" }}
      />
    ))}
  </span>
);

const ProductCard = ({
  product,
  onOpen,
  onAdd,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
}) => (
  <article className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-shadow hover:shadow-md">
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="flex flex-1 flex-col text-left"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-[#EE1C4D] px-2.5 py-1 font-semibold text-[11px] text-white uppercase tracking-wide">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pt-5">
        <span className="text-neutral-400 text-xs">{product.category}</span>
        <h3 className="mt-1 font-bold text-[#242527] text-lg leading-snug">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5">
          <Stars value={product.rating} />
          <span className="text-neutral-400 text-xs">
            {product.reviews.toLocaleString()}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-bold text-[#242527] text-xl">
            {money(product.price)}
          </span>
          {product.listPrice && (
            <span className="text-neutral-400 text-sm line-through">
              {money(product.listPrice)}
            </span>
          )}
        </div>
      </div>
    </button>
    <div className="px-5 pt-4 pb-5">
      <button
        type="button"
        onClick={() => onAdd(product)}
        className="h-11 w-full rounded-full bg-[#EE1C4D] font-medium text-sm text-white transition-colors hover:bg-[#d2123f]"
      >
        Add to cart
      </button>
    </div>
  </article>
);

const ProductModal = ({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (p: Product, qty: number) => void;
}) => {
  const [qty, setQty] = useState(1);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white sm:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#242527] shadow-sm transition-colors hover:bg-white"
        >
          <X className="size-5" />
        </button>
        <div className="aspect-[4/3] sm:aspect-auto">
          <img
            src={product.image}
            alt={product.title}
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
          <span className="text-neutral-400 text-xs">{product.category}</span>
          <h2 className="mt-1 font-bold text-2xl text-[#242527] leading-tight tracking-tight">
            {product.title}
          </h2>
          <div className="mt-2 flex items-center gap-1.5">
            <Stars value={product.rating} />
            <span className="text-neutral-400 text-xs">
              {product.rating} · {product.reviews.toLocaleString()} reviews
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-bold text-3xl text-[#242527]">
              {money(product.price)}
            </span>
            {product.listPrice && (
              <span className="text-neutral-400 text-sm line-through">
                {money(product.listPrice)}
              </span>
            )}
          </div>
          <p className="mt-4 text-neutral-500 text-sm leading-relaxed">
            {product.blurb}
          </p>

          <ul className="mt-5 flex flex-col gap-2.5 text-neutral-600 text-sm">
            <li className="flex items-center gap-2.5">
              <Truck className="size-4 text-[#EE1C4D]" /> Free GRS Prime 2-day
              delivery
            </li>
            <li className="flex items-center gap-2.5">
              <RotateCcw className="size-4 text-[#EE1C4D]" /> 30-day free returns
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-[#EE1C4D]" /> Trade-account
              pricing available
            </li>
          </ul>

          <div className="mt-auto flex items-center gap-3 pt-6">
            <div className="flex items-center rounded-full border border-neutral-200">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex size-10 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-medium text-[#242527] text-sm">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="flex size-10 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                onAdd(product, qty);
                onClose();
              }}
              className="h-11 flex-1 rounded-full bg-[#EE1C4D] font-medium text-sm text-white transition-colors hover:bg-[#d2123f]"
            >
              Add to cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function EcommercePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setAdded(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(null), 2400);
  };

  const addToCart = (product: Product, qty = 1) => {
    setCart((c) => ({ ...c, [product.id]: (c[product.id] ?? 0) + qty }));
    showToast(`${product.title} added to cart`);
  };

  const setQty = (id: number, qty: number) =>
    setCart((c) => {
      if (qty <= 0) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: qty };
    });

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({
      product: PRODUCTS.find((p) => p.id === Number(id)),
      qty,
    }))
    .filter((x): x is { product: Product; qty: number } => Boolean(x.product));
  const count = cartItems.reduce((s, { qty }) => s + qty, 0);
  const subtotal = cartItems.reduce(
    (s, { product, qty }) => s + product.price * qty,
    0,
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (term === "" ||
          `${p.title} ${p.category}`.toLowerCase().includes(term)),
    );
  }, [query, category]);

  return (
    <div className="min-h-screen bg-white">
      {/* Clean GRS store header */}
      <header className="sticky top-0 z-40 border-neutral-100 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-[min(1180px,calc(100%-2rem))] items-center gap-4 py-3">
          <Link href="/" aria-label="GRS Logistics home" className="shrink-0">
            <Logo className="h-7 w-auto text-[#242527]" />
          </Link>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 transition-colors focus-within:border-[#EE1C4D] sm:flex"
          >
            <Search className="size-4 shrink-0 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the GRS store"
              className="min-w-0 flex-1 bg-transparent text-[#242527] text-sm outline-none placeholder:text-neutral-400"
            />
          </form>
          <Link
            href="/"
            className="hidden whitespace-nowrap font-medium text-neutral-500 text-sm transition-colors hover:text-[#242527] md:block"
          >
            Back to site
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[#242527] transition-colors hover:bg-neutral-200"
          >
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span className="-right-1 -top-1 absolute flex min-w-5 items-center justify-center rounded-full bg-[#EE1C4D] px-1 font-bold text-[11px] text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Floating hero panel */}
      <section className="bg-white p-3 sm:p-4">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[#242527]">
          <img
            src="/shop/shelving.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#242527] via-[#242527]/85 to-[#242527]/30" />
          <div className="relative z-10 mx-auto w-[min(1180px,calc(100%-3rem))] py-16 sm:py-24">
            <span className="inline-flex items-center gap-1.5 font-medium text-sm text-white/70">
              <GrsArrow light />
              GRS Supply Store
            </span>
            <h1 className="mt-4 max-w-xl text-balance font-bold text-4xl text-white leading-[1.1] tracking-tight sm:text-5xl">
              Everything to pack, ship, and move.
            </h1>
            <p className="mt-4 max-w-md text-base text-white/70 leading-relaxed">
              Warehouse-grade supplies at trade prices, delivered fast. Stock up
              on boxes, tape, pallets, and racking built for real logistics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex h-11 items-center rounded-full bg-[#EE1C4D] px-6 font-medium text-sm text-white transition-colors hover:bg-[#d2123f]"
              >
                Shop products
              </a>
              <a
                href="#shop"
                className="inline-flex h-11 items-center rounded-full border border-white/40 px-6 font-medium text-sm text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#242527]"
              >
                Browse categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section
        id="shop"
        className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-14"
      >
        <span className="inline-flex items-center gap-1.5 font-medium text-neutral-500 text-sm">
          <GrsArrow />
          Shop by category
        </span>
        <h2 className="mt-3 font-bold text-3xl text-[#242527] leading-[1.1] tracking-tight sm:text-4xl">
          Built for the way you ship
        </h2>
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
      </section>

      {/* Product grid */}
      <section
        id="products"
        className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-8 pb-20"
      >
        <div className="mb-6 flex items-baseline justify-between">
          <p className="text-neutral-500 text-sm">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
            {category !== "All" ? ` in ${category}` : ""}
          </p>
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-3xl border border-neutral-200 border-dashed bg-neutral-50 py-20 text-center text-neutral-500 text-sm">
            No products match "{query}". Try a different search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onOpen={setSelected}
                  onAdd={(p) => addToCart(p)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* Product detail modal */}
      <AnimatePresence>
        {selected && (
          <ProductModal
            key={selected.id}
            product={selected}
            onClose={() => setSelected(null)}
            onAdd={addToCart}
          />
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/40"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 z-50 flex h-full w-[min(420px,100%)] flex-col bg-white"
            >
              <div className="flex items-center justify-between border-neutral-100 border-b p-5">
                <h2 className="font-bold text-[#242527] text-lg">
                  Your cart ({count})
                </h2>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="flex size-9 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"
                >
                  <X className="size-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                  <ShoppingCart className="size-10 text-neutral-300" />
                  <p className="text-neutral-500 text-sm">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="flex flex-col gap-4">
                    {cartItems.map(({ product, qty }) => (
                      <div key={product.id} className="flex gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="size-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="line-clamp-2 font-medium text-[#242527] text-sm leading-snug">
                            {product.title}
                          </p>
                          <p className="mt-0.5 font-bold text-[#242527] text-sm">
                            {money(product.price)}
                          </p>
                          <div className="mt-auto flex items-center gap-2 pt-1">
                            <div className="flex items-center rounded-full border border-neutral-200">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => setQty(product.id, qty - 1)}
                                className="flex size-7 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="w-6 text-center text-[#242527] text-xs">
                                {qty}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => setQty(product.id, qty + 1)}
                                className="flex size-7 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => setQty(product.id, 0)}
                              className="ml-auto text-neutral-400 text-xs transition-colors hover:text-[#EE1C4D]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cartItems.length > 0 && (
                <div className="border-neutral-100 border-t p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-neutral-500 text-sm">Subtotal</span>
                    <span className="font-bold text-[#242527] text-xl">
                      {money(subtotal)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCartOpen(false);
                      showToast("Checkout is under development");
                    }}
                    className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#EE1C4D] font-medium text-sm text-white transition-colors hover:bg-[#d2123f]"
                  >
                    <Check className="size-5" />
                    Checkout
                  </button>
                  <p className="mt-3 text-center text-neutral-400 text-xs">
                    Free GRS Prime delivery on this order
                  </p>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Added-to-cart toast */}
      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="-translate-x-1/2 fixed bottom-6 left-1/2 z-[60] flex max-w-[90vw] items-center gap-3 rounded-full border border-neutral-100 bg-white py-3 pr-5 pl-4 shadow-xl shadow-black/10"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d3eee0] text-[#2f8f59]">
              <Check className="size-4" />
            </span>
            <span className="truncate font-medium text-[#242527] text-sm">
              {added}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
