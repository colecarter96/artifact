"use client";

import { useEffect } from "react";
import type { SizeChartRow } from "@/lib/products";

type SizeChartModalProps = {
  open: boolean;
  onClose: () => void;
  rows: SizeChartRow[];
  productName: string;
};

export function SizeChartModal({
  open,
  onClose,
  rows,
  productName,
}: SizeChartModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-hidden bg-white"
        role="dialog"
        aria-labelledby="size-chart-title"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h2 id="size-chart-title" className="text-sm font-semibold">
            Size chart — {productName}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center hover:bg-neutral-100"
            aria-label="Close size chart"
          >
            ✕
          </button>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500">
                <th className="pb-2 pr-4 font-medium">Size</th>
                <th className="pb-2 pr-4 font-medium">Chest</th>
                <th className="pb-2 pr-4 font-medium">Length</th>
                <th className="pb-2 font-medium">Shoulder</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.size} className="border-b border-neutral-100">
                  <td className="py-2.5 pr-4 font-semibold">{row.size}</td>
                  <td className="py-2.5 pr-4">{row.chest}</td>
                  <td className="py-2.5 pr-4">{row.length}</td>
                  <td className="py-2.5">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[11px] leading-relaxed text-neutral-500">
            Measurements are garment specs in inches. Unisex fit — size up for an
            oversized look.
          </p>
        </div>
      </div>
    </div>
  );
}
