"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, ProductSize } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/product/ProductCard";
import {
  ChevronDown,
  ChevronUp,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Share2,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.availableSizes[0] || product.sizes[0]
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Padrão"
  );
  const [isCopied, setIsCopied] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>("medidas");

  // Shipping simulation state
  const [cep, setCep] = useState("");
  const [shippingResult, setShippingResult] = useState<
    { name: string; price: number; days: string }[] | null
  >(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, selectedColor);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, "").length === 8) {
      setIsCalculatingShipping(true);
      setTimeout(() => {
        setIsCalculatingShipping(false);
        setShippingResult([
          { name: "PAC Expresso", price: 18.9, days: "4 a 6 dias úteis" },
          { name: "SEDEX Premium", price: 32.5, days: "1 a 2 dias úteis" },
        ]);
      }, 500);
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-[#0C1014] text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-[11px] tracking-[0.18em] uppercase text-text-muted">
          <Link href="/" className="hover:text-text-primary transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-text-primary transition-colors">
            SHOP
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-text-primary transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-text-secondary truncate max-w-[150px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 sm:w-20 aspect-[3/4] overflow-hidden bg-[#121610] flex-shrink-0 border transition-all ${
                    selectedImageIndex === idx
                      ? "border-text-primary opacity-100"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                  aria-label={`Ver foto ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} miniatura ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Large Featured Image */}
            <div className="flex-1 relative aspect-[3/4] bg-[#121610] overflow-hidden">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Product Buy Box & Details */}
          <div className="lg:col-span-5 flex flex-col space-y-7">
            {/* Title & Collection */}
            <div className="space-y-2 border-b border-[#1C242B] pb-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.28em] uppercase text-brand-blueMuted font-mono">
                  {product.collection} • {product.category}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1 text-[11px] tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Compartilhar link do produto"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isCopied ? "LINK COPIADO!" : "COMPARTILHAR"}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-4xl font-light tracking-[0.16em] uppercase text-text-primary">
                {product.name}
              </h1>

              {/* Price */}
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-xl sm:text-2xl font-mono text-text-primary font-medium">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-text-muted">
                  ou 3x de {formatPrice(product.price / 3)} sem juros
                </span>
              </div>

              {product.subtitle && (
                <p className="text-xs tracking-[0.12em] uppercase text-text-secondary pt-1 leading-relaxed">
                  {product.subtitle}
                </p>
              )}
            </div>

            {/* Color Selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs tracking-[0.18em] uppercase text-text-secondary">
                <span>
                  COR: <strong className="text-text-primary">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group relative flex items-center space-x-2 px-3 py-1.5 border text-xs tracking-wider uppercase transition-all ${
                      selectedColor === c.name
                        ? "border-text-primary bg-[#161B1F] text-text-primary"
                        : "border-[#1C242B] text-text-secondary hover:border-text-primary"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/20 inline-block"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs tracking-[0.18em] uppercase text-text-secondary">
                <span>
                  TAMANHO: <strong className="text-text-primary">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setOpenAccordion("medidas")}
                  className="inline-flex items-center space-x-1 text-[11px] text-text-muted hover:text-text-primary underline tracking-wider uppercase"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>GUIA DE MEDIDAS</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isAvailable = product.availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-mono border transition-all text-center ${
                        selectedSize === size
                          ? "border-text-primary bg-text-primary text-background font-bold"
                          : isAvailable
                          ? "border-[#1C242B] text-text-primary hover:border-text-primary"
                          : "border-[#1C242B]/30 text-text-muted/30 cursor-not-allowed line-through"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Add to Cart + Buy Now */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 bg-text-primary text-background text-xs tracking-[0.25em] font-semibold uppercase hover:bg-white transition-all duration-300"
              >
                ADICIONAR À SACOLA
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-4 border border-[#2B353E] hover:border-text-primary text-text-primary text-xs tracking-[0.25em] font-semibold uppercase transition-all duration-300"
              >
                COMPRAR AGORA
              </button>
            </div>

            {/* Shipping Calculator */}
            <div className="pt-2 border-t border-[#1C242B]">
              <form onSubmit={handleCalculateShipping} className="space-y-2">
                <label className="text-[11px] tracking-[0.18em] uppercase text-text-secondary block">
                  CALCULAR FRETE E PRAZO
                </label>
                <div className="flex">
                  <input
                    type="text"
                    maxLength={9}
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="flex-1 bg-[#121610] border border-[#1C242B] px-3 py-2 text-xs font-mono text-text-primary focus:outline-none focus:border-text-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 border border-l-0 border-[#1C242B] bg-[#161B1F] text-xs tracking-wider uppercase text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {isCalculatingShipping ? "..." : "CALCULAR"}
                  </button>
                </div>
              </form>

              {shippingResult && (
                <div className="mt-3 space-y-1.5 p-3 bg-[#121610] border border-[#1C242B] text-xs">
                  {shippingResult.map((res, i) => (
                    <div key={i} className="flex justify-between items-center text-text-secondary">
                      <span>
                        {res.name} ({res.days})
                      </span>
                      <strong className="text-text-primary font-mono">
                        {formatPrice(res.price)}
                      </strong>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion Tabs */}
            <div className="divide-y divide-[#1C242B] border-t border-b border-[#1C242B] pt-1">
              {/* Tab 1: Guia de Medidas */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion("medidas")}
                  className="w-full flex items-center justify-between text-xs tracking-[0.2em] uppercase font-medium text-text-primary hover:text-text-secondary transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Ruler className="w-4 h-4 text-text-muted" />
                    <span>GUIA DE MEDIDAS (CM)</span>
                  </span>
                  {openAccordion === "medidas" ? (
                    <ChevronUp className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                {openAccordion === "medidas" && (
                  <div className="mt-4 overflow-x-auto text-xs animate-fade-in">
                    <table className="w-full text-left font-mono border-collapse">
                      <thead>
                        <tr className="border-b border-[#1C242B] text-text-muted text-[10px] tracking-widest">
                          <th className="py-1.5">TAM</th>
                          <th className="py-1.5">TÓRAX</th>
                          <th className="py-1.5">COMPRIMENTO</th>
                          <th className="py-1.5">MANGA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C242B]/50 text-text-secondary">
                        {product.measurements.map((m) => (
                          <tr
                            key={m.size}
                            className={m.size === selectedSize ? "text-text-primary font-bold bg-[#161B1F]/50" : ""}
                          >
                            <td className="py-2">{m.size}</td>
                            <td className="py-2">{m.chest} cm</td>
                            <td className="py-2">{m.length} cm</td>
                            <td className="py-2">{m.sleeve} cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-2 text-[10px] tracking-wider uppercase text-text-muted">
                      *Medidas lineares da peça fora do corpo. Pode haver variação de até 1.5 cm.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 2: Descrição */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion("descricao")}
                  className="w-full flex items-center justify-between text-xs tracking-[0.2em] uppercase font-medium text-text-primary hover:text-text-secondary transition-colors"
                >
                  <span>DESCRIÇÃO</span>
                  {openAccordion === "descricao" ? (
                    <ChevronUp className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                {openAccordion === "descricao" && (
                  <div className="mt-3 text-xs tracking-[0.1em] text-text-secondary leading-relaxed space-y-2 animate-fade-in">
                    <p>{product.description}</p>
                    <p className="text-[11px] text-text-muted pt-1">
                      Caimento: <strong>{product.fit}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 3: Detalhes & Composição */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion("detalhes")}
                  className="w-full flex items-center justify-between text-xs tracking-[0.2em] uppercase font-medium text-text-primary hover:text-text-secondary transition-colors"
                >
                  <span>DETALHES & COMPOSIÇÃO</span>
                  {openAccordion === "detalhes" ? (
                    <ChevronUp className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                {openAccordion === "detalhes" && (
                  <div className="mt-3 space-y-2 text-xs text-text-secondary animate-fade-in">
                    <p className="font-semibold text-text-primary">
                      {product.composition}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-text-secondary text-[11px] tracking-wide">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tab 4: Envio & Prazos */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion("envio")}
                  className="w-full flex items-center justify-between text-xs tracking-[0.2em] uppercase font-medium text-text-primary hover:text-text-secondary transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-text-muted" />
                    <span>ENVIO & PRAZOS</span>
                  </span>
                  {openAccordion === "envio" ? (
                    <ChevronUp className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                {openAccordion === "envio" && (
                  <div className="mt-3 text-xs tracking-[0.1em] text-text-secondary leading-relaxed space-y-2 animate-fade-in">
                    <p>
                      Despachamos em até 24 a 48 horas úteis após a confirmação do pagamento.
                    </p>
                    <p>
                      Rastreamento completo enviado por e-mail e WhatsApp. Frete grátis para todo o Brasil em compras acima de R$ 399.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 5: Trocas & Devoluções */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion("trocas")}
                  className="w-full flex items-center justify-between text-xs tracking-[0.2em] uppercase font-medium text-text-primary hover:text-text-secondary transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <RotateCcw className="w-4 h-4 text-text-muted" />
                    <span>TROCAS E DEVOLUÇÕES</span>
                  </span>
                  {openAccordion === "trocas" ? (
                    <ChevronUp className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                {openAccordion === "trocas" && (
                  <div className="mt-3 text-xs tracking-[0.1em] text-text-secondary leading-relaxed space-y-2 animate-fade-in">
                    <p>
                      Primeira troca 100% gratuita em até 7 dias corridos após o recebimento.
                    </p>
                    <p>
                      A peça deve estar sem uso, com as tags originais e embalagem preservada.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 sm:mt-36 pt-12 border-t border-[#1C242B]">
            <div className="mb-10 sm:mb-12">
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-text-muted">
                COMPLETE SEU VISUAL
              </span>
              <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] uppercase text-text-primary mt-1">
                PRODUTOS RELACIONADOS
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
