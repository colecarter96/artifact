"use client";

import { useEffect, useState } from "react";
import { promoMessages } from "@/lib/promos";

export function PromoBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % promoMessages.length);
        setVisible(true);
      }, 220);
    }, 3500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="bg-neutral-900 text-white text-center text-xs sm:text-sm font-medium tracking-wide">
      <p
        className={`py-2.5 px-4 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        {promoMessages[index]}
      </p>
    </div>
  );
}
