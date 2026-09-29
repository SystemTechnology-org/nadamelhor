import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { getDropProducts, PRODUCTS } from "@/lib/products";
import { ArrowDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Coleções | DROP 01 & Essentials",
  description:
    "Conheça as coleções da NADA MELHOR. DROP 01: peças limitadas com cortes autorais, sarja pesada e estética cinematográfica.",
};

export default function ColecoesPage() {
  const dropProducts = getDropProducts();
  const essentials = PRODUCTS.filter((p) => p.drop === "ESSENTIALS");

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-[#0C1014] text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-text-muted">
            EDITORIAL LOOKBOOK • CAMPANHAS
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-text-primary mt-1">
            COLEÇÕES
          </h1>
        </div>

        {/* DROP 01 HERO CAMPAIGN */}
        <div id="drop-01" className="relative mb-20 sm:mb-28 group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#121610]">
            <Image
              src="/images/drop-campaign.jpg"
              alt="Coleção DROP 01 Campanha NADA MELHOR"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014] via-[#0C1014]/50 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-end">
              <span className="text-xs tracking-[0.3em] uppercase text-brand-blueMuted font-mono">
                CAMPANHA PRINCIPAL
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-text-primary mt-2">
                DROP 01 • MATÉRIA & SILÊNCIO
              </h2>
              <p className="text-xs sm:text-sm tracking-[0.14em] uppercase text-text-secondary max-w-xl mt-3 leading-relaxed">
                Desenvolvido a partir de malhas de densidade extrema, modelagens
                amplas e tingimentos terrosos com acabamento artesanal. A
                expressão autêntica da vivência entre o asfalto e a natureza.
              </p>
            </div>
          </div>
        </div>

        {/* DROP 01 PRODUCTS GRID */}
        <div className="mb-24">
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#1C242B]">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">
                SELEÇÃO DE PEÇAS
              </span>
              <h3 className="text-xl sm:text-2xl font-light tracking-[0.18em] uppercase text-text-primary">
                PRODUTOS DROP 01
              </h3>
            </div>
            <span className="text-xs tracking-widest uppercase text-text-muted">
              {dropProducts.length} ITENS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {dropProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* ESSENTIALS LINE */}
        {essentials.length > 0 && (
          <div className="pt-16 border-t border-[#1C242B]">
            <div className="pb-4 mb-8 border-b border-[#1C242B]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">
                LINHA PERMANENTE
              </span>
              <h3 className="text-xl sm:text-2xl font-light tracking-[0.18em] uppercase text-text-primary">
                ESSENTIALS
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {essentials.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
