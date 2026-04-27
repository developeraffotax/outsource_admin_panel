import type { AboutUsSectionProps } from "./AboutUsProp";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const AboutUsSection = ({
  register,
  errors,
  savedImages,
}: AboutUsSectionProps) => {
  return (
    <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">
        Hero section home
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="heading"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            heading
          </label>
          <input
            type="text"
            id="heading"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("heading")}
          />
        </div>
        <div>
          <label
            htmlFor="subHeading"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            subHeading
          </label>
          <input
            type="text"
            id="subHeading"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("subHeading")}
          />
        </div>
        <RhfImageUploadField
          id="imgHero"
          label="Background image"
          path="imgHero"
          register={register}
          errors={errors}
          previewValue={savedImages?.imgHero}
          previewAlt="Current hero"
        />
      </div>
    </section>
  );
};

export default AboutUsSection;
