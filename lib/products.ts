import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    slug: "camiseta-drop-01",
    name: "Camiseta Drop 01",
    subtitle: "Modelagem boxy em algodão pesado com lavagem mineral grafite",
    price: 189.0,
    category: "camisetas",
    collection: "DROP 01",
    drop: "DROP 01",
    images: [
      "/images/tshirt-1-front.jpg",
      "/images/tshirt-1-back.jpg",
      "/images/hero-editorial.jpg",
    ],
    colors: [
      { name: "Grafite Mineral", hex: "#231F14" },
      { name: "Preto Fumo", hex: "#0C1014" },
    ],
    sizes: ["P", "M", "G", "GG"],
    availableSizes: ["P", "M", "G", "GG"],
    description:
      "Desenvolvida com corte boxy contemporâneo e ombros estruturados. Confeccionada em malha pesada fio 20.1 penteado com toque macio e caimento encorpado. Tingimento reativo com processo de lavagem especial que confere aspecto mineral único.",
    details: [
      "100% algodão nacional de alta gramatura (240g/m²)",
      "Gola canelada grossa de 3cm com reforço ombro a ombro",
      "Costura dupla reforçada nas barras e cavas",
      "Tingimento com acabamento estonado artesanal",
      "Etiqueta interna termocolante para máximo conforto",
    ],
    composition: "100% Algodão Penteado Heavyweight 240g/m²",
    fit: "Boxy / Relaxed fit (ombros ligeiramente caídos e comprimento equilibrado)",
    isNew: true,
    isFeatured: true,
    isDrop: true,
    measurements: [
      { size: "P", chest: 56, length: 72, sleeve: 23 },
      { size: "M", chest: 59, length: 74, sleeve: 24 },
      { size: "G", chest: 62, length: 76, sleeve: 25 },
      { size: "GG", chest: 65, length: 78, sleeve: 26 },
    ],
  },
  {
    id: "prod-02",
    slug: "camiseta-essential",
    name: "Camiseta Essential",
    subtitle: "Silhueta clássica atemporal em tom terra escuro lavado",
    price: 179.0,
    category: "camisetas",
    collection: "DROP 01",
    drop: "DROP 01",
    images: [
      "/images/tshirt-2-front.jpg",
      "/images/tshirt-2-back.jpg",
      "/images/about-editorial.jpg",
    ],
    colors: [
      { name: "Terra Escuro", hex: "#302A20" },
      { name: "Grafite", hex: "#231F14" },
    ],
    sizes: ["P", "M", "G", "GG"],
    availableSizes: ["P", "M", "G"],
    description:
      "A base de qualquer composição urbana. Uma camiseta de peso intermediário a encorpado em pigmento terroso com desgaste controlado. Desenvolvida para resistir ao tempo sem perder a estrutura.",
    details: [
      "100% algodão pré-encolhido fio 24.1",
      "Modelagem levemente solta ao corpo",
      "Toque suave e caimento vertical natural",
      "Lavanderia industrial com amaciamento enzimático",
    ],
    composition: "100% Algodão Premium 220g/m²",
    fit: "Oversized moderado",
    isNew: true,
    isFeatured: true,
    isDrop: true,
    measurements: [
      { size: "P", chest: 55, length: 71, sleeve: 22 },
      { size: "M", chest: 58, length: 73, sleeve: 23 },
      { size: "G", chest: 61, length: 75, sleeve: 24 },
      { size: "GG", chest: 64, length: 77, sleeve: 25 },
    ],
  },
  {
    id: "prod-03",
    slug: "moletom-drop-01",
    name: "Moletom Drop 01",
    subtitle: "Heavyweight hoodie sem cordão com capuz estruturado duplo",
    price: 389.0,
    category: "moletons",
    collection: "DROP 01",
    drop: "DROP 01",
    images: [
      "/images/hoodie-1-front.jpg",
      "/images/hoodie-1-back.jpg",
      "/images/hero-editorial.jpg",
    ],
    colors: [
      { name: "Carvão Fumo", hex: "#121610" },
      { name: "Grafite Escuro", hex: "#231F14" },
    ],
    sizes: ["P", "M", "G", "GG"],
    availableSizes: ["P", "M", "G", "GG"],
    description:
      "Moletom 3 cabos de altíssima densidade estruturado para o clima urbano e natural. Capuz amplo com dupla camada sem ilhoses ou cordões aparentes, mantendo a frente limpa e arquitetônica.",
    details: [
      "Moletom 3 cabos 400g/m² felpado interno",
      "Punhos e barra em ribana pesada 2x1 com elastano",
      "Bolso canguru embutido com reforço de costura travete",
      "Zero encolhimento pós-lavagem",
    ],
    composition: "80% Algodão, 20% Poliéster de Alta Densidade (400g/m²)",
    fit: "Oversized estruturado (boxy e denso)",
    isNew: true,
    isFeatured: true,
    isDrop: true,
    measurements: [
      { size: "P", chest: 62, length: 70, sleeve: 63 },
      { size: "M", chest: 65, length: 72, sleeve: 64 },
      { size: "G", chest: 68, length: 74, sleeve: 65 },
      { size: "GG", chest: 71, length: 76, sleeve: 66 },
    ],
  },
  {
    id: "prod-04",
    slug: "calca-cargo-carpenter",
    name: "Calça Cargo Carpenter",
    subtitle: "Sarja pesada em corte reto amplo com bolsos utilitários discretos",
    price: 349.0,
    category: "calcas",
    collection: "DROP 01",
    drop: "DROP 01",
    images: [
      "/images/pants-1-front.jpg",
      "/images/pants-1-front.jpg",
      "/images/drop-campaign.jpg",
    ],
    colors: [
      { name: "Verde Ardósia", hex: "#454534" },
      { name: "Azul Acinzentado", hex: "#526680" },
    ],
    sizes: ["P", "M", "G", "GG"],
    availableSizes: ["P", "M", "G", "GG"],
    description:
      "Construída em sarja peletizada 100% algodão de alta resistência. O corte reto amplo oferece liberdade de movimento e volume contemporâneo sobre o calçado, com bolsos laterais funcionais e discretos.",
    details: [
      "Sarja pesada 100% algodão 320g/m²",
      "Bolsos cargo embutidos com lapela oculta",
      "Passantes duplos reforçados para cinto",
      "Fechamento com botão em metal oxidado e zíper YKK",
      "Ajuste interno na barra",
    ],
    composition: "100% Algodão Sarja Peletizada",
    fit: "Wide leg / Relaxed straight",
    isNew: false,
    isFeatured: true,
    isDrop: true,
    measurements: [
      { size: "P", chest: 40, length: 104, sleeve: 24 },
      { size: "M", chest: 42, length: 106, sleeve: 25 },
      { size: "G", chest: 44, length: 108, sleeve: 26 },
      { size: "GG", chest: 46, length: 110, sleeve: 27 },
    ],
  },
  {
    id: "prod-05",
    slug: "bone-dad-hat-essential",
    name: "Boné Dad Hat Essential",
    subtitle: "Sarja lavada com fivela traseira em latão envelhecido",
    price: 149.0,
    category: "acessorios",
    collection: "ESSENTIALS",
    drop: "ESSENTIALS",
    images: [
      "/images/cap-1-front.jpg",
      "/images/cap-1-front.jpg",
    ],
    colors: [
      { name: "Preto Lavado", hex: "#231F14" },
    ],
    sizes: ["M"],
    availableSizes: ["M"],
    description:
      "Boné 6 gomos desestruturado em sarja peletizada com lavagem vintage. Aba curvada com proporção precisa e regulagem traseira em fita do próprio tecido com fivela metálica envelhecida.",
    details: [
      "Sarja 100% algodão desgastada",
      "Copa desestruturada de perfil baixo (low-profile)",
      "Fecho traseiro em metal ouro velho",
      "Forro interno frontal e fita atoalhada antitranspirante",
    ],
    composition: "100% Algodão",
    fit: "Tamanho único ajustável",
    isNew: true,
    isFeatured: false,
    isDrop: false,
    measurements: [
      { size: "M", chest: 58, length: 12, sleeve: 7 },
    ],
  },
  {
    id: "prod-06",
    slug: "camiseta-nada-melhor",
    name: "Camiseta Nada Melhor",
    subtitle: "Peça assinatura com tipografia bordada sutil tom sobre tom",
    price: 199.0,
    category: "camisetas",
    collection: "DROP 01",
    drop: "DROP 01",
    images: [
      "/images/tshirt-1-front.jpg",
      "/images/tshirt-1-back.jpg",
      "/images/drop-campaign.jpg",
    ],
    colors: [
      { name: "Carvão Noturno", hex: "#0C1014" },
      { name: "Verde Musgo", hex: "#454534" },
    ],
    sizes: ["P", "M", "G", "GG"],
    availableSizes: ["P", "M", "G", "GG"],
    description:
      "A representação máxima da estética NADA MELHOR. Confeccionada em algodão pesado com caimento arquitetônico e acabamento artesanal. Um clássico imediato pensado para uso diário rigoroso.",
    details: [
      "Algodão sustentável pesado 240g/m²",
      "Bordado de alta precisão em linha fosca no peito esquerdo",
      "Costuras reforçadas e ombros ampliados",
      "Lavagem mineral exclusiva",
    ],
    composition: "100% Algodão Penteado",
    fit: "Boxy fit autoral",
    isNew: true,
    isFeatured: true,
    isDrop: true,
    measurements: [
      { size: "P", chest: 56, length: 72, sleeve: 23 },
      { size: "M", chest: 59, length: 74, sleeve: 24 },
      { size: "G", chest: 62, length: 76, sleeve: 25 },
      { size: "GG", chest: 65, length: 78, sleeve: 26 },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured);
}

export function getDropProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isDrop);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== currentId).slice(0, limit);
}
