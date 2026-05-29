import { orderSteps } from "@/lib/trust";

type OrderTimelineProps = {
  compact?: boolean;
};

export function OrderTimeline({ compact = false }: OrderTimelineProps) {
  return (
    <section
      className={compact ? "space-y-3" : "space-y-4"}
      aria-label="What happens after you order"
    >
      {!compact && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            What happens after you order
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            No guessing — here’s exactly what to expect.
          </p>
        </div>
      )}
      {compact && (
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          After you checkout
        </p>
      )}
      <ol className="space-y-0">
        {orderSteps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex shrink-0 items-center justify-center border border-neutral-300 bg-white font-semibold text-neutral-700 ${
                  compact ? "h-6 w-6 text-[10px]" : "h-7 w-7 text-xs"
                }`}
                aria-hidden
              >
                {index + 1}
              </span>
              {index < orderSteps.length - 1 && (
                <span className="my-1 w-px flex-1 bg-neutral-200" aria-hidden />
              )}
            </div>
            <div className={compact ? "pb-3" : "pb-4"}>
              <p
                className={`font-medium text-neutral-900 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                {step.title}
              </p>
              <p
                className={`mt-0.5 text-neutral-500 ${
                  compact ? "text-[11px] leading-snug" : "text-xs leading-relaxed"
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
