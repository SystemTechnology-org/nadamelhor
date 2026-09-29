"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/lib/ui-context";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Search, X, ArrowUpRight } from "lucide-react";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar na Nada Melhor"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0C1014]/90 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0C1014] border border-[#1C242B] p-6 sm:p-8 z-10 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between pb-4 border-b border-[#1C242B]">
          <div className="flex items-center flex-1 space-x-3">
            <Search className="w-5 h-5 text-text-secondary stroke-[1.5]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="DIGITE O QUE PROCURA..."
              className="w-full bg-transparent text-sm sm:text-base tracking-[0.15em] uppercase text-text-primary placeholder:text-text-muted focus:outline-none"
            />
          </div>
          <button
            onClick={closeSearch}
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
            aria-label="Fechar busca"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Popular searches suggestions if empty */}
        {query.trim().length === 0 && (
          <div className="mt-6">
            <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted">
              TERMOS POPULARES
            </span>
            <div className="flex flex-wrap gap-2 mt-3">
              {["Camisetas", "Moletons", "Drop 01", "Calças", "Heavyweight"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs tracking-[0.15em] uppercase px-3 py-1.5 border border-[#1C242B] text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim().length > 0 && (
          <div className="mt-6 max-h-[60vh] overflow-y-auto divide-y divide-[#1C242B]">
            {filteredProducts.length === 0 ? (
              <p className="text-xs tracking-[0.15em] uppercase text-text-muted py-8 text-center">
                Nenhum produto encontrado para &quot;{query}&quot;
              </p>
            ) : (
              filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={closeSearch}
                  className="group flex items-center justify-between py-3 hover:bg-[#121610] px-2 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-16 bg-[#121610] overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs tracking-[0.18em] uppercase font-medium text-text-primary group-hover:text-white">
                        {product.name}
                      </h4>
                      <p className="text-[11px] tracking-[0.12em] uppercase text-text-secondary mt-0.5">
                        {product.collection} • {product.category}
                      </p>
                      <span className="text-xs text-text-primary font-mono mt-1 inline-block">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
