import type { HomeSectionProps } from "./section-props.types";

const HowWeWorkSection = ({
  register,
  errors,
  savedImages,
}: HomeSectionProps) => {
  return (
    <section className="cms-section-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="cms-section-header flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <span className="cms-section-accent h-4 w-1 rounded-full bg-indigo-500"></span>
        <h2 className="cms-section-title text-sm font-semibold uppercase tracking-wide text-slate-700">
          How We Work
        </h2>
      </div>
      <div className="cms-section-body space-y-3 p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-b from-sky-50 via-white to-slate-50 shadow-sm">
          <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-sky-200/35 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-amber-200/30 blur-2xl" />

          <div className="relative z-10 px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
            <div className="mx-auto w-full max-w-5xl space-y-6">
              <div className="mx-auto w-full max-w-2xl">
                <label
                  htmlFor="howWeWork-heading"
                  className="mb-1 block text-center text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Section heading
                </label>
                <input
                  id="howWeWork-heading"
                  type="text"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-center text-2xl font-bold text-slate-800"
                  {...register("howWeWork.heading")}
                />
                {errors.howWeWork?.heading && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.howWeWork.heading.message as string}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 items-start gap-y-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-x-2">
                <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm">
                  <div className="absolute -left-2 -top-2 rounded-full border border-slate-300 bg-white px-2 py-0.5 shadow-sm">
                    <input
                      id="howWeWork-one"
                      type="text"
                      className="w-8 border-none bg-transparent p-0 text-center text-xs font-semibold text-slate-700"
                      {...register("howWeWork.one")}
                    />
                  </div>

                  <div className="mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full border border-slate-600 bg-white p-3 shadow-lg md:h-28 md:w-28">
                    {savedImages?.howWeWorkIcon_0 ? (
                      <img
                        src={savedImages.howWeWorkIcon_0}
                        alt="Step 1 icon"
                        className="h-full w-full rounded-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Icon 1
                      </span>
                    )}
                  </div>

                  <label
                    htmlFor="howWeWork-oneIcon"
                    className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 1 icon
                  </label>
                  <input
                    id="howWeWork-oneIcon"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register("howWeWork.oneIcon")}
                  />
                  {errors.howWeWork?.oneIcon && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.oneIcon.message as string}
                    </p>
                  )}

                  <label
                    htmlFor="howWeWork-title"
                    className="mb-1 mt-3 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 1 title
                  </label>
                  <input
                    id="howWeWork-title"
                    type="text"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-center text-base font-semibold text-slate-800"
                    {...register("howWeWork.title")}
                  />
                  {errors.howWeWork?.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.title.message as string}
                    </p>
                  )}

                  <label
                    htmlFor="howWeWork-description"
                    className="mb-1 mt-3 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 1 description
                  </label>
                  <textarea
                    id="howWeWork-description"
                    rows={3}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-600"
                    {...register("howWeWork.description")}
                  />
                  {errors.howWeWork?.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.description.message as string}
                    </p>
                  )}
                </div>

                <div className="hidden h-full items-center justify-center md:flex">
                  {savedImages?.lineOne ? (
                    <img
                      src={savedImages.lineOne}
                      alt="Connector line 1"
                      className="w-22 object-contain lg:w-26"
                    />
                  ) : (
                    <span className="h-0.5 w-18 rounded-full bg-slate-300" />
                  )}
                </div>

                <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm">
                  <div className="absolute -left-2 -top-2 rounded-full border border-slate-300 bg-white px-2 py-0.5 shadow-sm">
                    <input
                      id="howWeWork-two"
                      type="text"
                      className="w-8 border-none bg-transparent p-0 text-center text-xs font-semibold text-slate-700"
                      {...register("howWeWork.two")}
                    />
                  </div>

                  <div className="mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full border border-slate-600 bg-white p-3 shadow-lg md:h-28 md:w-28">
                    {savedImages?.howWeWorkIcon_1 ? (
                      <img
                        src={savedImages.howWeWorkIcon_1}
                        alt="Step 2 icon"
                        className="h-full w-full rounded-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Icon 2
                      </span>
                    )}
                  </div>

                  <label
                    htmlFor="howWeWork-twoIcon"
                    className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 2 icon
                  </label>
                  <input
                    id="howWeWork-twoIcon"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register("howWeWork.twoIcon")}
                  />
                  {errors.howWeWork?.twoIcon && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.twoIcon.message as string}
                    </p>
                  )}

                  <label
                    htmlFor="howWeWork-titleTwo"
                    className="mb-1 mt-3 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 2 title
                  </label>
                  <input
                    id="howWeWork-titleTwo"
                    type="text"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-center text-base font-semibold text-slate-800"
                    {...register("howWeWork.titleTwo")}
                  />
                  {errors.howWeWork?.titleTwo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.titleTwo.message as string}
                    </p>
                  )}

                  <label
                    htmlFor="howWeWork-descriptionTwo"
                    className="mb-1 mt-3 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 2 description
                  </label>
                  <textarea
                    id="howWeWork-descriptionTwo"
                    rows={3}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-600"
                    {...register("howWeWork.descriptionTwo")}
                  />
                  {errors.howWeWork?.descriptionTwo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.descriptionTwo.message as string}
                    </p>
                  )}
                </div>

                <div className="hidden h-full items-center justify-center md:flex">
                  {savedImages?.lineTwo ? (
                    <img
                      src={savedImages.lineTwo}
                      alt="Connector line 2"
                      className="w-22 object-contain lg:w-26"
                    />
                  ) : (
                    <span className="h-0.5 w-18 rounded-full bg-slate-300" />
                  )}
                </div>

                <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm">
                  <div className="absolute -left-2 -top-2 rounded-full border border-slate-300 bg-white px-2 py-0.5 shadow-sm">
                    <input
                      id="howWeWork-three"
                      type="text"
                      className="w-8 border-none bg-transparent p-0 text-center text-xs font-semibold text-slate-700"
                      {...register("howWeWork.three")}
                    />
                  </div>

                  <div className="mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full border border-slate-600 bg-white p-3 shadow-lg md:h-28 md:w-28">
                    {savedImages?.howWeWorkIcon_2 ? (
                      <img
                        src={savedImages.howWeWorkIcon_2}
                        alt="Step 3 icon"
                        className="h-full w-full rounded-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Icon 3
                      </span>
                    )}
                  </div>

                  <label
                    htmlFor="howWeWork-threeIcon"
                    className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 3 icon
                  </label>
                  <input
                    id="howWeWork-threeIcon"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register("howWeWork.threeIcon")}
                  />
                  {errors.howWeWork?.threeIcon && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.threeIcon.message as string}
                    </p>
                  )}

                  <label
                    htmlFor="howWeWork-threeTitle"
                    className="mb-1 mt-3 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 3 title
                  </label>
                  <input
                    id="howWeWork-threeTitle"
                    type="text"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-center text-base font-semibold text-slate-800"
                    {...register("howWeWork.threeTitle")}
                  />
                  {errors.howWeWork?.threeTitle && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.threeTitle.message as string}
                    </p>
                  )}

                  <label
                    htmlFor="howWeWork-threeDescription"
                    className="mb-1 mt-3 block text-xs font-medium uppercase tracking-wide text-slate-600"
                  >
                    Step 3 description
                  </label>
                  <textarea
                    id="howWeWork-threeDescription"
                    rows={3}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-600"
                    {...register("howWeWork.threeDescription")}
                  />
                  {errors.howWeWork?.threeDescription && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.threeDescription.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white/92 p-3">
                  <label
                    htmlFor="howWeWork-lineOne"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Connector line 1
                  </label>
                  <input
                    id="howWeWork-lineOne"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register("howWeWork.lineOne")}
                  />
                  {savedImages?.lineOne && (
                    <img
                      src={savedImages.lineOne}
                      alt="Current line 1"
                      className="mt-2 h-16 w-full rounded bg-white object-contain"
                    />
                  )}
                  {errors.howWeWork?.lineOne && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.lineOne.message as string}
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/92 p-3">
                  <label
                    htmlFor="howWeWork-lineTwo"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Connector line 2
                  </label>
                  <input
                    id="howWeWork-lineTwo"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register("howWeWork.lineTwo")}
                  />
                  {savedImages?.lineTwo && (
                    <img
                      src={savedImages.lineTwo}
                      alt="Current line 2"
                      className="mt-2 h-16 w-full rounded bg-white object-contain"
                    />
                  )}
                  {errors.howWeWork?.lineTwo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.lineTwo.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
