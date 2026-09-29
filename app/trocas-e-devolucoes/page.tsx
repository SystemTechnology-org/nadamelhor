import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Trocas e Devoluções | NADA MELHOR ©",
  description:
    "Diretrizes e procedimento simples para trocas e devoluções gratuitas de produtos NADA MELHOR ©.",
};

export default function TrocasDevolucoesPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0C1014] text-text-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLTAR À PÁGINA INICIAL</span>
        </Link>

        <div className="border-b border-[#1C242B] pb-6">
          <span className="text-[10px] tracking-[0.25em] uppercase text-text-muted font-mono">
            GARANTIA & POLÍTICA DO CONSUMIDOR
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.18em] uppercase text-text-primary mt-2">
            TROCAS E DEVOLUÇÕES
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-[#121610] border border-[#1C242B] space-y-2">
            <RotateCcw className="w-5 h-5 text-brand-blueMuted" />
            <h3 className="text-xs tracking-wider uppercase font-semibold text-text-primary">
              7 DIAS CORRIDOS
            </h3>
            <p className="text-[11px] text-text-secondary">
              Prazo para solicitar troca ou devolução a partir da data de entrega do pedido.
            </p>
          </div>

          <div className="p-4 bg-[#121610] border border-[#1C242B] space-y-2">
            <ShieldCheck className="w-5 h-5 text-brand-blueMuted" />
            <h3 className="text-xs tracking-wider uppercase font-semibold text-text-primary">
              1ª TROCA GRÁTIS
            </h3>
            <p className="text-[11px] text-text-secondary">
              O frete de logística reversa da primeira troca é por conta da NADA MELHOR.
            </p>
          </div>

          <div className="p-4 bg-[#121610] border border-[#1C242B] space-y-2">
            <Mail className="w-5 h-5 text-brand-blueMuted" />
            <h3 className="text-xs tracking-wider uppercase font-semibold text-text-primary">
              SUPORTE RÁPIDO
            </h3>
            <p className="text-[11px] text-text-secondary">
              Envie mensagem com o número do pedido para suporte direto.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm tracking-wide text-text-secondary leading-relaxed">
          <div className="p-4 bg-[#121610] border border-[#1C242B]">
            <p className="font-mono text-text-muted text-[10px] uppercase">
              [ ESPAÇO RESERVADO PARA REGRAS ESPECÍFICAS DE TROCA FORNECIDAS PELA MARCA ]
            </p>
          </div>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-primary pt-2">
            CONDIÇÕES GERAIS DA PEÇA
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-text-secondary pl-2">
            <li>A peça deve estar em perfeito estado, sem sinais de uso, lavagem ou odores.</li>
            <li>As etiquetas e tags originais da NADA MELHOR devem estar afixadas ao produto.</li>
            <li>A embalagem original e eventuais brindes/acessórios devem acompanhar o item.</li>
          </ul>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-primary pt-2">
            COMO SOLICITAR
          </h2>
          <p>
            Para dar início à solicitação, envie um e-mail para{" "}
            <a
              href="mailto:contato@nadamelhor.com.br"
              className="text-text-primary underline hover:text-white"
            >
              contato@nadamelhor.com.br
            </a>{" "}
            informando seu nome completo, CPF e o número do seu pedido (ex: NM-123456), juntamente com o motivo da troca. Nossa equipe retornará em até 24 horas úteis com o código de postagem reversa dos Correios.
          </p>
        </div>
      </div>
    </div>
  );
}
