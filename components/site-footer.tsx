import Link from "next/link";
import { TrustBadges } from "./trust-badges";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-lg space-y-6 px-4 py-10">
        <TrustBadges />
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-neutral-600">
          <Link href="/shipping" className="hover:text-neutral-900 underline-offset-4 hover:underline">
            Shipping
          </Link>
          <Link href="/returns" className="hover:text-neutral-900 underline-offset-4 hover:underline">
            Returns
          </Link>
          <Link href="/faq" className="hover:text-neutral-900 underline-offset-4 hover:underline">
            FAQ
          </Link>
          <Link href="/about" className="hover:text-neutral-900 underline-offset-4 hover:underline">
            About
          </Link>
        </nav>
        <p className="text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Artifact. Premium cotton tees, shipped
            worldwide.
          </p>
      </div>
    </footer>
  );
}
