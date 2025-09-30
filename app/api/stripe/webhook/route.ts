// in: app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
// Presupunând că ai creat acest client, așa cum am discutat
// import { sanityAdminClient } from '@/lib/sanityAdminClient'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature') as string; // Tipăm explicit ca string
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      // Corecția 1: Tipăm eroarea ca 'Error'
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    if (event.type === 'product.created') {
        const product = event.data.object as Stripe.Product;
        // ... logica ta ...
    }
    
    if (event.type === 'price.created' || event.type === 'price.updated') {
        const price = event.data.object as Stripe.Price;
        // ... logica ta ...
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    // Corecția 2: Tipăm eroarea ca 'Error' și aici
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Eroare în webhook-ul Stripe:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}