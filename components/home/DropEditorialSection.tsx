"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const DropEditorialSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-[#121610] border-t border-[#1C242B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden group">
          {/* Main Large Editorial Image Container */}
          <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/9] w-full overflow-hidden bg-[#0C1014]">
            <Image
              src="/images/drop-campaign.jpg"
              alt="Coleção DROP 01 - Campanha Editorial NADA MELHOR"
              fill
              sizes="100vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1014] via-[#0C1014]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C1014]/80 via-transparent to-transparent hidden sm:block" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-end sm:justify-center max-w-xl">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-brand-blueMuted font-mono">
                COLLECTION RELEASE
              </span>
              <h3 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.2em] uppercase text-text-primary">
                DROP 01
              </h3>
              <p className="mt-3 text-xs sm:text-sm tracking-[0.14em] uppercase text-text-secondary leading-relaxed max-w-md">
                Uma seleção da nova coleção NADA MELHOR. Silhuetas volumosas,
                construções em sarja pesada e texturas minerais moldadas pelo tempo.
              </p>

              <div className="mt-6">
                <Link
                  href="/colecoes"
                  className="inline-flex items-center space-x-3 px-7 py-3.5 bg-text-primary text-background text-xs tracking-[0.25em] font-semibold uppercase hover:bg-white transition-all group/btn"
                >
                  <span>EXPLORAR DROP</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
