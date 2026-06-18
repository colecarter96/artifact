"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { promoMessages } from "@/lib/promos";

const separator = "   ·   ";
const marqueeContent = promoMessages.join(separator) + separator;

export function PromoBar() {
  const copyRef = useRef<HTMLSpanElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;

    const update = () => {
      setLoopWidth(el.getBoundingClientRect().width);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("load", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", update);
    };
  }, []);

  return (
    <div
      className="bg-brand text-xs font-medium tracking-normal text-brand-foreground sm:text-sm"
      role="region"
      aria-label="Store highlights"
    >
      <p className="sr-only">{promoMessages.join(". ")}</p>
      <div className="flex min-h-7 items-center overflow-hidden py-1" aria-hidden="true">
        <div
          className={`promo-marquee-track flex w-max whitespace-nowrap ${
            loopWidth > 0 ? "promo-marquee-track-active" : ""
          }`}
          style={
            loopWidth > 0
              ? ({ "--marquee-distance": `${loopWidth}px` } as CSSProperties)
              : undefined
          }
        >
          <span ref={copyRef} className="shrink-0 px-6">
            {marqueeContent}
          </span>
          <span className="shrink-0 px-6">{marqueeContent}</span>
        </div>
      </div>
    </div>
  );
}
