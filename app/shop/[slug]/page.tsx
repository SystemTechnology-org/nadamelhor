import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produto não encontrado",
    };
  }

  return {
    title: `${product.name} | ${product.collection}`,
    description: product.subtitle || product.description,
    openGraph: {
      title: `${product.name} | NADA MELHOR ©`,
      description: product.subtitle || product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 1067,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  // Schema.org Product structured data
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => `https://nadamelhor.com.br${img}`),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "NADA MELHOR",
    },
    offers: {
      "@type": "Offer",
      url: `https://nadamelhor.com.br/shop/${product.slug}`,
      priceCurrency: "BRL",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
