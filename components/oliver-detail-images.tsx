"use client";

import { useEffect, useState } from "react";

const OLIVER_DETAIL_IMAGES = [
  "/sunglasses/JMM/jmmImg.avif",
  "/sunglasses/JMM/jmmImg2.avif",
];

export function OliverDetailImages() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!activeSrc) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSrc(null);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeSrc]);

  return (
    <>
      <div className="flex gap-2">
        {OLIVER_DETAIL_IMAGES.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveSrc(src)}
            className="relative h-14 w-14 shrink-0 overflow-hidden bg-white transition hover:opacity-80"
            aria-label="View larger image"
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {activeSrc && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-900/60 p-6"
          onClick={() => setActiveSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged product image"
        >
          <button
            type="button"
            onClick={() => setActiveSrc(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-2xl text-neutral-400 transition hover:text-neutral-300"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={activeSrc}
            alt=""
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
