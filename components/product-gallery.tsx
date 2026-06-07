"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { getModelPhotoUrl } from "@/lib/model-photos";
import { hasDualViews, type Product } from "@/lib/products";

type GallerySlide = {
  key: string;
  label: string;
  src: string;
  alt: string;
};

type ProductGalleryProps = {
  product: Product;
  productImage: string;
  alt: string;
};

function buildSlides(
  product: Product,
  productImage: string,
  alt: string,
): GallerySlide[] {
  const slides: GallerySlide[] = [];

  const modelPhoto = getModelPhotoUrl(product.slug);
  if (modelPhoto) {
    slides.push({
      key: "model",
      label: "On model",
      src: modelPhoto,
      alt: `${alt} — on model`,
    });
  }

  if (hasDualViews(product)) {
    slides.push(
      {
        key: "front",
        label: "Front",
        src: product.views.front.full,
        alt: `${alt} — front`,
      },
      {
        key: "back",
        label: "Back",
        src: product.views.back.full,
        alt: `${alt} — back`,
      },
    );
  } else {
    slides.push({
      key: "product",
      label: "Product",
      src: productImage,
      alt,
    });
  }

  return slides;
}

export function ProductGallery({
  product,
  productImage,
  alt,
}: ProductGalleryProps) {
  const slides = useMemo(
    () => buildSlides(product, productImage, alt),
    [product, productImage, alt],
  );
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

  if (slides.length === 1) {
    const slide = slides[0];
    return (
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover"
          sizes="(max-width: 512px) 100vw, 480px"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-neutral-100">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`${alt} — swipe to browse photos`}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            className="relative aspect-square w-full shrink-0 snap-center snap-always"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 512px) 100vw, 480px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
        {slides.map((slide, index) => (
          <button
            key={slide.key}
            type="button"
            aria-label={`Show ${slide.label.toLowerCase()}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-6 bg-pink-400"
                : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
