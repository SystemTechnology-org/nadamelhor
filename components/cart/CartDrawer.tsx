"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingThreshold,
    totalItems,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const diffToFreeShipping = freeShippingThreshold - subtotal;
  const shippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola de Compras"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0C1014]/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-[#0C1014] border-l border-[#1C242B] flex flex-col justify-between h-full z-10 shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-[#1C242B]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm tracking-[0.25em] font-semibold uppercase text-text-primary">
                SACOLA
              </span>
              <span className="text-xs text-text-muted tracking-widest">
                ({totalItems})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="text-text-secondary hover:text-text-primary transition-colors p-1"
              aria-label="Fechar sacola"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="mt-4 pt-3 border-t border-[#1C242B]/60">
            <div className="flex justify-between text-[11px] tracking-[0.15em] uppercase text-text-secondary mb-1.5">
              {diffToFreeShipping > 0 ? (
                <span>
                  Faltam{" "}
                  <strong className="text-text-primary font-mono">
                    {formatPrice(diffToFreeShipping)}
                  </strong>{" "}
                  para FRETE GRÁTIS
                </span>
              ) : (
                <span className="text-[#80A3B1] font-semibold">
                  PARABÉNS! VOCÊ TEM FRETE GRÁTIS
                </span>
              )}
              <span className="text-text-muted font-mono">{shippingProgress}%</span>
            </div>
            <div className="w-full bg-[#1C242B] h-1 rounded-full overflow-hidden">
              <div
                className="bg-brand-blueMuted h-full transition-all duration-500 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <ShoppingBag className="w-10 h-10 text-text-muted stroke-[1]" />
              <div className="space-y-1">
                <p className="text-sm tracking-[0.2em] uppercase text-text-primary font-medium">
                  SUA SACOLA ESTÁ VAZIA
                </p>
                <p className="text-xs tracking-[0.12em] text-text-muted max-w-xs">
                  Explore nossa coleção autoral e selecione suas peças.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-4 inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase px-5 py-3 border border-text-primary text-text-primary hover:bg-text-primary hover:text-background transition-all"
              >
                <span>EXPLORAR SHOP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex space-x-4 pb-6 border-b border-[#1C242B]/60 last:border-b-0"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-24 bg-[#121610] overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-xs tracking-[0.18em] uppercase font-semibold text-text-primary hover:text-text-secondary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-text-muted hover:text-text-primary transition-colors p-1"
                        aria-label="Remover item da sacola"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] tracking-[0.12em] uppercase text-text-secondary mt-1">
                      Tam: {item.size} • Cor: {item.color}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="inline-flex items-center border border-[#1C242B]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono text-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-xs font-mono text-text-primary font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#1C242B] bg-[#0C1014] space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs tracking-[0.15em] uppercase text-text-secondary">
                <span>SUBTOTAL</span>
                <span className="font-mono text-text-primary font-semibold text-sm">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] tracking-[0.1em] text-text-muted">
                Frete e impostos calculados na etapa seguinte.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center space-x-2 bg-text-primary text-background py-3.5 text-xs tracking-[0.25em] font-semibold uppercase hover:bg-white hover:shadow-lg transition-all"
              >
                <span>IR PARA CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={closeCart}
                className="w-full py-2.5 text-[11px] tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors text-center"
              >
                CONTINUAR COMPRANDO
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
