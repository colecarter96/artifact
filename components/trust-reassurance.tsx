import Link from "next/link";
import { reassurancePoints, SUPPORT_EMAIL } from "@/lib/trust";

const icons = [BoxIcon, PinIcon, LockIcon, ChatIcon] as const;

type TrustReassuranceProps = {
  showLinks?: boolean;
};

export function TrustReassurance({ showLinks = true }: TrustReassuranceProps) {
  return (
    <section
      className="rounded-2xl bg-pink-400 p-5 sm:p-6"
      aria-label="Why shop with Artifact"
    >
      <h2 className="text-xl font-extrabold text-black sm:text-4xl">
        Shop with confidence
      </h2>

      <ul className="mt-6 divide-y divide-black/15">
        {reassurancePoints.map((point, index) => {
          const Icon = icons[index];

          return (
            <li key={point.title} className="flex gap-4 py-6 first:pt-0 last:pb-0">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-blue-200"
                aria-hidden
              >
                <Icon />
              </span>
              <div className="pt-0.5">
                <p className="text-sm font-bold text-black">{point.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-800">
                  {point.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {showLinks && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-black/15 pt-6 text-xs">
          <Link
            href="/shipping"
            className="text-black/70 underline underline-offset-2 hover:text-black"
          >
            Shipping & delivery
          </Link>
          <Link
            href="/returns"
            className="text-black/70 underline underline-offset-2 hover:text-black"
          >
            Returns
          </Link>
          <Link
            href="/faq"
            className="text-black/70 underline underline-offset-2 hover:text-black"
          >
            FAQ
          </Link>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-black/70 underline underline-offset-2 hover:text-black"
          >
            Contact
          </a>
        </div>
      )}
    </section>
  );
}

function BoxIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
