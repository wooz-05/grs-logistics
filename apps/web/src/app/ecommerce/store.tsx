"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Star, X } from "lucide-react";
import Link from "next/link";
import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { Logo } from "@/components/logo";
import { discountPct, money, PRODUCTS, type Product } from "./products";

// ----- Cart context -----

type CartContextValue = {
  items: { product: Product; qty: number }[];
  count: number;
  subtotal: number;
  addToCart: (product: Product, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2400);
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

  const items = Object.entries(cart)
    .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((x): x is { product: Product; qty: number } => Boolean(x.product));
  const count = items.reduce((s, { qty }) => s + qty, 0);
  const subtotal = items.reduce((s, { product, qty }) => s + product.price * qty, 0);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, addToCart, setQty, cartOpen, setCartOpen, toast, showToast }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ----- Brand atoms -----

export const GrsArrow = ({ light = false }: { light?: boolean }) => (
  <svg width="13" height="11" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M29.8893 24.855L29.8893 0L4.84439 -1.09475e-06L29.8893 24.855Z" fill={light ? "#fff" : "#EE1C4D"} />
    <path d="M0 16.0262H4.05505C6.93862 16.0262 9.70057 14.8643 11.7172 12.8031L13.075 11.4152L19.434 17.6366L18.0761 19.0243C14.386 22.7961 9.33175 24.9222 4.05505 24.9222H0V16.0262Z" fill={light ? "#fff" : "#EE1C4D"} />
  </svg>
);

export const Tag = ({ label, light = false }: { label: string; light?: boolean }) => (
  <span className={`inline-flex items-center gap-1.5 font-medium text-sm ${light ? "text-white/70" : "text-neutral-500"}`}>
    <GrsArrow light={light} />
    {label}
  </span>
);

export const SectionLabel = ({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  light?: boolean;
}) => (
  <div>
    <div className="flex items-center gap-2">
      <GrsArrow />
      <span className="font-semibold text-[#EE1C4D] text-xs uppercase tracking-[0.22em]">
        {eyebrow}
      </span>
    </div>
    <h2 className={`mt-4 font-bold text-3xl tracking-tight sm:text-4xl ${light ? "text-white" : "text-[#242527]"}`}>
      {title}
    </h2>
  </div>
);

export const Stars = ({ value }: { value: number }) => (
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

const TICKER_ITEMS = [
  "Free 2-day delivery",
  "Trade pricing for business",
  "30-day free returns",
  "12,000+ SKUs in stock",
  "Rated 4.8 / 5 by shippers",
];

export const Ticker = () => {
  const row = (
    <div className="flex shrink-0 items-center">
      {TICKER_ITEMS.map((t) => (
        <span key={t} className="flex items-center gap-4 px-5">
          <span className="whitespace-nowrap font-medium text-sm text-white/90 uppercase tracking-wide">
            {t}
          </span>
          <GrsArrow />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden bg-[#242527] py-3">
      <div className="flex w-max animate-arrow-marquee">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
};

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  return (
    <Link
      href={`/ecommerce/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors hover:border-[#EE1C4D]"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-[#EE1C4D] px-2.5 py-1 font-semibold text-[10px] text-white uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        {product.listPrice && (
          <span className="absolute top-3 right-3 rounded-full bg-white px-2 py-1 font-bold text-[#2f8f59] text-[10px]">
            -{discountPct(product)}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="font-medium text-[11px] text-neutral-400 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="mt-1 line-clamp-2 font-semibold text-[#242527] text-sm leading-snug transition-colors group-hover:text-[#EE1C4D]">
          {product.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars value={product.rating} />
          <span className="text-neutral-400 text-xs">{product.reviews.toLocaleString()}</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-[#242527] text-lg">{money(product.price)}</span>
            {product.listPrice && (
              <span className="text-neutral-400 text-xs line-through">{money(product.listPrice)}</span>
            )}
          </div>
          <button
            type="button"
            aria-label={`Add ${product.title} to cart`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EE1C4D] text-white transition-transform hover:scale-110 active:scale-95"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

// ----- Store chrome -----

export const StoreHeader = () => {
  const { count, setCartOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 border-neutral-200 border-b bg-white">
      <div className="mx-auto flex w-[min(1180px,calc(100%-2rem))] items-center gap-6 py-4">
        <Link href="/ecommerce" aria-label="GRS Logistics home" className="shrink-0">
          <Logo className="h-7 w-auto text-[#242527]" />
        </Link>
        <Link href="/" className="ml-auto flex items-center gap-1.5 whitespace-nowrap font-medium text-neutral-500 text-sm transition-colors hover:text-[#242527]">
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">Back to site</span>
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
  );
};

export const StoreOverlays = () => {
  const { items, count, subtotal, setQty, cartOpen, setCartOpen, toast, showToast } = useCart();
  return (
    <>
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-50 bg-black/40" />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 z-50 flex h-full w-[min(420px,100%)] flex-col border-neutral-200 border-l bg-white"
            >
              <div className="flex items-center justify-between border-neutral-100 border-b p-5">
                <h2 className="font-bold text-[#242527] text-lg">Your cart ({count})</h2>
                <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className="flex size-9 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"><X className="size-5" /></button>
              </div>
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                  <ShoppingCart className="size-10 text-neutral-300" />
                  <p className="text-neutral-500 text-sm">Your cart is empty.</p>
                  <button type="button" onClick={() => setCartOpen(false)} className="mt-1 font-medium text-[#EE1C4D] text-sm hover:text-[#d2123f]">Continue shopping</button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="flex flex-col gap-4">
                    {items.map(({ product, qty }) => (
                      <div key={product.id} className="flex gap-3">
                        <img src={product.image} alt={product.title} className="size-16 shrink-0 rounded-xl object-cover" />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="line-clamp-2 font-medium text-[#242527] text-sm leading-snug">{product.title}</p>
                          <p className="mt-0.5 font-bold text-[#242527] text-sm">{money(product.price)}</p>
                          <div className="mt-auto flex items-center gap-2 pt-1">
                            <div className="flex items-center rounded-full border border-neutral-200">
                              <button type="button" aria-label="Decrease quantity" onClick={() => setQty(product.id, qty - 1)} className="flex size-7 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"><Minus className="size-3.5" /></button>
                              <span className="w-6 text-center text-[#242527] text-xs">{qty}</span>
                              <button type="button" aria-label="Increase quantity" onClick={() => setQty(product.id, qty + 1)} className="flex size-7 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"><Plus className="size-3.5" /></button>
                            </div>
                            <button type="button" onClick={() => setQty(product.id, 0)} className="ml-auto text-neutral-400 text-xs transition-colors hover:text-[#EE1C4D]">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {items.length > 0 && (
                <div className="border-neutral-100 border-t p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-neutral-500 text-sm">Subtotal</span>
                    <span className="font-bold text-[#242527] text-xl">{money(subtotal)}</span>
                  </div>
                  <button type="button" onClick={() => { setCartOpen(false); showToast("Checkout is under development"); }} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#EE1C4D] font-medium text-sm text-white transition-colors hover:bg-[#d2123f]">
                    <Check className="size-5" />
                    Checkout
                  </button>
                  <p className="mt-3 text-center text-neutral-400 text-xs">Free GRS Prime delivery on this order</p>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="-translate-x-1/2 fixed bottom-6 left-1/2 z-[60] flex max-w-[90vw] items-center gap-3 rounded-full border border-neutral-200 bg-white py-3 pr-5 pl-4"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d3eee0] text-[#2f8f59]"><Check className="size-4" /></span>
            <span className="truncate font-medium text-[#242527] text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
