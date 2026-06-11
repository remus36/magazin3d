// app/api/sanity-webhook/route.ts
// Primit webhook de la Sanity → creaza produs in Stripe → salveaza Price ID inapoi in Sanity

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createHmac } from 'crypto';
import { createClient } from '@sanity/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Verifica semnatura webhook-ului Sanity
function isValidSignature(body: string, signature: string, secret: string): boolean {
  const hash = createHmac('sha256', secret).update(body).digest('hex');
  return hash === signature;
}

export async function POST(req: NextRequest) {
  // 1. Citim body-ul ca text pentru verificarea semnaturii
  const body = await req.text();
  const signature = req.headers.get('sanity-webhook-signature') ?? '';
  const secret = process.env.SANITY_WEBHOOK_SECRET ?? '';

  // 2. Verificam semnatura daca e configurata
  if (secret && signature) {
    // Sanity trimite semnatura in formatul "t=timestamp,v1=hash"
    const signaturePart = signature.split(',').find(s => s.startsWith('v1='))?.replace('v1=', '') ?? '';
    if (signaturePart && !isValidSignature(body, signaturePart, secret)) {
      return NextResponse.json({ error: 'Semnatura invalida' }, { status: 401 });
    }
  }

  // 3. Parsam payload-ul
  let payload: any;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Body invalid' }, { status: 400 });
  }

  const doc = payload;

  // 4. Procesam doar documente de tip 'product'
  if (!doc || doc._type !== 'product') {
    return NextResponse.json({ message: 'Nu e produs, ignorat' });
  }

  // 5. Daca are deja stripePriceId, nu facem nimic
  if (doc.stripePriceId) {
    return NextResponse.json({ message: 'Produsul are deja Stripe Price ID, ignorat' });
  }

  // 6. Daca nu are pret sau nume, nu putem crea in Stripe
  if (!doc.pret || !doc.nume) {
    return NextResponse.json({ message: 'Produs fara pret sau nume, ignorat' });
  }

  try {
    // 7. Cream produsul in Stripe
    const stripeProduct = await stripe.products.create({
      name: doc.nume,
      description: doc.descriereScurta ?? undefined,
      metadata: { sanity_id: doc._id },
    });

    // 8. Cream pretul in Stripe (RON, in bani - lei * 100)
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(doc.pret * 100),
      currency: 'ron',
    });

    // 9. Salvam Price ID-ul inapoi in Sanity
    await sanityWriteClient
      .patch(doc._id)
      .set({ stripePriceId: stripePrice.id })
      .commit();

    console.log(`✅ Produs creat in Stripe: ${doc.nume} → ${stripePrice.id}`);

    return NextResponse.json({
      success: true,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    });
  } catch (error) {
    console.error('Eroare la crearea produsului in Stripe:', error);
    return NextResponse.json(
      { error: 'Eroare la Stripe' },
      { status: 500 }
    );
  }
}
