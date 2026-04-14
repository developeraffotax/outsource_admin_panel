import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import type { ServiceSectionProps } from "./ServicesProps";
import WhatYouGet from "./WhatYouGet";
import ServiceProcess from "./ServiceProcess";
import WhyChooseUs from "./WhyChooseUs";
import Statics from "./Statics";
import Pricing from "./Pricing";

// Show a saved Cloudinary URL as a small preview (only when value is a string, not a FileList)
function ImgPreview({ value }: { value: unknown }) {
  if (typeof value !== "string" || !value.startsWith("http")) return null;
  return (
    <img
      src={value}
      alt="Current image"
      className="mt-2 h-20 rounded object-cover"
    />
  );
}

function getPreviewUrl(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value;
  if (
    typeof FileList !== "undefined" &&
    value instanceof FileList &&
    value.length > 0
  ) {
    return URL.createObjectURL(value[0]);
  }
  return null;
}

const ServiceItem = ({
  index,
  register,
  errors,
  control,
}: ServiceSectionProps) => {
  const p = `services.${index}` as const;

  const imgVal = useWatch({ control, name: `${p}.img` });
  const bgimgVal = useWatch({ control, name: `${p}.bgimg` });
  const whatDataImgVal = useWatch({ control, name: `${p}.WhatData.img` });
  const whoDataImgVal = useWatch({ control, name: `${p}.WhoData.img` });
  const heroImageUrl = useMemo(() => getPreviewUrl(imgVal), [imgVal]);
  const heroBgUrl = useMemo(() => getPreviewUrl(bgimgVal), [bgimgVal]);

  useEffect(() => {
    return () => {
      if (heroImageUrl?.startsWith("blob:")) URL.revokeObjectURL(heroImageUrl);
    };
  }, [heroImageUrl]);

  useEffect(() => {
    return () => {
      if (heroBgUrl?.startsWith("blob:")) URL.revokeObjectURL(heroBgUrl);
    };
  }, [heroBgUrl]);

  return (
    <div className="space-y-4">
      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>Hero</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Slug
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register(`${p}.slug`)}
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-sky-50 shadow-sm">
              {heroBgUrl ? (
                <img
                  src={heroBgUrl}
                  alt="Service hero background"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-sky-100 via-blue-50 to-slate-100" />
              )}
              <div className="absolute inset-0 bg-white/48" />

              <div className="relative z-10 flex flex-col gap-6 p-3 md:p-8 lg:flex-row lg:items-start lg:justify-between lg:p-10">
                <div className="w-full space-y-4 lg:w-1/2">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Title row
                    </label>
                    <div className="grid gap-2 md:grid-cols-2">
                      <input
                        type="text"
                        placeholder="Title"
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-bold text-slate-900"
                        {...register(`${p}.title`)}
                      />
                      <input
                        type="text"
                        placeholder="Title highlight"
                        className="w-full rounded-md border border-sky-300 bg-sky-100 px-3 py-2 text-base font-bold text-sky-900"
                        {...register(`${p}.titleHighlight`)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-semibold text-slate-900"
                      {...register(`${p}.subtitle`)}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Description paragraph one
                    </label>
                    <textarea
                      rows={2}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                      {...register(`${p}.description`)}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Description paragraph two
                    </label>
                    <textarea
                      rows={2}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                      {...register(`${p}.descriptiontwo`)}
                    />
                  </div>

                  <div className="max-w-xs">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Button text
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      {...register(`${p}.buttonText`)}
                    />
                  </div>
                </div>

                <div className="w-full space-y-3 lg:w-1/2 lg:pl-4">
                  <div className="flex min-h-56 items-center justify-center rounded-xl border border-slate-200 bg-white/85 p-3">
                    {heroImageUrl ? (
                      <img
                        src={heroImageUrl}
                        alt="Service hero visual"
                        className="h-full w-full max-w-lg object-contain drop-shadow-2xl"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-500">
                        Hero image preview
                      </p>
                    )}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        {...register(`${p}.img`)}
                      />
                      <ImgPreview value={imgVal} />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Background image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        {...register(`${p}.bgimg`)}
                      />
                      <ImgPreview value={bgimgVal} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>
      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>Pricing</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <Pricing
            index={index}
            register={register}
            errors={errors}
            control={control}
          />
        </div>
      </details>
      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>What You Get</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <WhatYouGet
            index={index}
            register={register}
            errors={errors}
            control={control}
          />
        </div>
      </details>

      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>Service Process</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <ServiceProcess
            index={index}
            register={register}
            errors={errors}
            control={control}
          />
        </div>
      </details>

      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>Get Started</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Heading
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.GetStarted.heading`)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description One
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.GetStarted.descriptionone`)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description Two
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.GetStarted.descriptiontwo`)}
                />
              </div>
            </div>
          </div>
        </div>
      </details>

      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>Why Choose Us</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <WhyChooseUs
            index={index}
            register={register}
            errors={errors}
            control={control}
          />
        </div>
      </details>

      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>Statics</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <Statics
            index={index}
            register={register}
            errors={errors}
            control={control}
          />
        </div>
      </details>

      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>What Data</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Heading
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.WhatData.heading`)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.WhatData.img`)}
                />
                <ImgPreview value={whatDataImgVal} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description One
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.WhatData.descriptionone`)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description Two
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.WhatData.descriptiontwo`)}
                />
              </div>
            </div>
          </div>
        </div>
      </details>

      <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
        <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <span>Who Data</span>
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
        <div className="cms-accordion-content border-t border-slate-100 p-4">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Heading
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.WhoData.heading`)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.WhoData.img`)}
                />
                <ImgPreview value={whoDataImgVal} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description One
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.WhoData.descriptionone`)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description Two
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${p}.WhoData.descriptiontwo`)}
                />
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default ServiceItem;
