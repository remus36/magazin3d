import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-expect-error TypeScript are o problemă cu tipurile versiunii beta ale Stripe
  apiVersion: '2024-04-10',
});

// Definim un tip simplu pentru item-ul din coș
interface CartItem {
  id: string;
  quantity: number;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const cartDetails = await req.json();

    const lineItems = Object.values(cartDetails).map((item: any) => { // Lăsăm 'any' aici temporar, deoarece structura e complexă
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