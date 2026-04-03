import { cardDropdowns } from "../home-form.types";
import { useWatch } from "react-hook-form";
import type { HomeSectionProps } from "./section-props.types";

const WhyOutsourceSection = ({
  register,
  control,
  savedImages,
}: HomeSectionProps) => {
  const whyOutsourceCardSections = useWatch({
    control,
    name: "whyOutsourceCardSections",
  });

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">
        Why Outsource section
      </h2>

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

      <div className="space-y-4 rounded-md border border-slate-300 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Card section</h3>

        {cardDropdowns.map((dropdown, index) => {
          const whyCardSummary =
            whyOutsourceCardSections?.[
              index
            ]?.pointerTextWhyOutsourcing?.trim();

          return (
            <details
              key={`why-${dropdown.id}`}
              className="rounded-md border border-slate-200 p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-slate-800">
                {whyCardSummary || dropdown.title}
              </summary>

              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor={`why-${dropdown.id}-image`}
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Pointer image
                  </label>
                  <input
                    id={`why-${dropdown.id}-image`}
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register(
                      `whyOutsourceCardSections.${index}.imgPointerWhyOutsourcing`,
                    )}
                  />
                  {savedImages?.[`whyCardImage_${index}`] && (
                    <img
                      src={savedImages[`whyCardImage_${index}`]}
                      alt="Current pointer image"
                      className="mt-2 h-20 rounded object-cover"
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`why-${dropdown.id}-pointerText`}
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Pointer text
                  </label>
                  <input
                    id={`why-${dropdown.id}-pointerText`}
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
      </div>
    </section>
  );
};

export default WhyOutsourceSection;
