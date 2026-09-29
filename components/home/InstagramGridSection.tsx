"use client";

import React from "react";
import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";

export const InstagramGridSection: React.FC = () => {
  const instagramPosts = [
    {
      id: "ig-1",
      image: "/images/instagram-1.jpg",
      alt: "Atmosfera urbana NADA MELHOR na chuva",
      caption: "silêncio na matéria.",
    },
    {
      id: "ig-2",
      image: "/images/instagram-2.jpg",
      alt: "Natureza e brutalismo em contraste",
      caption: "natureza orgânica x concreto.",
    },
    {
      id: "ig-3",
      image: "/images/tshirt-2-back.jpg",
      alt: "Camiseta Essential Brown caída pelas costas",
      caption: "peso 240g/m² em detalhes.",
    },
    {
      id: "ig-4",
      image: "/images/pants-1-front.jpg",
      alt: "Calça Cargo Carpenter em sarja ardósia",
      caption: "corte reto, volume no calçado.",
    },
    {
      id: "ig-5",
      image: "/images/about-editorial.jpg",
      alt: "Atelier e desenvolvimento do DROP 01",
      caption: "processo autoral de confecção.",
    },
    {
      id: "ig-6",
      image: "/images/cap-1-front.jpg",
      alt: "Dad hat desestruturado em sarja peletizada",
      caption: "detalhes essenciais.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0C1014] border-t border-[#1C242B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-4 border-b border-[#1C242B]">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-text-muted">
              DIÁRIO VISUAL & COMUNIDADE
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase text-text-primary">
              SIGA A NADA MELHOR
            </h2>
          </div>

          <a
            href="https://www.instagram.com/nadamelh0r/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors py-1"
          >
            <Instagram className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors" />
            <span className="font-semibold text-text-primary">@nadamelh0r</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 6-post Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/nadamelh0r/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-[#121610] overflow-hidden block focus:outline-none focus:ring-1 focus:ring-text-primary/50"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-[#0C1014]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <Instagram className="w-6 h-6 text-text-primary mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                <p className="text-[10px] tracking-wider uppercase text-text-secondary line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
