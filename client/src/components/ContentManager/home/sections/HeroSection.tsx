import { createEmptyHeroCard } from "../home-form.types";
import { useFieldArray, useWatch } from "react-hook-form";
import type { HomeSectionProps } from "./section-props.types";

const HeroSection = ({
  register,
  errors,
  control,
  savedImages,
}: HomeSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "heroCardSections",
  });

  const heroCardSections = useWatch({
    control,
    name: "heroCardSections",
  });

  return (
    <section className="cms-section-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="cms-section-header flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <span className="cms-section-accent h-4 w-1 rounded-full bg-indigo-500"></span>
        <h2 className="cms-section-title text-sm font-semibold uppercase tracking-wide text-slate-700">
          Hero section — home
        </h2>
      </div>
      <div className="cms-section-body space-y-3 p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
          {savedImages?.bgImage ? (
            <img
              src={savedImages.bgImage}
              alt="Current background"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-700 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/88 via-slate-900/65 to-slate-900/78" />

          <div className="relative z-10 flex flex-col gap-4 p-3 sm:p-4 lg:flex-row lg:items-start lg:justify-start lg:gap-4 lg:p-5">
            <div className="w-full space-y-3 lg:w-[58%]">
              <div className="inline-block max-w-full rounded-xl border border-white/45 bg-white/80 p-2 backdrop-blur-sm">
                <label
                  htmlFor="title"
                  className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-600"
                >
                  Title pill
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
                  {...register("title")}
                />
                {errors.title?.message && (
                  <p className="mt-1 text-xs text-red-200">{String(errors.title.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                  Hero heading
                </label>
                <div className="grid gap-2 sm:grid-cols-3">
                  <input
                    id="headingFirstText"
                    type="text"
                    placeholder="First part"
                    className="rounded-md border border-white/35 bg-white/94 px-3 py-2 text-sm text-slate-900"
                    {...register("headingFirstText")}
                  />
                  {errors.headingFirstText?.message && (
                    <p className="text-xs text-red-200">
                      {String(errors.headingFirstText.message)}
                    </p>
                  )}
                  <input
                    id="headingMiddleText"
                    type="text"
                    placeholder="Middle highlight"
                    className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-900"
                    {...register("headingMiddleText")}
                  />
                  {errors.headingMiddleText?.message && (
                    <p className="text-xs text-red-200">
                      {String(errors.headingMiddleText.message)}
                    </p>
                  )}
                  <input
                    id="headingEndText"
                    type="text"
                    placeholder="End part"
                    className="rounded-md border border-white/35 bg-white/94 px-3 py-2 text-sm text-slate-900"
                    {...register("headingEndText")}
                  />
                  {errors.headingEndText?.message && (
                    <p className="text-xs text-red-200">{String(errors.headingEndText.message)}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="descriptionHeroHomepage"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-100"
                  >
                    Description one
                  </label>
                  <textarea
                    id="descriptionHeroHomepage"
                    rows={2}
                    className="w-full rounded-md border border-white/35 bg-white/92 px-3 py-2 text-sm text-slate-900"
                    {...register("descriptionHeroHomepage")}
                  />
                  {errors.descriptionHeroHomepage?.message && (
                    <p className="mt-1 text-xs text-red-200">
                      {String(errors.descriptionHeroHomepage.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="descriptionHeroHomePageTwo"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-100"
                  >
                    Description two
                  </label>
                  <textarea
                    id="descriptionHeroHomePageTwo"
                    rows={2}
                    className="w-full rounded-md border border-white/35 bg-white/92 px-3 py-2 text-sm text-slate-900"
                    {...register("descriptionHeroHomePageTwo")}
                  />
                  {errors.descriptionHeroHomePageTwo?.message && (
                    <p className="mt-1 text-xs text-red-200">
                      {String(errors.descriptionHeroHomePageTwo.message)}
                    </p>
                  )}
                </div>
              </div>

              <div className="max-w-xs">
                <label
                  htmlFor="freeConsultation"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-100"
                >
                  CTA button text
                </label>
                <input
                  id="freeConsultation"
                  type="text"
                  className="w-full rounded-md border border-white/35 bg-white/92 px-3 py-2 text-sm text-slate-900"
                  {...register("freeConsultation")}
                />
                {errors.freeConsultation?.message && (
                  <p className="mt-1 text-xs text-red-200">
                    {String(errors.freeConsultation.message)}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full rounded-2xl border border-white/35 bg-white/90 p-3 shadow-xl backdrop-blur-sm lg:w-[40%] lg:max-w-none">
              <h3 className="text-lg font-bold text-slate-800">
                Hero media inputs
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Place media values where they are used in the hero design.
              </p>

              <div className="mt-4 space-y-4">
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
                  {savedImages?.bgImage && (
                    <img
                      src={savedImages.bgImage}
                      alt="Current background"
                      className="mt-2 h-28 w-full rounded object-cover"
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="ukFlag"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    UK flag image
                  </label>
                  <input
                    id="ukFlag"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register("ukFlag")}
                  />
                  {savedImages?.ukFlag && (
                    <img
                      src={savedImages.ukFlag}
                      alt="Current UK flag"
                      className="mt-2 h-20 w-40 rounded object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cms-subsection-card space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Card section ({fields.length})
          </h3>

          <div>
            <label
              htmlFor="heroCardName"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Card name
            </label>
            <select
              id="heroCardName"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              {...register("heroCardName")}
            >
              <option value="">Select card name</option>
              <option value="Services">Services</option>
              <option value="Features">Features</option>
              <option value="Highlights">Highlights</option>
            </select>
          </div>

          {fields.map((field, index) => {
            const heroCardSummary = heroCardSections?.[index]?.title?.trim();
            const existingHeroCardImage =
              heroCardSections?.[index]?.existingImageUrl ||
              savedImages?.[`heroCardImg_${index}`];

            return (
              <details
                key={field.id}
                className="cms-accordion group rounded-lg border border-slate-200 bg-white"
              >
                <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                  <span>{heroCardSummary || `Hero card ${index + 1}`}</span>
                  <button
                    type="button"
                    className="rounded px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      remove(index);
                    }}
                  >
                    Remove
                  </button>
                  <svg
                    className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                <div className="cms-accordion-content space-y-4 border-t border-slate-100 p-4">
                  <div>
                    <input
                      type="hidden"
                      {...register(
                        `heroCardSections.${index}.existingImageUrl`,
                      )}
                    />
                    <label
                      htmlFor={`hero-card-${index}-image`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Image
                    </label>
                    <input
                      id={`hero-card-${index}-image`}
                      type="file"
                      accept="image/*"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(`heroCardSections.${index}.image`)}
                    />
                    {existingHeroCardImage && (
                      <img
                        src={existingHeroCardImage}
                        alt="Current card image"
                        className="mt-2 h-20 rounded object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`hero-card-${index}-title`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Title
                    </label>
                    <input
                      id={`hero-card-${index}-title`}
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(`heroCardSections.${index}.title`)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`hero-card-${index}-content`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Content
                    </label>
                    <input
                      id={`hero-card-${index}-content`}
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(`heroCardSections.${index}.content`)}
                    />
                  </div>
                </div>
              </details>
            );
          })}

          <div className="flex justify-end">
            <button
              type="button"
              className="cms-btn-secondary"
              onClick={() => append(createEmptyHeroCard())}
            >
              + Add hero card
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
