"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { addItem } = useCart();

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize);
    setShowQuickAdd(false);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Product Image Container */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#121610] block focus:outline-none focus:ring-1 focus:ring-text-primary/50"
      >
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-opacity duration-700 ease-out ${
            isHovered && product.images.length > 1
              ? "opacity-0"
              : "opacity-100 group-hover:scale-[1.02] transition-transform duration-700"
          }`}
        />

        {/* Secondary Image on Hover */}
        {product.images.length > 1 && (
          <Image
            src={secondaryImage}
            alt={`${product.name} - Vista alternativa`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered
                ? "opacity-100 scale-[1.02]"
                : "opacity-0 scale-100 pointer-events-none"
            }`}
          />
        )}

        {/* Minimal Tags / Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-[#0C1014]/90 backdrop-blur-sm text-text-primary px-2 py-0.5 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium">
              NOVO
            </span>
          )}
          {product.drop && (
            <span className="bg-brand-graphite/80 text-text-secondary px-2 py-0.5 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase">
              {product.drop}
            </span>
          )}
        </div>

        {/* Quick Add Overlay on Desktop Hover */}
        <div
          className={`hidden sm:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0C1014]/95 via-[#0C1014]/70 to-transparent flex-col space-y-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {showQuickAdd ? (
            <div
              className="bg-[#121610] p-2 border border-[#1C242B] space-y-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center text-[10px] tracking-widest text-text-secondary uppercase">
                <span>SELECIONE O TAMANHO</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {product.sizes.map((size) => {
                  const isAvailable = product.availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`py-1 text-[11px] font-mono border transition-colors ${
                        selectedSize === size
                          ? "border-text-primary bg-text-primary text-background font-bold"
                          : isAvailable
                          ? "border-[#1C242B] text-text-primary hover:border-text-primary"
                          : "border-[#1C242B]/40 text-text-muted/40 cursor-not-allowed line-through"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={handleQuickAdd}
                className="w-full py-1.5 bg-text-primary text-background text-[10px] tracking-[0.2em] font-semibold uppercase hover:bg-white transition-colors"
              >
                CONFIRMAR ({selectedSize})
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickAdd(true);
              }}
              className="w-full py-2 bg-[#0C1014]/90 border border-[#2B353E] hover:border-text-primary text-text-primary text-[10px] tracking-[0.2em] uppercase font-semibold backdrop-blur-sm transition-all"
            >
              + ADICIONAR RÁPIDO
            </button>
          )}
        </div>
      </Link>

      {/* Product Details Info */}
      <div className="mt-3.5 space-y-1">
        <div className="flex items-baseline justify-between">
          <Link
            href={`/shop/${product.slug}`}
            className="text-xs sm:text-sm tracking-[0.16em] uppercase font-medium text-text-primary hover:text-text-secondary transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        <p className="text-[11px] tracking-[0.12em] uppercase text-text-muted line-clamp-1">
          {product.category} • {product.collection}
        </p>

        <div className="flex items-center space-x-2 pt-0.5">
          <span className="text-xs sm:text-sm font-mono text-text-primary font-medium tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] font-mono text-text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
