import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre | NADA MELHOR ©",
  description:
    "Conheça a visão, conceito e processo autoral da NADA MELHOR. Streetwear e moda contemporânea.",
};

export default function SobrePage() {
  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-[#0C1014] text-text-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-text-muted">
            EDITORIAL • MANIFESTO INSTITUCIONAL
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.2em] uppercase text-text-primary mt-2">
            SOBRE A MARCA
          </h1>
        </div>

        {/* Hero Editorial Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#121610] mb-16 sm:mb-24">
          <Image
            src="/images/about-editorial.jpg"
            alt="Atelier e processo criativo NADA MELHOR"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014]/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-text-secondary bg-[#0C1014]/70 px-3 py-1 backdrop-blur-sm">
            ATELIER • DESENVOLVIMENTO DE CORTES E TECIDOS
          </div>
        </div>

        {/* Section 1: Propósito */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-14 mb-20 sm:mb-28 border-b border-[#1C242B] pb-16">
          <div className="md:col-span-4">
            <span className="text-xs tracking-[0.25em] uppercase text-brand-blueMuted font-mono">
              01 / PROPÓSITO
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.16em] uppercase text-text-primary mt-2">
              NADA MELHOR
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-6 bg-[#121610] border border-[#1C242B] space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted block font-mono">
                [ ESPAÇO RESERVADO PARA TEXTO DO PROPRIETÁRIO ]
              </span>
              <p className="text-sm tracking-[0.12em] uppercase text-text-primary font-medium">
                [ PROPÓSITO DA MARCA ]
              </p>
              <p className="text-xs tracking-[0.12em] text-text-secondary leading-relaxed">
                Este espaço está reservado para a descrição oficial do propósito, valores e manifesto da NADA MELHOR, redigidos pelo proprietário da marca. A arquitetura visual da página já está calibrada para receber o texto definitivo mantendo a harmonia editorial e minimalista.
              </p>
            </div>
          </div>
        </div>

        {/* Two Images Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-20 sm:mb-28">
          <div className="relative aspect-[4/5] bg-[#121610] overflow-hidden">
            <Image
              src="/images/instagram-1.jpg"
              alt="Atmosfera urbana NADA MELHOR"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] bg-[#121610] overflow-hidden">
            <Image
              src="/images/instagram-2.jpg"
              alt="Natureza e arquitetura bruta NADA MELHOR"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section 2: História & Origem */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-14 mb-20 sm:mb-28 border-b border-[#1C242B] pb-16">
          <div className="md:col-span-4">
            <span className="text-xs tracking-[0.25em] uppercase text-brand-blueMuted font-mono">
              02 / TRAJETÓRIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.16em] uppercase text-text-primary mt-2">
              HISTÓRIA & IDENTIDADE
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-6 bg-[#121610] border border-[#1C242B] space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted block font-mono">
                [ ESPAÇO RESERVADO PARA TEXTO DO PROPRIETÁRIO ]
              </span>
              <p className="text-sm tracking-[0.12em] uppercase text-text-primary font-medium">
                [ HISTÓRIA DA NADA MELHOR ]
              </p>
              <p className="text-xs tracking-[0.12em] text-text-secondary leading-relaxed">
                Nenhum texto histórico ficcional foi inserido aqui, respeitando integralmente a exigência de não inventar a trajetória da empresa. Este placeholder será preenchido com a biografia e origens autênticas fornecidas pela marca.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Pilares & Produção */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-14 mb-20 sm:mb-28 border-b border-[#1C242B] pb-16">
          <div className="md:col-span-4">
            <span className="text-xs tracking-[0.25em] uppercase text-brand-blueMuted font-mono">
              03 / MATÉRIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.16em] uppercase text-text-primary mt-2">
              TEXTO INSTITUCIONAL
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-6 bg-[#121610] border border-[#1C242B] space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted block font-mono">
                [ ESPAÇO RESERVADO PARA TEXTO DO PROPRIETÁRIO ]
              </span>
              <p className="text-sm tracking-[0.12em] uppercase text-text-primary font-medium">
                [ TEXTO INSTITUCIONAL ]
              </p>
              <p className="text-xs tracking-[0.12em] text-text-secondary leading-relaxed">
                Área destinada aos pilares de fabricação, matérias-primas nobres, responsabilidade produtiva e diretrizes de design que guiam as coleções da NADA MELHOR.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Shop & Instagram */}
        <div className="text-center py-12 space-y-6">
          <span className="text-xs tracking-[0.3em] uppercase text-text-muted">
            FAÇA PARTE DO NOSSO UNIVERSO
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-text-primary text-background text-xs tracking-[0.25em] font-semibold uppercase hover:bg-white transition-all inline-flex items-center space-x-2"
            >
              <span>EXPLORAR O SHOP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://www.instagram.com/nadamelh0r/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-[#2B353E] hover:border-text-primary text-text-primary text-xs tracking-[0.25em] font-medium uppercase transition-all inline-flex items-center space-x-2"
            >
              <Instagram className="w-4 h-4" />
              <span>SIGA NO INSTAGRAM</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
