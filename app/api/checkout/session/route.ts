import { NextResponse } from "next/server";
import { parseCheckoutMetadata } from "@/lib/checkout-metadata";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing checkout session." },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      email: session.customer_details?.email ?? null,
      items: parseCheckoutMetadata(session.metadata ?? undefined),
    });
  } catch (error) {
    console.error("Stripe session lookup error:", error);
    return NextResponse.json(
      { error: "Could not load order details." },
      { status: 500 },
    );
  }
}
