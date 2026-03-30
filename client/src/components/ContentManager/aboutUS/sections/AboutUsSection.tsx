import form from "react-hook-form";
import type { AboutUsSectionProps } from "./AboutUsProp";

const AboutUsSection = ({ register, error, control }: AboutUsSectionProps) => {
  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">
        Hero section home
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="bgImage"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Background image
          </label>
          <input
            id="bgImage"
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("bgImage")}
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("title")}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
