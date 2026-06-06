import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/save-subscriber";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };

    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const result = await saveSubscriber(body.email);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
