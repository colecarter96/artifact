"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { DualViews } from "@/lib/products";

type ProductDualGalleryProps = {
  views: DualViews;
  alt: string;
};

const slides = [
  { key: "front", label: "Front", src: (v: DualViews) => v.front.full },
  { key: "back", label: "Back", src: (v: DualViews) => v.back.full },
] as const;

export function ProductDualGallery({ views, alt }: ProductDualGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const width = container.clientWidth;
    container.scrollTo({ left: width * index, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  function handleScroll() {
    const container = scrollRef.current;
    if (!container || container.clientWidth === 0) return;

    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(Math.min(index, slides.length - 1));
  }

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`${alt} — swipe to see front and back`}
      >
        {slides.map((slide) => (
          <div
            key={slide.key}
            className="relative aspect-square w-full shrink-0 snap-center snap-always bg-neutral-100"
          >
            <Image
              src={slide.src(views)}
              alt={`${alt} — ${slide.label.toLowerCase()}`}
              fill
              className="object-cover"
              sizes="(max-width: 512px) 100vw, 480px"
              priority={slide.key === "front"}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              activeIndex === index
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-600"
            }`}
            aria-current={activeIndex === index ? "true" : undefined}
          >
            {slide.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-neutral-500">
        Swipe left or right to view both sides
      </p>
    </div>
  );
}
