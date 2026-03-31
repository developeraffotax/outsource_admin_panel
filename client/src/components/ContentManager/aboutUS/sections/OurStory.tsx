import { useFieldArray } from "react-hook-form";
import type { AboutUsSectionProps } from "./AboutUsProp";

const OurStory = ({ register, errors, control }: AboutUsSectionProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "OurStory.missionStatmentCards",
  });

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Our Story</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="imgOurStory"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            imgOurStory
          </label>
          <input
            id="imgOurStory"
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("OurStory.imgOurStory")}
          />
        </div>
        <div>
          <label
            htmlFor="headingOurStory"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            headingOurStory
          </label>
          <input
            type="text"
            id="headingOurStory"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("OurStory.headingOurStory")}
          />
        </div>
        <div>
          <label
            htmlFor="descriptionOurStory"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            descriptionOurStory
          </label>
          <input
            type="text"
            id="descriptionOurStory"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("OurStory.descriptionOurStory")}
          />
        </div>
        <div>
          <label
            htmlFor="descriptiontwoOurStory"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            descriptiontwoOurStory
          </label>
          <input
            type="text"
            id="descriptiontwoOurStory"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("OurStory.descriptiontwoOurStory")}
          />
        </div>
      </div>

      <section className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h2 className="text-base font-semibold text-slate-900">
          missionStatmentCards ({fields.length})
        </h2>

        {fields.map((field, index) => (
          <details
            key={field.id}
            className="rounded-md border border-slate-200"
          >
            <summary className="cursor-pointer bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
              {`Card ${index + 1}`}
            </summary>

            <div className="grid gap-4 border-t border-slate-200 p-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor={`imgStatment-${index}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Image
                </label>
                <input
                  id={`imgStatment-${index}`}
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`OurStory.missionStatmentCards.${index}.imgStatment`)}
                />
              </div>

              <div>
                <label
                  htmlFor={`headingStatment-${index}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Heading
                </label>
                <input
                  id={`headingStatment-${index}`}
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`OurStory.missionStatmentCards.${index}.headingStatment`)}
                />
                {errors.OurStory?.missionStatmentCards?.[index]?.headingStatment && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.OurStory.missionStatmentCards[index]?.headingStatment?.message as string}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor={`descriptionStatement-${index}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>
                <input
                  id={`descriptionStatement-${index}`}
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`OurStory.missionStatmentCards.${index}.descriptionStatement`)}
                />
              </div>
            </div>
          </details>
        ))}

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => append({ imgStatment: undefined as unknown as FileList, headingStatment: "", descriptionStatement: "" })}
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            + Add a card
          </button>
        </div>
      </section>
    </section>
  );
};

export default OurStory;
