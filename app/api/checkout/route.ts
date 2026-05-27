import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Coșul este gol." }, { status: 400 });
    }

    // Construim line items folosind stripePriceId din Sanity
    // Aceasta e abordarea cea mai curată — prețurile sunt deja definite în Stripe Dashboard
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: { stripePriceId: string; quantity: number }) => ({
        price: item.stripePriceId, // ID-ul prețului din Stripe Dashboard
        quantity: item.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/comanda-confirmata?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      locale: "ro",
      shipping_address_collection: {
        allowed_countries: ["RO"],
      },
      // Opțional: colectează email-ul clientului
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Eroare la procesarea plății. Încearcă din nou." },
      { status: 500 }
    );
  }
}