import { createEmptyHeroCard } from "../home-form.types";
import { useFieldArray, useWatch } from "react-hook-form";
import type { HomeSectionProps } from "./section-props.types";
import RhfImageUploadField from "../../shared/RhfImageUploadField";
import RhfTextInput from "../../shared/RhfTextInput";
import RhfTextarea from "../../shared/RhfTextarea";
import RhfSelect from "../../shared/RhfSelect";

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
                <RhfTextInput
                  label="Title pill"
                  path="title"
                  register={register}
                  errors={errors}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
                  labelClassName="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                  Hero heading
                </label>
                <div className="grid gap-2 sm:grid-cols-3">
                  <RhfTextInput
                    path="headingFirstText"
                    register={register}
                    errors={errors}
                    placeholder="First part"
                    className="rounded-md border border-white/35 bg-white/94 px-3 py-2 text-sm text-slate-900"
                  />
                  <RhfTextInput
                    path="headingMiddleText"
                    register={register}
                    errors={errors}
                    placeholder="Middle highlight"
                    className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-900"
                  />
                  <RhfTextInput
                    path="headingEndText"
                    register={register}
                    errors={errors}
                    placeholder="End part"
                    className="rounded-md border border-white/35 bg-white/94 px-3 py-2 text-sm text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <RhfTextarea
                  label="Description one"
                  path="descriptionHeroHomepage"
                  register={register}
                  errors={errors}
                  rows={2}
                  className="w-full rounded-md border border-white/35 bg-white/92 px-3 py-2 text-sm text-slate-900"
                  labelClassName="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-100"
                />
                <RhfTextarea
                  label="Description two"
                  path="descriptionHeroHomePageTwo"
                  register={register}
                  errors={errors}
                  rows={2}
                  className="w-full rounded-md border border-white/35 bg-white/92 px-3 py-2 text-sm text-slate-900"
                  labelClassName="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-100"
                />
              </div>

              <div className="max-w-xs">
                <RhfTextInput
                  label="CTA button text"
                  path="freeConsultation"
                  register={register}
                  errors={errors}
                  className="w-full rounded-md border border-white/35 bg-white/92 px-3 py-2 text-sm text-slate-900"
                  labelClassName="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-100"
                />
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
                <RhfImageUploadField
                  id="bgImage"
                  label="Background image"
                  path="bgImage"
                  register={register}
                  errors={errors}
                  previewValue={savedImages?.bgImage}
                  previewAlt="Current background"
                  previewClassName="mt-2 h-28 w-full rounded object-cover"
                  errorClassName="mt-1 text-sm text-red-600"
                />

                <RhfImageUploadField
                  id="ukFlag"
                  label="UK flag image"
                  path="ukFlag"
                  register={register}
                  errors={errors}
                  previewValue={savedImages?.ukFlag}
                  previewAlt="Current UK flag"
                  previewClassName="mt-2 h-20 w-40 rounded object-cover"
                  errorClassName="mt-1 text-sm text-red-600"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="cms-subsection-card space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Card section ({fields.length})
          </h3>

          <div>
            <RhfSelect
              label="Card name"
              path="heroCardName"
              register={register}
              errors={errors}
              placeholder="Select card name"
              options={[
                { label: "Services", value: "Services" },
                { label: "Features", value: "Features" },
                { label: "Highlights", value: "Highlights" },
              ]}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              labelClassName="mb-1 block text-sm font-medium text-slate-700"
            />
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
                    <RhfImageUploadField
                      id={`hero-card-${index}-image`}
                      label="Image"
                      path={`heroCardSections.${index}.image`}
                      register={register}
                      errors={errors}
                      previewValue={existingHeroCardImage}
                      previewAlt="Current card image"
                      errorClassName="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <RhfTextInput
                    label="Title"
                    path={`heroCardSections.${index}.title`}
                    register={register}
                    errors={errors}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    labelClassName="mb-1 block text-sm font-medium text-slate-700"
                  />

                  <RhfTextInput
                    label="Content"
                    path={`heroCardSections.${index}.content`}
                    register={register}
                    errors={errors}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    labelClassName="mb-1 block text-sm font-medium text-slate-700"
                  />
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
