import React from "react";
import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Finalizar Pedido",
  description:
    "Finalize seu pedido com segurança e rapidez na NADA MELHOR ©. Pagamento via PIX com desconto ou Cartão de Crédito.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
