"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import {
  ShieldCheck,
  Lock,
  QrCode,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  Truck,
  Copy,
  Check,
} from "lucide-react";

export const CheckoutClient: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "SP",
    paymentMethod: "pix" as "pix" | "credit_card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    installments: "1",
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const [shippingMethod, setShippingMethod] = useState<"pac" | "sedex">(
    "pac"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);
  const [copiedPixKey, setCopiedPixKey] = useState(false);

  // Auto calculate shipping cost
  const isFreeShipping = subtotal >= 399;
  const shippingCost = isFreeShipping
    ? 0
    : shippingMethod === "pac"
    ? 18.9
    : 32.5;

  // Pix discount 5%
  const pixDiscount = formData.paymentMethod === "pix" ? subtotal * 0.05 : 0;

  const total = Math.max(0, subtotal - couponDiscount - pixDiscount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (couponCode.toUpperCase() === "NADAMELHOR10" || couponCode.toUpperCase() === "DROP01") {
      const discount = subtotal * 0.1;
      setCouponDiscount(discount);
      setCouponSuccess(true);
    } else {
      setCouponError("Cupom inválido ou expirado.");
    }
  };

  const handleCepBlur = async () => {
    const cleanCep = formData.cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro || prev.address,
            neighborhood: data.bairro || prev.neighborhood,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
          }));
        }
      } catch {
        // ignore network error
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = `NM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderComplete(randomOrder);
      clearCart();
    }, 1500);
  };

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(
      "00020126580014br.gov.bcb.pix0136nadamelhor-pagamento-pix-autenticado5204000053039865404" +
        total.toFixed(2)
    );
    setCopiedPixKey(true);
    setTimeout(() => setCopiedPixKey(false), 3000);
  };

  if (orderComplete) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-brand-blueMuted mx-auto stroke-[1.2]" />
        <div className="space-y-2">
          <span className="text-xs tracking-[0.25em] uppercase text-text-muted font-mono">
            PEDIDO CONFIRMADO COM SUCESSO
          </span>
          <h1 className="text-3xl font-light tracking-[0.16em] uppercase text-text-primary">
            OBRIGADO, {formData.fullName.split(" ")[0].toUpperCase()}!
          </h1>
          <p className="text-xs font-mono tracking-widest text-text-secondary">
            NÚMERO DO PEDIDO: <strong>{orderComplete}</strong>
          </p>
        </div>

        {formData.paymentMethod === "pix" ? (
          <div className="p-6 bg-[#121610] border border-[#1C242B] text-left space-y-4 max-w-md mx-auto">
            <div className="flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-semibold text-text-primary">
              <QrCode className="w-4 h-4 text-brand-blueMuted" />
              <span>PAGAMENTO VIA PIX (5% OFF APLICADO)</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Escaneie o QR Code abaixo ou utilize o código copia e cola no aplicativo do seu banco:
            </p>
            <div className="p-4 bg-white rounded flex justify-center">
              {/* Simulated QR Code Pattern */}
              <div className="w-40 h-40 bg-neutral-900 flex items-center justify-center text-[10px] text-white font-mono p-2 text-center">
                [ QR CODE PIX • R$ {total.toFixed(2)} ]
              </div>
            </div>
            <button
              onClick={handleCopyPix}
              className="w-full py-3 bg-[#161B1F] border border-[#2B353E] hover:border-text-primary text-xs tracking-[0.18em] uppercase text-text-primary flex items-center justify-center space-x-2 transition-colors"
            >
              {copiedPixKey ? (
                <>
                  <Check className="w-3.5 h-3.5 text-brand-blueMuted" />
                  <span>CÓDIGO COPIADO!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPIAR CÓDIGO PIX</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="p-6 bg-[#121610] border border-[#1C242B] max-w-md mx-auto text-xs text-text-secondary space-y-2">
            <p className="text-text-primary font-medium">
              Pagamento via cartão em análise.
            </p>
            <p>
              Você receberá todos os detalhes da transação e rastreamento em <strong>{formData.email}</strong>.
            </p>
          </div>
        )}

        <div className="pt-6">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-text-primary text-background text-xs tracking-[0.25em] font-semibold uppercase hover:bg-white transition-all"
          >
            <span>CONTINUAR EXPLORANDO O SHOP</span>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-24 max-w-xl mx-auto px-4 text-center space-y-5">
        <h1 className="text-2xl font-light tracking-[0.2em] uppercase text-text-primary">
          SUA SACOLA ESTÁ VAZIA
        </h1>
        <p className="text-xs tracking-wider uppercase text-text-secondary">
          Adicione itens à sua sacola para prosseguir para o checkout.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-4 px-8 py-3.5 bg-text-primary text-background text-xs tracking-[0.25em] font-semibold uppercase hover:bg-white transition-all"
        >
          EXPLORAR PRODUTOS
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-[#0C1014] text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Back & Security note */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#1C242B]">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-xs tracking-[0.18em] uppercase text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VOLTAR AO SHOP</span>
          </Link>
          <div className="flex items-center space-x-2 text-xs tracking-wider uppercase text-text-muted">
            <Lock className="w-3.5 h-3.5 text-brand-blueMuted" />
            <span>CHECKOUT SEGURO & DIRETO</span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* LEFT COLUMN: Customer Information & Delivery */}
            <div className="lg:col-span-7 space-y-10">
              {/* 1. Identification */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-[#1C242B] pb-2">
                  <span className="text-xs font-mono text-brand-blueMuted font-bold">
                    01
                  </span>
                  <h2 className="text-sm tracking-[0.22em] uppercase font-semibold text-text-primary">
                    IDENTIFICAÇÃO
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      NOME COMPLETO *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Ex: Gabriel Silveira"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      E-MAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="seu@email.com"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-[#1C242B] pb-2">
                  <span className="text-xs font-mono text-brand-blueMuted font-bold">
                    02
                  </span>
                  <h2 className="text-sm tracking-[0.22em] uppercase font-semibold text-text-primary">
                    ENDEREÇO DE ENTREGA
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      CEP *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={9}
                      value={formData.cep}
                      onBlur={handleCepBlur}
                      onChange={(e) =>
                        setFormData({ ...formData, cep: e.target.value })
                      }
                      placeholder="00000-000"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs font-mono text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      ENDEREÇO / RUA *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Rua, Avenida, etc."
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      NÚMERO *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.number}
                      onChange={(e) =>
                        setFormData({ ...formData, number: e.target.value })
                      }
                      placeholder="123"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      COMPLEMENTO
                    </label>
                    <input
                      type="text"
                      value={formData.complement}
                      onChange={(e) =>
                        setFormData({ ...formData, complement: e.target.value })
                      }
                      placeholder="Apto 42, Bloco B"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      BAIRRO *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.neighborhood}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          neighborhood: e.target.value,
                        })
                      }
                      placeholder="Bairro"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      CIDADE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Cidade"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block mb-1">
                      UF *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          state: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="SP"
                      className="w-full bg-[#121610] border border-[#1C242B] px-3.5 py-2.5 text-xs font-mono text-text-primary focus:outline-none focus:border-text-primary uppercase"
                    />
                  </div>
                </div>

                {/* Delivery Option Selector */}
                <div className="mt-4 pt-3 space-y-2">
                  <label className="text-[11px] tracking-[0.15em] uppercase text-text-secondary block">
                    MODALIDADE DE ENVIO
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                        shippingMethod === "pac"
                          ? "border-text-primary bg-[#161B1F]"
                          : "border-[#1C242B] bg-[#121610] hover:border-text-secondary"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === "pac"}
                          onChange={() => setShippingMethod("pac")}
                          className="accent-text-primary"
                        />
                        <div>
                          <p className="text-xs font-medium text-text-primary">
                            PAC Expresso
                          </p>
                          <p className="text-[10px] text-text-muted">
                            4 a 6 dias úteis
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-text-primary">
                        {isFreeShipping ? "GRÁTIS" : formatPrice(18.9)}
                      </span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                        shippingMethod === "sedex"
                          ? "border-text-primary bg-[#161B1F]"
                          : "border-[#1C242B] bg-[#121610] hover:border-text-secondary"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === "sedex"}
                          onChange={() => setShippingMethod("sedex")}
                          className="accent-text-primary"
                        />
                        <div>
                          <p className="text-xs font-medium text-text-primary">
                            SEDEX Prioritário
                          </p>
                          <p className="text-[10px] text-text-muted">
                            1 a 2 dias úteis
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-text-primary">
                        {isFreeShipping ? "GRÁTIS" : formatPrice(32.5)}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-[#1C242B] pb-2">
                  <span className="text-xs font-mono text-brand-blueMuted font-bold">
                    03
                  </span>
                  <h2 className="text-sm tracking-[0.22em] uppercase font-semibold text-text-primary">
                    PAGAMENTO
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "pix" })
                    }
                    className={`p-3.5 border flex items-center justify-center space-x-2 text-xs tracking-[0.18em] uppercase transition-all ${
                      formData.paymentMethod === "pix"
                        ? "border-text-primary bg-[#161B1F] text-text-primary font-semibold"
                        : "border-[#1C242B] bg-[#121610] text-text-secondary hover:border-text-primary"
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-brand-blueMuted" />
                    <span>PIX (5% OFF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "credit_card" })
                    }
                    className={`p-3.5 border flex items-center justify-center space-x-2 text-xs tracking-[0.18em] uppercase transition-all ${
                      formData.paymentMethod === "credit_card"
                        ? "border-text-primary bg-[#161B1F] text-text-primary font-semibold"
                        : "border-[#1C242B] bg-[#121610] text-text-secondary hover:border-text-primary"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>CARTÃO DE CRÉDITO</span>
                  </button>
                </div>

                {formData.paymentMethod === "credit_card" && (
                  <div className="p-4 bg-[#121610] border border-[#1C242B] space-y-3 animate-fade-in">
                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-text-secondary block mb-1">
                        NÚMERO DO CARTÃO
                      </label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, cardNumber: e.target.value })
                        }
                        className="w-full bg-[#0C1014] border border-[#1C242B] px-3 py-2 text-xs font-mono text-text-primary focus:outline-none focus:border-text-primary"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-text-secondary block mb-1">
                        NOME IMPRESSO NO CARTÃO
                      </label>
                      <input
                        type="text"
                        placeholder="COMO NO CARTÃO"
                        value={formData.cardName}
                        onChange={(e) =>
                          setFormData({ ...formData, cardName: e.target.value })
                        }
                        className="w-full bg-[#0C1014] border border-[#1C242B] px-3 py-2 text-xs uppercase text-text-primary focus:outline-none focus:border-text-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] tracking-wider uppercase text-text-secondary block mb-1">
                          VALIDADE
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          maxLength={5}
                          value={formData.cardExpiry}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cardExpiry: e.target.value,
                            })
                          }
                          className="w-full bg-[#0C1014] border border-[#1C242B] px-3 py-2 text-xs font-mono text-text-primary focus:outline-none focus:border-text-primary"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] tracking-wider uppercase text-text-secondary block mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={(e) =>
                            setFormData({ ...formData, cardCvv: e.target.value })
                          }
                          className="w-full bg-[#0C1014] border border-[#1C242B] px-3 py-2 text-xs font-mono text-text-primary focus:outline-none focus:border-text-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-text-secondary block mb-1">
                        PARCELAMENTO
                      </label>
                      <select
                        value={formData.installments}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            installments: e.target.value,
                          })
                        }
                        className="w-full bg-[#0C1014] border border-[#1C242B] px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-text-primary cursor-pointer"
                      >
                        <option value="1">
                          1x de {formatPrice(total)} (sem juros)
                        </option>
                        <option value="2">
                          2x de {formatPrice(total / 2)} (sem juros)
                        </option>
                        <option value="3">
                          3x de {formatPrice(total / 3)} (sem juros)
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "pix" && (
                  <div className="p-4 bg-[#121610] border border-[#1C242B] text-xs text-text-secondary space-y-1.5 animate-fade-in">
                    <p className="text-text-primary font-medium flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-blueMuted" />
                      <span>5% de desconto exclusivo no PIX</span>
                    </p>
                    <p className="text-[11px] text-text-muted">
                      O código QR e o copia-e-cola serão gerados imediatamente após clicar em Finalizar Pedido.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-[#121610] border border-[#1C242B] sticky top-28 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#1C242B]">
                  <h3 className="text-xs tracking-[0.22em] uppercase font-semibold text-text-primary">
                    RESUMO DO PEDIDO
                  </h3>
                  <span className="text-xs font-mono text-text-muted">
                    {items.length} {items.length === 1 ? "item" : "itens"}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex space-x-3 items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-14 bg-[#0C1014] overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs tracking-wider uppercase font-medium text-text-primary line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-text-muted uppercase">
                            Tam: {item.size} • Qtd: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2 border-t border-[#1C242B]">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="CUPOM DE DESCONTO"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#0C1014] border border-[#1C242B] px-3 py-2 text-xs uppercase tracking-wider text-text-primary focus:outline-none focus:border-text-primary"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 border border-l-0 border-[#1C242B] bg-[#161B1F] text-[11px] tracking-wider uppercase text-text-secondary hover:text-text-primary transition-colors"
                    >
                      APLICAR
                    </button>
                  </div>
                  {couponSuccess && (
                    <p className="text-[10px] tracking-wider text-brand-blueMuted mt-1">
                      Cupom aplicado com sucesso (-10%)!
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[10px] tracking-wider text-red-400 mt-1">
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-2 pt-2 border-t border-[#1C242B] text-xs">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span className="font-mono text-text-primary">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-brand-blueMuted">
                      <span>Desconto Cupom</span>
                      <span className="font-mono">
                        -{formatPrice(couponDiscount)}
                      </span>
                    </div>
                  )}

                  {pixDiscount > 0 && (
                    <div className="flex justify-between text-brand-blueMuted">
                      <span>Desconto PIX (5%)</span>
                      <span className="font-mono">
                        -{formatPrice(pixDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-text-secondary">
                    <span>Frete</span>
                    <span className="font-mono text-text-primary">
                      {shippingCost === 0 ? "GRÁTIS" : formatPrice(shippingCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-[#1C242B] text-sm font-semibold text-text-primary">
                    <span className="tracking-[0.15em] uppercase">TOTAL</span>
                    <span className="font-mono text-lg">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-text-primary text-background text-xs tracking-[0.25em] font-semibold uppercase hover:bg-white transition-all disabled:opacity-50"
                >
                  {isProcessing ? "PROCESSANDO PEDIDO..." : "FINALIZAR PEDIDO"}
                </button>

                {/* Trust Badges */}
                <div className="pt-2 flex items-center justify-center space-x-6 text-[10px] tracking-wider text-text-muted uppercase">
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-text-secondary" />
                    <span>COMPRA 100% SEGURA</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5 text-text-secondary" />
                    <span>ENVIO SEGURO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
