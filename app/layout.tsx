import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TikTokPixel } from "@/components/tiktok-pixel";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Appropriate — Sunglasses",
    template: "%s | Appropriate",
  },
  description:
    "UV400 acetate sunglasses. Free worldwide shipping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-surface font-sans text-neutral-900 antialiased">
        <Providers>{children}</Providers>
        <TikTokPixel />
        <Analytics />
      </body>
    </html>
  );
}
