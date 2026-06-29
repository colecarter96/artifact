import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-300/80 bg-surface">
      <div className="mx-auto max-w-lg space-y-5 px-3 py-10">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-wide text-neutral-600">
          <Link
            href="/shipping"
            className="hover:text-neutral-900 hover:underline"
          >
            Shipping
          </Link>
          <Link
            href="/returns"
            className="hover:text-neutral-900 hover:underline"
          >
            Returns
          </Link>
          <Link href="/faq" className="hover:text-neutral-900 hover:underline">
            FAQ
          </Link>
          <Link
            href="/about"
            className="hover:text-neutral-900 hover:underline"
          >
            About
          </Link>
        </nav>
        <p className="text-center text-[11px] text-neutral-500">
          © {new Date().getFullYear()} Appropriate. UV400 acetate sunglasses,
          shipped worldwide.
        </p>
      </div>
    </footer>
  );
}
