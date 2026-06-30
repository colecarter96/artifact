"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getModelPhotoImageProps,
  getModelPhotoUrl,
} from "@/lib/model-photos";
import { getProductImageProps, hasDualViews, type Product } from "@/lib/products";

type GallerySlide = {
  key: string;
  label: string;
  src: string;
  alt: string;
  contain?: boolean;
};

type ProductGalleryProps = {
  product: Product;
  productImage: string;
  secondaryImage?: string;
  alt: string;
};

function getSlideImageProps(product: Product, slideKey: string) {
  if (slideKey === "model") return getModelPhotoImageProps(product.slug);
  if (slideKey === "product") return getProductImageProps(product.slug);
  return { className: "object-contain object-center p-8" };
}

function buildSlides(
  product: Product,
  productImage: string,
  alt: string,
  colorSecondaryImage?: string,
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
      contain: true,
    });
    const detailImage = colorSecondaryImage ?? product.secondaryImage;
    if (detailImage) {
      slides.push({
        key: "product-alt",
        label: "Product detail",
        src: detailImage,
        alt: `${alt} — detail`,
        contain: true,
      });
    }
    product.galleryImages?.forEach((src, index) => {
      slides.push({
        key: `gallery-${index}`,
        label: `Photo ${index + 2}`,
        src,
        alt: `${alt} — photo ${index + 2}`,
        contain: true,
      });
    });
  }

  return slides;
}

export function ProductGallery({
  product,
  productImage,
  secondaryImage,
  alt,
}: ProductGalleryProps) {
  const slides = useMemo(
    () => buildSlides(product, productImage, alt, secondaryImage),
    [product, productImage, alt, secondaryImage],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveIndex(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [productImage, secondaryImage]);

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
    const imageProps = slide.contain
      ? { className: "object-contain p-8" }
      : getSlideImageProps(product, slide.key);
    return (
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          {...imageProps}
          sizes="(max-width: 512px) 100vw, 480px"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-surface">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-none"
        aria-label={`${alt} — swipe to browse photos`}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            className="relative aspect-square w-full shrink-0 snap-center snap-always overflow-hidden bg-surface"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              {...(slide.contain
                ? { className: "object-contain p-8" }
                : getSlideImageProps(product, slide.key))}
              sizes="(max-width: 512px) 100vw, 480px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              aria-label={`Show ${slide.label.toLowerCase()}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-5 bg-neutral-900"
                  : "w-1 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
