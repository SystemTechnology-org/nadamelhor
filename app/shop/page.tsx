import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop | Catálogo Completo",
  description:
    "Explore todas as peças de vestuário streetwear contemporâneo NADA MELHOR. Camisetas, moletons, calças e acessórios de alta gramatura.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-36 pb-24 text-center text-xs tracking-widest uppercase text-text-muted">
          CARREGANDO CATÁLOGO...
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
