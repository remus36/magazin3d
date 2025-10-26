// in providers/Cart.tsx
"use client";

import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

    // ADAUGĂ ACEST LOG
  console.log("--- CartProvider s-a încărcat! ---");
  console.log("Stripe Key folosită:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  // =============================
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  return (
    <USCProvider
      // --- MODIFICĂRI AICI ---
      mode="payment" // Am schimbat din 'payment'
      cartMode="client-only"
      // =========================

      shouldPersist={true}
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      successUrl={`${siteUrl}/success`}
      cancelUrl={`${siteUrl}/cancel`}
      currency="RON"
      allowedCountries={['RO']}
      billingAddressCollection={true}
    >
      {children}
    </USCProvider>
  );
}