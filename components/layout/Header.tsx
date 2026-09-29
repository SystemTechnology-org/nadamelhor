"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useUI } from "@/lib/ui-context";
import { Search, ShoppingBag, Menu } from "lucide-react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { openMobileMenu, openSearch } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "SHOP", href: "/shop" },
    { label: "COLEÇÕES", href: "/colecoes" },
    { label: "SOBRE", href: "/sobre" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0C1014]/90 backdrop-blur-md border-b border-[#1C242B] py-3 sm:py-4"
          : "bg-gradient-to-b from-[#0C1014]/80 via-[#0C1014]/30 to-transparent py-5 sm:py-7"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="flex-1 md:flex-initial">
            <Link
              href="/"
              className="inline-block group focus:outline-none focus:ring-1 focus:ring-text-primary/50"
              aria-label="NADA MELHOR - Página Inicial"
            >
              <span className="text-base sm:text-lg tracking-[0.28em] font-semibold text-text-primary uppercase transition-opacity duration-300 group-hover:opacity-80">
                NADA MELHOR
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center space-x-9"
            aria-label="Navegação Principal"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-[0.2em] font-medium uppercase transition-colors duration-300 relative py-1 ${
                    isActive
                      ? "text-text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-text-primary"
                      : "text-text-secondary hover:text-text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-text-primary after:transition-all after:duration-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Search & Sacola (Desktop & Mobile) */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-200 py-1 focus:outline-none focus:ring-1 focus:ring-text-primary/50"
              aria-label="Buscar produtos"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
              <span className="hidden sm:inline text-xs tracking-[0.18em] uppercase font-medium">
                BUSCA
              </span>
            </button>

            {/* Sacola Button */}
            <button
              onClick={openCart}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-200 py-1 relative focus:outline-none focus:ring-1 focus:ring-text-primary/50"
              aria-label={`Sacola com ${totalItems} item(ns)`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span className="text-xs tracking-[0.18em] uppercase font-medium">
                SACOLA
              </span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold bg-text-primary text-background rounded-full leading-none transition-transform animate-fade-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={openMobileMenu}
              className="md:hidden flex items-center text-text-secondary hover:text-text-primary transition-colors p-1 focus:outline-none focus:ring-1 focus:ring-text-primary/50"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
