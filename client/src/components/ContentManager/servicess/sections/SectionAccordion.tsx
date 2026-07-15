import type { ReactNode } from "react";

type SectionAccordionProps = {
  title: string;
  children: ReactNode;
};

const SectionAccordion = ({ title, children }: SectionAccordionProps) => {
  return (
    <details className="cms-accordion group overflow-hidden rounded-xl border border-slate-200/60 bg-white transition-all duration-200">
      <summary className="cms-accordion-summary flex cursor-pointer list-none items-center justify-between p-4 text-sm font-medium text-slate-900 select-none transition-colors hover:bg-slate-50/80 [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <svg
          className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ease-in-out group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      
      <div className="cms-accordion-content border-t   border-slate-100 bg-slate-50/30 p-4 text-sm text-slate-600 leading-relaxed">
        {children}
      </div>
    </details>
  );
};

export default SectionAccordion;