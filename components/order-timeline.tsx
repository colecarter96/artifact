import { orderSteps } from "@/lib/trust";

type OrderTimelineProps = {
  compact?: boolean;
};

export function OrderTimeline({ compact = false }: OrderTimelineProps) {
  return (
    <section aria-label="What happens after you order">
      {!compact ? (
        <>
          <p className="text-xs font-medium uppercase text-neutral-400">
            Your order
          </p>
          <h2 className="mt-2 text-xl font-extrabold leading-tight text-black sm:text-4xl">
            What happens next
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            No guessing — here&apos;s exactly what to expect.
          </p>
        </>
      ) : (
        <p className="text-xs font-medium uppercase text-neutral-500">
          After you checkout
        </p>
      )}

      <ol className={compact ? "mt-4 space-y-6" : "mt-6 space-y-8"}>
        {orderSteps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              className={`flex shrink-0 items-center justify-center rounded-full bg-pink-400 font-extrabold text-black ${
                compact ? "h-7 w-7 text-sm" : "h-10 w-10 text-base"
              }`}
              aria-hidden
            >
              {index + 1}
            </span>
            <div className={compact ? "pt-0.5" : "pt-1"}>
              <p
                className={`font-bold text-black ${
                  compact ? "text-sm" : "text-sm"
                }`}
              >
                {step.title}
              </p>
              <p
                className={`mt-1 text-neutral-500 ${
                  compact ? "text-xs leading-relaxed" : "text-xs leading-relaxed"
                }`}
              >
                {step.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
