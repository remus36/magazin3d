// in: app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inițializăm clientul Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore - Ignorăm eroarea de tip a bibliotecii pentru apiVersion
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
  try {
    const cartDetails = await req.json();
    
    // Transformăm manual coșul în formatul 'line_items' cerut de Stripe.
    // Această metodă are încredere în datele trimise de client.
    const lineItems = Object.values(cartDetails).map((item: any) => {
      // 'item.id' ar trebui să fie ID-ul prețului (price_...)
      if (!item.id || !item.id.startsWith('price_')) {
        throw new Error(`ID de preț invalid pentru produsul: ${item.name}`);
      }
      return {
        price: item.id,
        quantity: item.quantity,
      };
    });

    console.log("DEBUG: Line items trimise la Stripe:", lineItems);

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