// in: app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-expect-error TypeScript are o problemă cu tipurile versiunii beta ale Stripe
  apiVersion: '2024-04-10',
});

// Definim un tip simplu pentru item-ul din coș, așa cum vine de la client
interface CartItem {
  id: string; // Acesta este price_id
  quantity: number;
  name: string; // Îl folosim pentru mesaje de eroare
}

export async function POST(req: NextRequest) {
  try {
    const cartDetails = await req.json();

    // Folosim Object.values pentru a transforma obiectul de obiecte într-un array
    // și aplicăm tipul CartItem la fiecare element
    const cartItems: CartItem[] = Object.values(cartDetails);

    const lineItems = cartItems.map((item: CartItem) => {
      // Verificăm fiecare item
      if (!item.id || !item.id.startsWith('price_')) {
        throw new Error(`ID de preț invalid pentru produsul: ${item.name}`);
      }
      return {
        price: item.id,
        quantity: item.quantity,
      };
    });

    if (lineItems.length === 0) {
      return NextResponse.json({ error: "Coșul este gol." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      locale: 'ro',
      shipping_address_collection: {
        allowed_countries: ['RO'],
      },
    });

    return NextResponse.json(session, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Eroare la crearea sesiunii de checkout:", errorMessage);
    return NextResponse.json({ error: `Eroare internă: ${errorMessage}` }, { status: 500 });
  }
}