import { useFieldArray } from "react-hook-form";
import type { AboutUsSectionProps } from "./ConatctUsProps";

const GetInTouch = ({ register, errors, control }: AboutUsSectionProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "getInTouch",
  });

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">
        Get In Touch ({fields.length})
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
                htmlFor={`getInTouch-img-${index}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Image
              </label>
              <input
                id={`getInTouch-img-${index}`}
                type="file"
                accept="image/*"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register(`getInTouch.${index}.img`)}
              />
            </div>

            <div>
              <label
                htmlFor={`getInTouch-title-${index}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Title
              </label>
              <input
                id={`getInTouch-title-${index}`}
                type="text"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register(`getInTouch.${index}.title`)}
              />
              {errors.getInTouch?.[index]?.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.getInTouch[index]?.title?.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`getInTouch-description-${index}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <input
                id={`getInTouch-description-${index}`}
                type="text"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register(`getInTouch.${index}.description`)}
              />
            </div>

            <div>
              <label
                htmlFor={`getInTouch-detail-${index}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Detail
              </label>
              <input
                id={`getInTouch-detail-${index}`}
                type="text"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register(`getInTouch.${index}.detail`)}
              />
            </div>
          </div>
        </details>
      ))}

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() =>
            append({
              img: undefined as unknown as FileList,
              title: "",
              description: "",
              detail: "",
            })
          }
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          + Add a card
        </button>
      </div>
    </section>
  );
};

export default GetInTouch;
