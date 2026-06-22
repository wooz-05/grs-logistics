import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { CartProvider, StoreHeader, StoreOverlays } from "./store";

export default function EcommerceLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <StoreHeader />
        {children}
        <Footer />
      </div>
      <StoreOverlays />
    </CartProvider>
  );
}
