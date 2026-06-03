import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";

const comicHelvetic = localFont({
  src: [
    { path: "./fonts/ComicHelvetic_Light.otf", weight: "300" },
    { path: "./fonts/ComicHelvetic_Medium.otf", weight: "400" },
    { path: "./fonts/ComicHelvetic_Medium.otf", weight: "500" },
    { path: "./fonts/ComicHelvetic_Heavy.otf", weight: "700" },
    { path: "./fonts/ComicHelvetic_Heavy.otf", weight: "800" },
  ],
  variable: "--font-comic-helvetic",
});

export const metadata: Metadata = {
  title: {
    default: "Artifact — Premium Cotton Tees",
    template: "%s",
  },
  description:
    "Mobile-first cotton tee shop. 100% cotton, free worldwide shipping, unisex fit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${comicHelvetic.variable} h-full`}>
      <body
        className={`${comicHelvetic.className} flex min-h-full flex-col bg-white text-neutral-900 tracking-wide antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
