import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { UIProvider } from "@/lib/ui-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchModal } from "@/components/layout/SearchModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-editorial",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0C1014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nadamelhor.com.br"),
  title: {
    default: "NADA MELHOR © | Streetwear & Moda Contemporânea",
    template: "%s | NADA MELHOR ©",
  },
  description:
    "Marca autoral de streetwear e moda contemporânea. Silhuetas precisas, fotografia editorial e estética cinematográfica.",
  keywords: [
    "Nada Melhor",
    "streetwear",
    "moda contemporânea",
    "roupas",
    "editorial",
    "drop 01",
    "heavyweight cotton",
    "lifestyle",
  ],
  authors: [{ name: "NADA MELHOR ©" }],
  creator: "NADA MELHOR ©",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://nadamelhor.com.br",
    title: "NADA MELHOR © | Streetwear & Moda Contemporânea",
    description:
      "Marca autoral de streetwear e moda contemporânea. Silhuetas precisas, fotografia editorial e estética cinematográfica.",
    siteName: "NADA MELHOR ©",
    images: [
      {
        url: "/images/hero-editorial.jpg",
        width: 1200,
        height: 630,
        alt: "NADA MELHOR © Lookbook Editorial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NADA MELHOR ©",
    description: "Streetwear e moda contemporânea autoral.",
    images: ["/images/hero-editorial.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NADA MELHOR",
    url: "https://nadamelhor.com.br",
    logo: "https://nadamelhor.com.br/images/hero-editorial.jpg",
    sameAs: ["https://www.instagram.com/nadamelh0r/"],
    description: "Marca autoral de streetwear e moda contemporânea brasileira.",
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-background text-text-primary font-sans selection:bg-brand-greenMuted selection:text-text-primary antialiased min-h-screen flex flex-col justify-between">
        <CartProvider>
          <UIProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <CartDrawer />
            <MobileMenu />
            <SearchModal />
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
