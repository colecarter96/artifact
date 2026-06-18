import Link from "next/link";

const features = [
  { label: "Free shipping", icon: TruckIcon },
  { label: "14-day returns", icon: ReturnsIcon },
  { label: "Secure checkout", icon: ShieldIcon },
  { label: "Real support", icon: ChatIcon },
] as const;

export function ShopHero() {
  return (
    <section className="-mx-4 mb-8 bg-white px-4 py-8 sm:px-6 sm:py-10">
      {/* <span className="inline-block bg-white px-3 py-1 text-[10px] font-semibold uppercase text-black sm:text-xs">
        Meme-grade cotton
      </span> */}

      <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[0.95] text-black sm:text-6xl">
        Shirts for
        <br />
        people
        <br />
        who <em className="text-blue-300">get it.</em>
      </h1>

      <p className="mt-5 max-w-sm text-sm leading-relaxed text-black/80 sm:text-base">
        Premium, 100% cotton, tees with stuff your therapist would find concerning. Shipped
        free, worldwide.
      </p>

      {/* <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
        <Link
          href="#shop"
          className="inline-flex items-center justify-center rounded-full border-2 border-black px-5 py-2.5 text-sm font-semibold text-black transition active:scale-[0.98]"
        >
          Shop all styles
        </Link>
        
      </div> */}
{/* 
      <ul className="mt-8 grid grid-cols-2 border-t border-black/15">
        {features.map(({ label, icon: Icon }, index) => (
          <li
            key={label}
            className={`flex items-center gap-2 px-1 py-3.5 text-xs text-black sm:text-sm ${
              index % 2 === 0 ? "border-r border-black/15" : ""
            } ${index < 2 ? "border-b border-black/15" : ""}`}
          >
            <Icon className="shrink-0 text-black" />
            {label}
          </li>
        ))}
      </ul> */}
    </section>
  );
}

function TruckIcon({ className }: { className?: string }) {
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
      className={className}
      aria-hidden
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18h2" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function ReturnsIcon({ className }: { className?: string }) {
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
      className={className}
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
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
      className={className}
      aria-hidden
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
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
      className={className}
      aria-hidden
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
