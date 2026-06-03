"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { DualViews } from "@/lib/products";

type ProductDualGridImageProps = {
  views: DualViews;
  alt: string;
  className?: string;
};

export function ProductDualGridImage({
  views,
  alt,
  className = "",
}: ProductDualGridImageProps) {
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setShowBack((prev) => !prev);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={`relative aspect-square overflow-hidden bg-neutral-100 ${className}`}>
      <Image
        src={views.front.grid}
        alt={`${alt} — front`}
        fill
        className={`object-cover transition-opacity duration-500 ${
          showBack ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 512px) 50vw, 240px"
      />
      <Image
        src={views.back.grid}
        alt={`${alt} — back`}
        fill
        className={`object-cover transition-opacity duration-500 ${
          showBack ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 512px) 50vw, 240px"
      />
      <span className="sr-only" aria-live="polite">
        {showBack ? "Showing back" : "Showing front"}
      </span>
    </div>
  );
}
