"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function TikTokPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.ttq) return;
    window.ttq.page();
  }, [pathname, searchParams]);

  return null;
}

export function TikTokPageView() {
  return (
    <Suspense fallback={null}>
      <TikTokPageViewTracker />
    </Suspense>
  );
}
