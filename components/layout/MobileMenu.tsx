"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/lib/ui-context";
import { X, ArrowRight, Instagram } from "lucide-react";

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUI();
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  if (!isMobileMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Menu Mobile"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0C1014]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm bg-[#0C1014] border-r border-[#1C242B] p-6 sm:p-8 flex flex-col justify-between h-full z-10 animate-fade-in shadow-2xl">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between pb-6 border-b border-[#1C242B]">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="text-sm tracking-[0.25em] font-semibold uppercase text-text-primary"
            >
              NADA MELHOR
            </Link>
            <button
              onClick={closeMobileMenu}
              className="text-text-secondary hover:text-text-primary transition-colors p-1"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-6">
            <div>
              <Link
                href="/shop"
                onClick={closeMobileMenu}
                className="group flex items-center justify-between text-lg tracking-[0.2em] font-medium uppercase text-text-primary hover:text-text-secondary transition-colors"
              >
                <span>SHOP</span>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>

              {/* Sub-categories */}
              <div className="mt-3 pl-3 flex flex-col space-y-2 border-l border-[#1C242B]">
                {[
                  { label: "Todos os Produtos", href: "/shop" },
                  { label: "Camisetas", href: "/shop?category=camisetas" },
                  { label: "Moletons", href: "/shop?category=moletons" },
                  { label: "Calças", href: "/shop?category=calcas" },
                  { label: "Acessórios", href: "/shop?category=acessorios" },
                ].map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={closeMobileMenu}
                    className="text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-text-primary transition-colors py-1"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <Link
                href="/colecoes"
                onClick={closeMobileMenu}
                className="group flex items-center justify-between text-lg tracking-[0.2em] font-medium uppercase text-text-primary hover:text-text-secondary transition-colors"
              >
                <span>COLEÇÕES</span>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <div className="mt-2 pl-3 flex flex-col space-y-2 border-l border-[#1C242B]">
                <Link
                  href="/colecoes#drop-01"
                  onClick={closeMobileMenu}
                  className="text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  DROP 01
                </Link>
              </div>
            </div>

            <div>
              <Link
                href="/sobre"
                onClick={closeMobileMenu}
                className="group flex items-center justify-between text-lg tracking-[0.2em] font-medium uppercase text-text-primary hover:text-text-secondary transition-colors"
              >
                <span>SOBRE A MARCA</span>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </nav>
        </div>

        {/* Footer info in mobile drawer */}
        <div className="pt-6 border-t border-[#1C242B]">
          <a
            href="https://www.instagram.com/nadamelh0r/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>@nadamelh0r</span>
          </a>
          <p className="mt-3 text-[11px] tracking-widest uppercase text-text-muted">
            © NADA MELHOR • INDEPENDENT LABEL
          </p>
        </div>
      </div>
    </div>
  );
};
