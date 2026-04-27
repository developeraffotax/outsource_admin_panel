import { useFieldArray } from "react-hook-form";
import type { AboutUsSectionProps } from "./ConatctUsProps";
import RhfFieldError from "../../shared/RhfFieldError";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const GetInTouch = ({
  register,
  errors,
  control,
  savedImages,
}: AboutUsSectionProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "getInTouch",
  });

  return (
    <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">
        Get In Touch ({fields.length})
      </h2>

      {fields.map((field, index) => (
        <details key={field.id} className="rounded-md border border-slate-200">
          <summary className="cursor-pointer bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
            {`Card ${index + 1}`}
          </summary>

          <div className="grid gap-4 border-t border-slate-200 p-4 md:grid-cols-2">
            <RhfImageUploadField
              id={`getInTouch-img-${index}`}
              label="Image"
              path={`getInTouch.${index}.img`}
              register={register}
              errors={errors}
              previewValue={savedImages?.[`getInTouchImg_${index}`]}
              previewAlt="Current card image"
            />

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
              <RhfFieldError
                errors={errors}
                path={`getInTouch.${index}.title`}
                className="mt-1 text-sm text-red-600"
              />
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
