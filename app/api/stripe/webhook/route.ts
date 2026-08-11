import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature') as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name || 'Client';
      const orderId = session.id;
      const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';

      if (customerEmail) {
        try {
          await resend.emails.send({
            from: 'PrintDreamsIn3D <onboarding@resend.dev>',
            to: customerEmail,
            subject: 'Comanda confirmata - PrintDreamsIn3D',
            html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#111827;color:#fff;padding:40px;border-radius:12px"><h1 style="color:#22d3ee">Comanda Confirmata!</h1><p style="color:#9ca3af">Multumim, ${customerName}!</p><div style="background:#1f2937;border:1px solid #374151;border-radius:8px;padding:24px;margin:24px 0"><p style="color:#9ca3af;font-size:14px">ID Comanda</p><p style="font-family:monospace;color:#22d3ee;font-size:13px">${orderId}</p><hr style="border-color:#374151;margin:16px 0"/><p style="color:#9ca3af;font-size:14px">Total platit</p><p style="font-size:24px;font-weight:bold">${amountTotal} RON</p></div><p style="color:#9ca3af">Comanda va fi procesata in 1-3 zile lucratoare.</p><div style="margin-top:32px;padding-top:24px;border-top:1px solid #374151"><p style="color:#6b7280;font-size:13px">Intrebari? <a href="mailto:dreamprints.creations@gmail.com" style="color:#22d3ee">dreamprints.creations@gmail.com</a></p></div></div>`,
          });
        } catch (e) { console.error('Email client error:', e); }
      }

      try {
        await resend.emails.send({
          from: 'PrintDreamsIn3D <onboarding@resend.dev>',
          to: 'dreamprints.creations@gmail.com',
          subject: `Comanda noua: ${amountTotal} RON de la ${customerName}`,
          html: `<div style="font-family:Arial,sans-serif"><h2>Comanda noua!</h2><p><b>Client:</b> ${customerName}</p><p><b>Email:</b> ${customerEmail || 'N/A'}</p><p><b>Total:</b> ${amountTotal} RON</p><p><b>ID:</b> <code>${orderId}</code></p></div>`,
        });
      } catch (e) { console.error('Email owner error:', e); }

      console.log(`Comanda: ${orderId} — ${amountTotal} RON`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Eroare webhook Stripe:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}