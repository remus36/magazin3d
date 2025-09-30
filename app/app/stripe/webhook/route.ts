// in: app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from 'contentful-management';

// Inițializăm clientul Stripe cu cheia secretă
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

// Inițializăm clientul de management Contentful
const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!, // ATENȚIE: Token diferit!
});

// Endpoint secret pentru webhook-ul de la Stripe
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    // Verificăm dacă request-ul vine de la Stripe
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Gestionăm evenimentul 'price.created' sau 'price.updated'
    if (event.type === 'price.created' || event.type === 'price.updated') {
      const price = event.data.object as Stripe.Price;
      const productId = price.product as string;

      // Preluăm detaliile complete ale produsului din Stripe pentru a accesa metadata
      const product = await stripe.products.retrieve(productId);
      const contentfulId = product.metadata.contentful_id;

      if (contentfulId) {
        console.log(`Sincronizare: Stripe Price ID ${price.id} pentru Contentful Entry ID ${contentfulId}`);

        const spaceId = process.env.CONTENTFUL_SPACE_ID!;
        const environmentId = 'master'; // De obicei este 'master'

        // Actualizăm intrarea în Contentful
        const space = await contentfulClient.getSpace(spaceId);
        const environment = await space.getEnvironment(environmentId);
        const entry = await environment.getEntry(contentfulId);

        // Setăm noul ID de preț
        entry.fields.stripePriceId = { 'en-US': price.id }; // Asigură-te că 'en-US' este localizarea ta principală

        // Salvăm și publicăm modificările
        const updatedEntry = await entry.update();
        await updatedEntry.publish();

        console.log("Intrarea din Contentful a fost actualizată și publicată cu succes!");
      }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error("Eroare în webhook-ul Stripe:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}