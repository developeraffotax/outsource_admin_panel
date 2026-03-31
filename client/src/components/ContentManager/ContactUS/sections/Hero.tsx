import type { AboutUsSectionProps } from "./ConatctUsProps";

const Hero = ({ register }: AboutUsSectionProps) => {
  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Hero Section</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="heading"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Heading
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
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("description")}
          />
        </div>

        <div>
          <label
            htmlFor="img"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Image
          </label>
          <input
            id="img"
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("img")}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
