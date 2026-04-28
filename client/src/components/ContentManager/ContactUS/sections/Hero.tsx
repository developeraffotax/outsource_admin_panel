import RhfTextInput from "../../shared/RhfTextInput";
import type { AboutUsSectionProps } from "./ConatctUsProps";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const Hero = ({ register, errors, savedImages }: AboutUsSectionProps) => {
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
          label="Description"
          path="description"
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />

        <RhfImageUploadField
          id="img"
          label="Image"
          path="img"
          errors={errors}
          register={register}
          previewValue={savedImages?.img}
          previewAlt="Current hero"
        />
      </div>
    </section>
  );
};

export default Hero;
