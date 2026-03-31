import type { FaqSectionProps } from "./FaqProps";

const HeroSection = ({ register }: FaqSectionProps) => {
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
            htmlFor="link"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Link
          </label>
          <input
            type="text"
            id="link"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("link")}
          />
        </div>

        <div className="md:col-span-2">
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
      </div>
    </section>
  );
};

export default HeroSection;
