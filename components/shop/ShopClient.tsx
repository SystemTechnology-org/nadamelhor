"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { ProductCategory, ProductSize } from "@/types";
import { SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";

const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: "TODOS", value: "todos" },
  { label: "CAMISETAS", value: "camisetas" },
  { label: "MOLETONS", value: "moletons" },
  { label: "CALÇAS", value: "calcas" },
  { label: "ACESSÓRIOS", value: "acessorios" },
];

const SIZES: ProductSize[] = ["P", "M", "G", "GG"];

const COLORS = [
  { label: "Todas", value: "todas" },
  { label: "Grafite / Preto", value: "grafite" },
  { label: "Terra Escuro", value: "terra" },
  { label: "Verde Ardósia", value: "verde" },
];

const SORT_OPTIONS = [
  { label: "MAIS RECENTES", value: "newest" },
  { label: "MENOR PREÇO", value: "price-asc" },
  { label: "MAIOR PREÇO", value: "price-desc" },
];

export const ShopClient: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as ProductCategory) || "todos";

  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>("todos");
  const [selectedColor, setSelectedColor] = useState<string>("todas");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync category if query param changes
  useEffect(() => {
    const cat = searchParams.get("category") as ProductCategory;
    if (cat && ["camisetas", "moletons", "calcas", "acessorios"].includes(cat)) {
      setActiveCategory(cat);
    } else {
      setActiveCategory("todos");
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== "todos" && product.category !== activeCategory) {
        return false;
      }

      // Size filter
      if (selectedSize !== "todos") {
        if (!product.availableSizes.includes(selectedSize as ProductSize)) {
          return false;
        }
      }

      // Color filter
      if (selectedColor !== "todas") {
        const matchesColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor)
        );
        if (!matchesColor) return false;
      }

      // Price filter
      if (selectedPriceRange === "under-200" && product.price >= 200) {
        return false;
      }
      if (
        selectedPriceRange === "200-350" &&
        (product.price < 200 || product.price > 350)
      ) {
        return false;
      }
      if (selectedPriceRange === "above-350" && product.price <= 350) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0; // default newest
    });
  }, [activeCategory, selectedSize, selectedColor, selectedPriceRange, sortBy]);

  const hasActiveFilters =
    selectedSize !== "todos" ||
    selectedColor !== "todas" ||
    selectedPriceRange !== "todos";

  const clearAllFilters = () => {
    setSelectedSize("todos");
    setSelectedColor("todas");
    setSelectedPriceRange("todos");
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0C1014] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-text-muted">
            COLEÇÃO COMPLETA • CATÁLOGO
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.2em] uppercase text-text-primary mt-1">
            SHOP
          </h1>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-3 sm:space-x-8 overflow-x-auto pb-4 no-scrollbar border-b border-[#1C242B]">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-xs sm:text-sm tracking-[0.2em] uppercase font-medium whitespace-nowrap py-1 transition-colors relative ${
                  isActive
                    ? "text-text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filters and Sorting Subbar */}
        <div className="py-4 sm:py-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1C242B]/60 text-xs">
          <div className="flex items-center space-x-4">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="inline-flex items-center space-x-2 px-3 py-1.5 border border-[#1C242B] text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors tracking-[0.15em] uppercase font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTROS</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blueMuted" />
              )}
            </button>

            {/* Clear filters pill */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center space-x-1 text-[11px] tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-3 h-3" />
                <span>LIMPAR FILTROS</span>
              </button>
            )}

            <span className="text-[11px] tracking-[0.15em] uppercase text-text-muted hidden sm:inline">
              {filteredProducts.length} {filteredProducts.length === 1 ? "peça" : "peças"}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] tracking-[0.15em] uppercase text-text-muted hidden sm:inline">
              ORDENAR:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#121610] border border-[#1C242B] text-text-primary px-3 py-1.5 text-xs tracking-[0.15em] uppercase focus:outline-none focus:border-text-primary cursor-pointer pr-8"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Filter Bar */}
        {isFilterDrawerOpen && (
          <div className="p-6 bg-[#121610] border-b border-[#1C242B] grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
            {/* Size Filter */}
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted font-semibold block mb-3">
                TAMANHO
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSize("todos")}
                  className={`px-3 py-1 text-xs font-mono border transition-colors ${
                    selectedSize === "todos"
                      ? "border-text-primary bg-text-primary text-background font-bold"
                      : "border-[#1C242B] text-text-secondary hover:border-text-primary"
                  }`}
                >
                  TODOS
                </button>
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-xs font-mono border transition-colors ${
                      selectedSize === size
                        ? "border-text-primary bg-text-primary text-background font-bold"
                        : "border-[#1C242B] text-text-secondary hover:border-text-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted font-semibold block mb-3">
                COR
              </span>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => setSelectedColor(col.value)}
                    className={`px-3 py-1 text-xs tracking-wider uppercase border transition-colors ${
                      selectedColor === col.value
                        ? "border-text-primary bg-text-primary text-background font-medium"
                        : "border-[#1C242B] text-text-secondary hover:border-text-primary"
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted font-semibold block mb-3">
                FAIXA DE PREÇO
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "TODOS", value: "todos" },
                  { label: "ATÉ R$ 200", value: "under-200" },
                  { label: "R$ 200 - R$ 350", value: "200-350" },
                  { label: "ACIMA DE R$ 350", value: "above-350" },
                ].map((pr) => (
                  <button
                    key={pr.value}
                    onClick={() => setSelectedPriceRange(pr.value)}
                    className={`px-3 py-1 text-xs tracking-wider uppercase border transition-colors ${
                      selectedPriceRange === pr.value
                        ? "border-text-primary bg-text-primary text-background font-medium"
                        : "border-[#1C242B] text-text-secondary hover:border-text-primary"
                    }`}
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-sm tracking-[0.2em] uppercase text-text-secondary">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-block px-6 py-2.5 border border-text-primary text-xs tracking-[0.2em] uppercase text-text-primary hover:bg-text-primary hover:text-background transition-colors"
              >
                REDEFINIR FILTROS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
