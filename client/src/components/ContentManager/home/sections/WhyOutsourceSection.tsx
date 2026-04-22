import { createEmptyWhyOutsourceCard } from "../home-form.types";
import { useFieldArray, useWatch } from "react-hook-form";
import type { HomeSectionProps } from "./section-props.types";

const WhyOutsourceSection = ({
  register,
  errors,
  control,
  savedImages,
}: HomeSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "whyOutsourceCardSections",
  });

  const whyOutsourceCardSections = useWatch({
    control,
    name: "whyOutsourceCardSections",
  });

  return (
    <section className="cms-section-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="cms-section-header flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <span className="cms-section-accent h-4 w-1 rounded-full bg-indigo-500"></span>
        <h2 className="cms-section-title text-sm font-semibold uppercase tracking-wide text-slate-700">
          Why Outsource section
        </h2>
      </div>
      <div className="cms-section-body space-y-4 p-5">
        <div>
          <label
            htmlFor="whyOutsourcing"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Why Outsourcing (label text)
          </label>
          <input
            id="whyOutsourcing"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("whyOutsourcing")}
          />
          {errors.whyOutsourcing?.message && (
            <p className="mt-1 text-sm text-red-600">
              {String(errors.whyOutsourcing.message)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="headingWhyOutsourcing"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Heading
          </label>
          <input
            id="headingWhyOutsourcing"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("headingWhyOutsourcing")}
          />
          {errors.headingWhyOutsourcing?.message && (
            <p className="mt-1 text-sm text-red-600">
              {String(errors.headingWhyOutsourcing.message)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="descriptionWhyOutsourcing"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="descriptionWhyOutsourcing"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("descriptionWhyOutsourcing")}
          />
          {errors.descriptionWhyOutsourcing?.message && (
            <p className="mt-1 text-sm text-red-600">
              {String(errors.descriptionWhyOutsourcing.message)}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="imgWhyOutsourcing"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Main image
            </label>
            <input
              id="imgWhyOutsourcing"
              type="file"
              accept="image/*"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              {...register("imgWhyOutsourcing")}
            />
            {savedImages?.imgWhyOutsoutcing && (
              <img
                src={savedImages.imgWhyOutsoutcing}
                alt="Current main image"
                className="mt-2 h-20 rounded object-cover"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="imgTwoWhyOutsourcing"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Second image
            </label>
            <input
              id="imgTwoWhyOutsourcing"
              type="file"
              accept="image/*"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              {...register("imgTwoWhyOutsourcing")}
            />
            {savedImages?.imgtwoWhyOutsoutcing && (
              <img
                src={savedImages.imgtwoWhyOutsoutcing}
                alt="Current second image"
                className="mt-2 h-20 rounded object-cover"
              />
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="whyOutSourceAccounting"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Accounting image
          </label>
          <input
            id="whyOutSourceAccounting"
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("whyOutSourceAccounting")}
          />
          {savedImages?.whyOutSourceAccounting && (
            <img
              src={savedImages.whyOutSourceAccounting}
              alt="Current accounting image"
              className="mt-2 h-20 rounded object-cover"
            />
          )}
        </div>

        <div className="cms-subsection-card space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Card section
          </h3>

          {fields.map((field, index) => {
            const whyCardSummary =
              whyOutsourceCardSections?.[
                index
              ]?.pointerTextWhyOutsourcing?.trim();
            const existingWhyCardImage =
              whyOutsourceCardSections?.[index]?.existingWhyCardImage ||
              savedImages?.[`whyCardImage_${index}`];

            return (
              <details
                key={field.id}
                className="cms-accordion group rounded-lg border border-slate-200 bg-white"
              >
                <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                  <span>{whyCardSummary || `Why card ${index + 1}`}</span>
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
                        `whyOutsourceCardSections.${index}.existingWhyCardImage`,
                      )}
                    />
                    <label
                      htmlFor={`why-card-${index}-image`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Pointer image
                    </label>
                    <input
                      id={`why-card-${index}-image`}
                      type="file"
                      accept="image/*"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(
                        `whyOutsourceCardSections.${index}.imgPointerWhyOutsourcing`,
                      )}
                    />
                    {existingWhyCardImage && (
                      <img
                        src={existingWhyCardImage}
                        alt="Current pointer image"
                        className="mt-2 h-20 rounded object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`why-card-${index}-pointerText`}
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Pointer text
                    </label>
                    <input
                      id={`why-card-${index}-pointerText`}
                      type="text"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(
                        `whyOutsourceCardSections.${index}.pointerTextWhyOutsourcing`,
                      )}
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
              onClick={() => append(createEmptyWhyOutsourceCard())}
            >
              + Add why card
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyOutsourceSection;
