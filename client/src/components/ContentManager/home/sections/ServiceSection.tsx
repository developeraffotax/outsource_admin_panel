import { createEmptyServiceCard } from "../home-form.types";
import { useFieldArray, useWatch } from "react-hook-form";
import type { HomeSectionProps } from "./section-props.types";

const ServiceSection = ({
  register,
  errors,
  control,
  savedImages,
}: HomeSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "serviceCards",
  });

  const serviceCards = useWatch({
    control,
    name: "serviceCards",
  });

  return (
    <section className="cms-section-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="cms-section-header flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <span className="cms-section-accent h-4 w-1 rounded-full bg-indigo-500"></span>
        <h2 className="cms-section-title text-sm font-semibold uppercase tracking-wide text-slate-700">
          Service section
        </h2>
      </div>
      <div className="cms-section-body space-y-4 p-5">
        <div>
          <label
            htmlFor="headingService"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Heading
          </label>
          <input
            id="headingService"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("headingService")}
          />
          {errors.headingService && (
            <p className="mt-1 text-sm text-red-600">
              {errors.headingService.message as string}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="descriptionService"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="descriptionService"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("descriptionService")}
          />
          {errors.descriptionService && (
            <p className="mt-1 text-sm text-red-600">
              {errors.descriptionService.message as string}
            </p>
          )}
        </div>

        <div className="cms-subsection-card space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Card section ({fields.length})
          </h3>

          {fields.map((field, index) => {
            const serviceCardSummary =
              serviceCards?.[index]?.titleServiceCard?.trim();
            const existingServiceCardImage =
              serviceCards?.[index]?.existingServiceCardImage ||
              savedImages?.[`imgServiceCard_${index}`];

            return (
              <details
                key={field.id}
                className="cms-accordion group rounded-lg border border-slate-200 bg-white"
              >
                <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                  <span>
                    {serviceCardSummary || `Service card ${index + 1}`}
                  </span>
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
                        `serviceCards.${index}.existingServiceCardImage`,
                      )}
                    />
                    <label
                      htmlFor={`service-card-${index}-imgServiceCard`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Card image
                    </label>
                    <input
                      id={`service-card-${index}-imgServiceCard`}
                      type="file"
                      accept="image/*"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(`serviceCards.${index}.imgServiceCard`)}
                    />
                    {existingServiceCardImage && (
                      <img
                        src={existingServiceCardImage}
                        alt="Current card image"
                        className="mt-2 h-20 rounded object-cover"
                      />
                    )}
                    {(
                      errors.serviceCards?.[index]?.imgServiceCard as {
                        message?: string;
                      }
                    )?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {
                          (
                            errors.serviceCards?.[index]?.imgServiceCard as {
                              message?: string;
                            }
                          ).message
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`service-card-${index}-titleServiceCard`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Title
                    </label>
                    <input
                      id={`service-card-${index}-titleServiceCard`}
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(`serviceCards.${index}.titleServiceCard`)}
                    />
                    {(
                      errors.serviceCards?.[index]?.titleServiceCard as {
                        message?: string;
                      }
                    )?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {
                          (
                            errors.serviceCards?.[index]?.titleServiceCard as {
                              message?: string;
                            }
                          ).message
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`service-card-${index}-descriptionServiceCard`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Description
                    </label>
                    <textarea
                      id={`service-card-${index}-descriptionServiceCard`}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(
                        `serviceCards.${index}.descriptionServiceCard`,
                      )}
                    />
                    {(
                      errors.serviceCards?.[index]?.descriptionServiceCard as {
                        message?: string;
                      }
                    )?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {
                          (
                            errors.serviceCards?.[index]
                              ?.descriptionServiceCard as {
                              message?: string;
                            }
                          ).message
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`service-card-${index}-buttontxtServiceCard`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Button text
                    </label>
                    <input
                      id={`service-card-${index}-buttontxtServiceCard`}
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(
                        `serviceCards.${index}.buttontxtServiceCard`,
                      )}
                    />
                    {(
                      errors.serviceCards?.[index]?.buttontxtServiceCard as {
                        message?: string;
                      }
                    )?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {
                          (
                            errors.serviceCards?.[index]
                              ?.buttontxtServiceCard as {
                              message?: string;
                            }
                          ).message
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`service-card-${index}-pglink`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Page link
                    </label>
                    <input
                      id={`service-card-${index}-pglink`}
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder="/services/example"
                      {...register(`serviceCards.${index}.pglink`)}
                    />
                    {(
                      errors.serviceCards?.[index]?.pglink as {
                        message?: string;
                      }
                    )?.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {
                          (
                            errors.serviceCards?.[index]?.pglink as {
                              message?: string;
                            }
                          ).message
                        }
                      </p>
                    )}
                  </div>
                </div>
              </details>
            );
          })}

          <div className="flex justify-end">
            <button
              type="button"
              className="cms-btn-secondary"
              onClick={() => append(createEmptyServiceCard())}
            >
              + Add service card
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
