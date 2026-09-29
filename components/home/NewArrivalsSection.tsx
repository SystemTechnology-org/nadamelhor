"use client";

import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { ArrowRight } from "lucide-react";

export const NewArrivalsSection: React.FC = () => {
  // Take 4 featured/new products
  const newArrivals = PRODUCTS.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#0C1014] border-t border-[#1C242B]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 pb-4 border-b border-[#1C242B]">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-text-muted">
              LATEST RELEASES • EDICÃO LIMITADA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.2em] uppercase text-text-primary">
              NEW ARRIVALS
            </h2>
          </div>

          <Link
            href="/shop"
            className="group mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors py-1"
          >
            <span>VER TODOS OS PRODUTOS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 columns on desktop, 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
