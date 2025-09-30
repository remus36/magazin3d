"use client"; // Acest provider trebuie să ruleze pe client

import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      
      // === LINIA ADĂUGATĂ ===
      // Îi spunem explicit să salveze coșul în localStorage.
      // Când un utilizator revine pe site, produsele vor fi tot în coș.
      shouldPersist={true}
      // =======================

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