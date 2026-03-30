import { serviceCardDropdowns } from "../home-form.types";
import { useWatch } from "react-hook-form";
import type { HomeSectionProps } from "./section-props.types";

const ServiceSection = ({ register, errors, control }: HomeSectionProps) => {
  const serviceCards = useWatch({
    control,
    name: "serviceCards",
  });

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">
        Service section
      </h2>

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

      <div className="space-y-4 rounded-md border border-slate-300 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Card section</h3>

        {serviceCardDropdowns.map((card, index) => {
          const serviceCardSummary =
            serviceCards?.[index]?.titleServiceCard?.trim();

          return (
            <details
              key={card.id}
              className="rounded-md border border-slate-200 p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-slate-800">
                {serviceCardSummary || card.title}
              </summary>

              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor={`${card.id}-imgServiceCard`}
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Card image
                  </label>
                  <input
                    id={`${card.id}-imgServiceCard`}
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register(`serviceCards.${index}.imgServiceCard`)}
                  />
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
                    htmlFor={`${card.id}-titleServiceCard`}
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Title
                  </label>
                  <input
                    id={`${card.id}-titleServiceCard`}
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
                    htmlFor={`${card.id}-descriptionServiceCard`}
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Description
                  </label>
                  <textarea
                    id={`${card.id}-descriptionServiceCard`}
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
                    htmlFor={`${card.id}-buttontxtServiceCard`}
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Button text
                  </label>
                  <input
                    id={`${card.id}-buttontxtServiceCard`}
                    type="text"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register(`serviceCards.${index}.buttontxtServiceCard`)}
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
                    htmlFor={`${card.id}-pglink`}
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Page link
                  </label>
                  <input
                    id={`${card.id}-pglink`}
                    type="text"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    placeholder="/services/example"
                    {...register(`serviceCards.${index}.pglink`)}
                  />
                  {(
                    errors.serviceCards?.[index]?.pglink as { message?: string }
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
      </div>
    </section>
  );
};

export default ServiceSection;
