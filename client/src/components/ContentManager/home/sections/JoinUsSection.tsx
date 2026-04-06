import type { HomeSectionProps } from "./section-props.types";

const JoinUsSection = ({ register, errors, savedImages }: HomeSectionProps) => {
  return (
    <section className="cms-section-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="cms-section-header flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <span className="cms-section-accent h-4 w-1 rounded-full bg-indigo-500"></span>
        <h2 className="cms-section-title text-sm font-semibold uppercase tracking-wide text-slate-700">
          Join Us
        </h2>
      </div>
      <div className="cms-section-body space-y-3 p-3 sm:p-4">
        <div className="relative mt-3 overflow-hidden rounded-2xl border border-slate-200 shadow-sm md:mt-5">
          {savedImages?.joinUsBgImage ? (
            <img
              src={savedImages.joinUsBgImage}
              alt="Join us background"
              className="h-64 w-full object-cover md:h-80"
            />
          ) : (
            <div className="h-64 w-full bg-linear-to-br from-sky-400 via-sky-500 to-slate-700 md:h-80" />
          )}

          <div className="absolute inset-0 bg-slate-900/55" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
            <label
              htmlFor="joinUs-heading"
              className="text-xs font-semibold uppercase tracking-wide text-white/90"
            >
              Join us heading
            </label>
            <textarea
              id="joinUs-heading"
              rows={2}
              className="w-full max-w-3xl rounded-md border border-white/50 bg-white/92 px-3 py-2 text-center text-lg font-semibold text-slate-900 md:text-2xl"
              {...register("joinUs.heading")}
            />
            {errors.joinUs?.heading && (
              <p className="text-sm text-red-200">
                {errors.joinUs.heading.message as string}
              </p>
            )}

            <span className="inline-flex items-center rounded-full border border-white/60 bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              Contact us button
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white/90 p-3">
          <label
            htmlFor="joinUs-bgimg"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Background image
          </label>
          <input
            id="joinUs-bgimg"
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("joinUs.bgimg")}
          />
          {savedImages?.joinUsBgImage && (
            <img
              src={savedImages.joinUsBgImage}
              alt="Current background"
              className="mt-2 h-24 w-full rounded object-cover"
            />
          )}
          {errors.joinUs?.bgimg && (
            <p className="mt-1 text-sm text-red-600">
              {errors.joinUs.bgimg.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
