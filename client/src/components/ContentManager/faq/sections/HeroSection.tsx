import RhfTextInput from "../../shared/RhfTextInput";
import type { FaqSectionProps } from "./FaqProps";

const HeroSection = ({ register, errors }: FaqSectionProps) => {
  return (
    <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Hero Section</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <RhfTextInput
          label="Heading"
          path="heading"
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />

        <RhfTextInput
          label="Link"
          path="link"
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />

        <RhfTextInput
          label="Description"
          path="description"
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
      </div>
    </section>
  );
};

export default HeroSection;
