"use client";

import { ChevronRight, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import {
  discountPct,
  findProduct,
  money,
  priceTiers,
  PRODUCTS,
  sku,
} from "../products";
import { ProductCard, Stars, Tag, useCart } from "../store";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = findProduct(Number(params.id));
  const { addToCart, setCartOpen } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <section className="mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-col items-center gap-4 py-32 text-center">
        <h1 className="font-bold text-2xl text-[#242527]">Product not found</h1>
        <p className="text-neutral-500 text-sm">
          The item you are looking for is no longer available.
        </p>
        <Link href="/ecommerce" className="inline-flex h-11 items-center rounded-full bg-[#EE1C4D] px-6 font-medium text-sm text-white transition-colors hover:bg-[#d2123f]">
          Back to store
        </Link>
      </section>
    );
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);
  const tiers = priceTiers(product.price);

  const buy = () => {
    addToCart(product, qty);
    setCartOpen(true);
  };

  return (
    <>
      <section className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-8 pb-16">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-neutral-400 text-sm">
          <Link href="/ecommerce" className="transition-colors hover:text-[#242527]">Store</Link>
          <ChevronRight className="size-3.5" />
          <span>{product.category}</span>
          <ChevronRight className="size-3.5" />
          <span className="text-[#242527]">{product.title}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[28px] border border-neutral-200">
              <img src={product.image} alt={product.title} className="aspect-square w-full object-cover" />
              {product.badge && (
                <span className="absolute top-4 left-4 rounded-full bg-[#EE1C4D] px-3 py-1 font-semibold text-white text-xs uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-neutral-400 text-xs uppercase tracking-wider">{product.category}</span>
            <h1 className="mt-1.5 font-bold text-3xl text-[#242527] leading-tight tracking-tight sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <Stars value={product.rating} />
              <span className="text-neutral-500 text-sm">
                {product.rating} · {product.reviews.toLocaleString()} reviews
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="font-bold text-3xl text-[#242527]">{money(product.price)}</span>
              {product.listPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">{money(product.listPrice)}</span>
                  <span className="rounded-full bg-[#d3eee0] px-2.5 py-1 font-semibold text-[#2f8f59] text-xs">
                    Save {discountPct(product)}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-neutral-500 text-base leading-relaxed">{product.blurb}</p>

            {/* Trade / volume pricing */}
            <div className="mt-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-semibold text-[11px] text-neutral-400 uppercase tracking-wider">Trade pricing</span>
                <span className="h-px flex-1 bg-neutral-200" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {tiers.map((t, i) => (
                  <div
                    key={t.qty}
                    className={`rounded-xl border px-2 py-2.5 text-center ${i === 0 ? "border-[#EE1C4D] bg-[#EE1C4D]/5" : "border-neutral-200 bg-white"}`}
                  >
                    <div className="text-[11px] text-neutral-500">{t.qty}</div>
                    <div className="font-bold text-[#242527] text-sm tabular-nums">{money(t.price)}</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-neutral-400 text-xs">
                Volume tiers apply automatically for trade accounts at checkout.
              </p>
            </div>

            {/* Quantity + add to cart */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-neutral-200">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex size-11 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"><Minus className="size-4" /></button>
                <span className="w-10 text-center font-medium text-[#242527] tabular-nums">{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="flex size-11 items-center justify-center rounded-full text-[#242527] transition-colors hover:bg-neutral-100"><Plus className="size-4" /></button>
              </div>
              <button type="button" onClick={buy} className="h-12 flex-1 rounded-full bg-[#EE1C4D] px-6 font-medium text-sm text-white transition-colors hover:bg-[#d2123f]">
                Add to cart, {money(product.price * qty)}
              </button>
            </div>

            {/* Compact delivery line */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-neutral-200 border-t pt-5 text-neutral-600 text-sm">
              <span className="flex items-center gap-2"><Truck className="size-4 text-[#EE1C4D]" strokeWidth={1.75} /> Free 2-day GRS Prime delivery</span>
              <span className="flex items-center gap-2"><RotateCcw className="size-4 text-[#EE1C4D]" strokeWidth={1.75} /> 30-day free returns</span>
            </div>

            {/* Spec sheet */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="flex items-center justify-between bg-[#242527] px-4 py-2.5">
                <span className="font-semibold text-[11px] text-white uppercase tracking-[0.2em]">Spec sheet</span>
                <span className="font-mono text-white/70 text-xs">{sku(product.id)}</span>
              </div>
              <div className="flex flex-col gap-3 p-4">
                {product.specs.map(([label, value]) => (
                  <div key={label} className="flex items-baseline text-sm">
                    <span className="shrink-0 text-neutral-500">{label}</span>
                    <span className="mx-2 mb-1 flex-1 border-neutral-300 border-b border-dotted" />
                    <span className="shrink-0 font-medium text-[#242527] tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] pb-20">
          <Reveal>
            <Tag label="You might also like" />
            <h2 className="mt-3 font-bold text-2xl text-[#242527] tracking-tight sm:text-3xl">
              More in {product.category}
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.05} blur={false}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
