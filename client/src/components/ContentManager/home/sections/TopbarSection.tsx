import type { HomeSectionProps } from "./section-props.types";

const TopbarSection = ({ register, errors }: HomeSectionProps) => {
  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Topbar</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="topbar-email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="topbar-email"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("topbar.email")}
          />
          {errors.topbar?.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.topbar.email.message as string}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="topbar-number"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Phone number
          </label>
          <input
            id="topbar-number"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="+44 1234 567890"
            {...register("topbar.number")}
          />
          {errors.topbar?.number && (
            <p className="mt-1 text-sm text-red-600">
              {errors.topbar.number.message as string}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="topbar-eNumber"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Emergency number
        </label>
        <input
          id="topbar-eNumber"
          type="text"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="+44 1234 567890"
          {...register("topbar.eNumber")}
        />
        {errors.topbar?.eNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.topbar.eNumber.message as string}
          </p>
        )}
      </div>
    </section>
  );
};

export default TopbarSection;
