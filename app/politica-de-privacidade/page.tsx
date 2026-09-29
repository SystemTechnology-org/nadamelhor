import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade | NADA MELHOR ©",
  description: "Política de privacidade e proteção de dados da NADA MELHOR ©.",
};

export default function PoliticaPrivacidadePage() {
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
            TERMOS LEGAIS & LGPD
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.18em] uppercase text-text-primary mt-2">
            POLÍTICA DE PRIVACIDADE
          </h1>
        </div>

        <div className="space-y-6 text-xs sm:text-sm tracking-wide text-text-secondary leading-relaxed">
          <div className="p-4 bg-[#121610] border border-[#1C242B]">
            <p className="font-mono text-text-muted text-[10px] uppercase">
              [ ESPAÇO RESERVADO PARA TEXTO JURÍDICO OFICIAL DA MARCA ]
            </p>
          </div>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-primary pt-2">
            1. COLETAS DE DADOS
          </h2>
          <p>
            A NADA MELHOR © preza pela máxima confidencialidade e segurança dos dados fornecidos por nossos clientes durante a navegação e compra. Coletamos apenas informações indispensáveis para emissão de pedidos e comunicação sobre o status da entrega.
          </p>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-primary pt-2">
            2. SEGURANÇA E ARMAZENAMENTO
          </h2>
          <p>
            Todos os dados trafegam com criptografia SSL de ponta a ponta. Informações de pagamento via cartão de crédito não são armazenadas em nossos servidores e são processadas diretamente por gateways certificados com conformidade PCI-DSS.
          </p>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-primary pt-2">
            3. COMUNICAÇÕES & PRIVACIDADE
          </h2>
          <p>
            O envio de informativos sobre novos drops ocorre exclusivamente com a autorização expressa do cliente, com opção de cancelamento instantâneo a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}
