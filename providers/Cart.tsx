"use client"; // Acest provider trebuie să ruleze pe client

import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Preluăm URL-ul de bază din variabilele de mediu
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      
      // Construim URL-urile folosind variabila de mediu, fără 'window'
      successUrl={`${siteUrl}/success`}
      cancelUrl={`${siteUrl}/?canceled=true`}
      
      currency="RON"
      allowedCountries={['RO']}
      billingAddressCollection={true}
    >
      {children}
    </USCProvider>
  );
}