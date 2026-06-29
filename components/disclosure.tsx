type DisclosureProps = {
  label: string;
  children: React.ReactNode;
};

export function Disclosure({ label, children }: DisclosureProps) {
  return (
    <details className="group border-t border-neutral-300/80">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs text-neutral-600 [&::-webkit-details-marker]:hidden">
        <span>{label}</span>
        <span
          aria-hidden
          className="text-base leading-none text-neutral-900 transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="pb-3 text-xs leading-relaxed text-neutral-500">{children}</p>
    </details>
  );
}
