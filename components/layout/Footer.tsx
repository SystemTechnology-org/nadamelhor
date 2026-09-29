"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, ArrowRight, Check } from "lucide-react";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#0C1014] border-t border-[#1C242B] pt-16 sm:pt-20 pb-12 text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Manifesto Banner */}
        <div className="pb-16 border-b border-[#1C242B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] tracking-[0.28em] uppercase text-text-secondary">
              DROP NOTIFICATIONS • ACESSO ANTECIPADO
            </span>
            <h3 className="text-xl sm:text-2xl tracking-[0.18em] uppercase font-light text-text-primary max-w-lg">
              FIQUE POR DENTRO DOS PRÓXIMOS LANÇAMENTOS E PEÇAS LIMITADAS.
            </h3>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex border-b border-[#2B353E] focus-within:border-text-primary transition-colors py-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="SEU MELHOR E-MAIL"
                  className="w-full bg-transparent text-xs tracking-[0.18em] uppercase text-text-primary placeholder:text-text-muted focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 flex items-center space-x-1"
                  aria-label="Inscrever-se na newsletter"
                >
                  {isSubscribed ? (
                    <span className="flex items-center space-x-1 text-xs text-brand-blueMuted">
                      <Check className="w-3.5 h-3.5" />
                      <span>INSCRITO</span>
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[10px] tracking-wider text-text-muted uppercase">
                Zero spam. Apenas comunicados essenciais de novos drops.
              </p>
            </form>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="text-lg tracking-[0.3em] font-semibold uppercase text-text-primary inline-block"
            >
              NADA MELHOR
            </Link>
            <p className="text-xs tracking-[0.12em] text-text-secondary max-w-sm leading-relaxed">
              Streetwear contemporâneo com fotografia editorial e estética
              cinematográfica. Desenvolvido no Brasil com matérias-primas
              nobres e tiragens exclusivas.
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/nadamelh0r/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors py-1 group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>@nadamelh0r</span>
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-text-muted font-semibold">
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/shop"
                  className="text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors link-editorial"
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  href="/colecoes"
                  className="text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors link-editorial"
                >
                  COLEÇÕES
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors link-editorial"
                >
                  SOBRE
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contato@nadamelhor.com.br"
                  className="text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors link-editorial"
                >
                  CONTATO
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional / Policies Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-text-muted font-semibold">
              INSTITUCIONAL
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors link-editorial"
                >
                  POLÍTICA DE PRIVACIDADE
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors link-editorial"
                >
                  TERMOS & CONDIÇÕES
                </Link>
              </li>
              <li>
                <Link
                  href="/trocas-e-devolucoes"
                  className="text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors link-editorial"
                >
                  TROCAS E DEVOLUÇÕES
                </Link>
              </li>
              <li>
                <span className="text-xs tracking-[0.15em] uppercase text-text-muted block">
                  Envio para todo o Brasil • Primeira troca sem custo
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1C242B] flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-[0.2em] uppercase text-text-muted space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} NADA MELHOR. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex items-center space-x-6 text-[10px] tracking-widest">
            <span>PIX</span>
            <span>CARTÃO DE CRÉDITO</span>
            <span>BOLETO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
