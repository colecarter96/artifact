"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/hero-slides";
import { getModelPhotoImageProps } from "@/lib/model-photos";

const ROTATE_MS = 2000;

export function ShopHeroModel() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="mb-8" aria-label="Featured on model">
      <div className="relative h-[70vh] min-h-[300px] max-h-[560px] overflow-hidden rounded-2xl bg-neutral-950">
        {heroSlides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.slug}
              className={`absolute inset-0 ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!active}
            >
              <Image
                src={s.image}
                alt={s.name}
                fill
                priority={i === 0}
                quality={92}
                sizes="(max-width: 512px) 100vw, 512px"
                {...getModelPhotoImageProps(s.slug)}
              />
            </div>
          );
        })}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
          aria-hidden
        />

        <Link
          href={`/products/${slide.slug}`}
          className="group absolute inset-0 z-10 flex flex-col justify-end px-4 pb-14 pt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Free Shipping
          </p>
          <h1 className="mt-1 max-w-[18ch] text-2xl font-extrabold leading-tight text-white sm:text-[1.65rem]">
            {slide.name}
          </h1>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white/90 transition group-hover:text-white">
            View
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>

        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5 px-4">
          {heroSlides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              aria-label={`Show ${s.name}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-pink-400"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
