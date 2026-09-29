"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[94vh] sm:h-screen min-h-[620px] flex items-end sm:items-center overflow-hidden bg-[#0C1014]">
      {/* Background Editorial Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-editorial.jpg"
          alt="NADA MELHOR - Coleção DROP 01 Editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.01] transition-transform duration-1000 ease-out"
        />
        {/* Subtle cinematic overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014] via-[#0C1014]/40 to-transparent opacity-90 sm:opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1014]/70 via-transparent to-transparent hidden sm:block" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-0">
        <div className="max-w-xl space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <span className="inline-block text-[11px] sm:text-xs tracking-[0.35em] uppercase text-text-secondary font-medium">
              NOVA COLEÇÃO • 2026
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.2em] uppercase text-text-primary leading-[1.05]">
              NADA
              <br />
              <span className="font-semibold">MELHOR</span>
            </h1>
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-blueMuted font-mono">
              DROP 01
            </p>
            <p className="text-xs sm:text-sm tracking-[0.14em] uppercase text-text-secondary leading-relaxed max-w-md">
              Silêncio, matéria e presença urbana. Peças estruturadas em malha
              pesada com acabamento mineral.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/colecoes"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-text-primary text-background text-xs tracking-[0.25em] font-semibold uppercase hover:bg-white transition-all duration-300"
            >
              VER COLEÇÃO
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-text-primary/60 text-text-primary text-xs tracking-[0.25em] font-medium uppercase hover:border-text-primary hover:bg-[#0C1014]/40 backdrop-blur-sm transition-all duration-300"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="hidden sm:flex absolute bottom-8 right-8 z-10 items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-text-muted">
        <span>EXPLORE</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
};
