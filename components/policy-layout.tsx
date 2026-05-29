import Link from "next/link";
import type { ReactNode } from "react";

type PolicyLayoutProps = {
  title: string;
  children: ReactNode;
};

export function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <div className="py-6">
      <Link
        href="/"
        className="mb-6 inline-flex text-xs text-neutral-500 hover:text-neutral-900"
      >
        ← Back to shop
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-600">
        {children}
      </div>
    </div>
  );
}
