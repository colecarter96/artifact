import { NextResponse } from "next/server";
import { buildCheckoutMetadata } from "@/lib/checkout-metadata";
import type { CartLine } from "@/lib/cart";
import { isProductCheckoutReady, products } from "@/lib/products";
import { SHIPPING_COUNTRIES } from "@/lib/shipping-countries";
import { getStripe } from "@/lib/stripe";

type CheckoutItem = Pick<
  CartLine,
  "productId" | "slug" | "name" | "colorName" | "size" | "quantity"
>;

type CheckoutRequest = {
  items: CheckoutItem[];
};

function getOrigin(request: Request): string {
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  return host ? `${protocol}://${host}` : "http://localhost:3000";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Your bag is empty." },
        { status: 400 },
      );
    }

    const productById = new Map(products.map((product) => [product.id, product]));
    const lineItems: { price: string; quantity: number }[] = [];
    const metadataItems: {
      name: string;
      color: string;
      size: string;
      quantity: number;
    }[] = [];

    for (const item of body.items) {
      if (
        !item.productId ||
        !item.slug ||
        !item.name ||
        !item.colorName ||
        !item.size ||
        typeof item.quantity !== "number" ||
        item.quantity < 1 ||
        item.quantity > 99
      ) {
        return NextResponse.json(
          { error: "Invalid cart item." },
          { status: 400 },
        );
      }

      const product = productById.get(item.productId);

      if (!product || product.slug !== item.slug) {
        return NextResponse.json(
          { error: "Unknown product in bag." },
          { status: 400 },
        );
      }

      if (!isProductCheckoutReady(product)) {
        return NextResponse.json(
          {
            error: `${product.name} isn't available for checkout yet. Remove it from your bag or try another style.`,
          },
          { status: 400 },
        );
      }

      lineItems.push({
        price: product.stripePriceId!,
        quantity: item.quantity,
      });

      metadataItems.push({
        name: item.name,
        color: item.colorName,
        size: item.size,
        quantity: item.quantity,
      });
    }

    const stripe = getStripe();
    const origin = getOrigin(request);

    const freeShippingRateId = process.env.STRIPE_FREE_SHIPPING_RATE_ID;
    const shippingRateId =
      freeShippingRateId ?? process.env.STRIPE_SHIPPING_RATE_ID;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: SHIPPING_COUNTRIES,
      },
      phone_number_collection: {
        enabled: true,
      },
      ...(shippingRateId
        ? {
            shipping_options: [{ shipping_rate: shippingRateId }],
          }
        : {}),
      allow_promotion_codes: true,
      metadata: buildCheckoutMetadata(metadataItems),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Could not start checkout." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed. Please try again." },
      { status: 500 },
    );
  }
}
