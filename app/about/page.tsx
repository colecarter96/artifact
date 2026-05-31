import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Artifact",
  description: "About Artifact — premium cotton tees.",
};

export default function AboutPage() {
  return (
    <div className="py-6">
      <Link
        href="/"
        className="mb-6 inline-flex text-xs text-neutral-500 hover:text-neutral-900"
      >
        ← Back to shop
      </Link>
      <h1 className="text-2xl font-semibold">About Artifact</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-600">
        <p>
          Artifact makes premium cotton tees with a focus on fit, fabric, and
          longevity. Every shirt is 100% cotton, garment-dyed or washed for
          character, and cut with a true unisex fit.
        </p>
        <p>
          We ship free worldwide from our studio. No accounts required — just
          pick your size and color, and checkout when you&apos;re ready.
        </p>
        <p>
          Questions? Reach us at{" "}
          <a
            href="mailto:the.twobrothers.studios@gmail.com"
            className="text-neutral-900 underline"
          >
            hello@artifact.store
          </a>
          .
        </p>
      </div>
    </div>
  );
}
