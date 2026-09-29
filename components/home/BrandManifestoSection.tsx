"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const BrandManifestoSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#0C1014] border-t border-[#1C242B]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-text-muted font-mono">
          MANIFESTO • ESSÊNCIA DA MARCA
        </span>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.16em] uppercase text-text-primary leading-[1.3] max-w-4xl mx-auto">
          &ldquo;NÃO É SOBRE SEGUIR TENDÊNCIAS. É SOBRE OCUPAR O ESPAÇO COM MATÉRIA,
          SILÊNCIO E IDENTIDADE.&rdquo;
        </h2>

        <p className="text-xs sm:text-sm tracking-[0.18em] uppercase text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Peças pensadas para durar. Cortes milimetricamente ajustados, malhas de alta
          gramatura e uma visão autoral que une a crueza do concreto à quietude da
          natureza.
        </p>

        <div className="pt-4">
          <Link
            href="/sobre"
            className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] uppercase text-text-primary hover:text-text-secondary transition-colors link-editorial pb-1"
          >
            <span>CONHEÇA NOSSO PROCESSO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
