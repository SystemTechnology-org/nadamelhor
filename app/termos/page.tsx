import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Termos & Condições | NADA MELHOR ©",
  description: "Termos e condições de uso da loja online NADA MELHOR ©.",
};

export default function TermosPage() {
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
            CONDIÇÕES GERAIS
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.18em] uppercase text-text-primary mt-2">
            TERMOS & CONDIÇÕES
          </h1>
        </div>

        <div className="space-y-6 text-xs sm:text-sm tracking-wide text-text-secondary leading-relaxed">
          <div className="p-4 bg-[#121610] border border-[#1C242B]">
            <p className="font-mono text-text-muted text-[10px] uppercase">
              [ ESPAÇO RESERVADO PARA TERMOS OFICIAIS FORNECIDOS PELO PROPRIETÁRIO ]
            </p>
          </div>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-primary pt-2">
            1. SOBRE OS DROPS E ESTOQUE
          </h2>
          <p>
            As peças desenvolvidas pela NADA MELHOR © são lançadas no formato de drops limitados. A inclusão de um item na sacola não garante a reserva do produto antes da conclusão do pagamento.
          </p>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-primary pt-2">
            2. PREÇOS E CONDIÇÕES DE PAGAMENTO
          </h2>
          <p>
            Os valores apresentados na loja são expressos em Reais (BRL) e podem ser alterados sem aviso prévio. Aceitamos pagamentos à vista via PIX (com desconto concedido na finalização) ou parcelamento em cartão de crédito.
          </p>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-primary pt-2">
            3. PROPRIEDADE INTELECTUAL
          </h2>
          <p>
            Todo o conteúdo visual, fotografias editoriais, logotipos e produtos exibidos neste site são de propriedade exclusiva da NADA MELHOR ©. É proibida a reprodução sem autorização prévia por escrito.
          </p>
        </div>
      </div>
    </div>
  );
}
