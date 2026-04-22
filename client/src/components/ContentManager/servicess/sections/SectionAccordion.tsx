import type { ReactNode } from "react";

type SectionAccordionProps = {
  title: string;
  children: ReactNode;
};

const SectionAccordion = ({ title, children }: SectionAccordionProps) => {
  return (
    <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
      <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
        <span>{title}</span>
        <svg
          className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="cms-accordion-content border-t border-slate-100 p-4">
        {children}
      </div>
    </details>
  );
};

export default SectionAccordion;
