import { useFieldArray } from "react-hook-form";
import RhfTextInput from "../../shared/RhfTextInput";
import type { AboutUsSectionProps } from "./ConatctUsProps";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const GetInTouch = ({
  register,
  errors,
  control,
  savedImages,
}: AboutUsSectionProps) => {
  const { fields, append, remove } = useFieldArray({
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
          <summary className="w-full flex justify-between items-center cursor-pointer bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
            {`Card ${index + 1}`}

           <button
              type="button"
              onClick={() => remove(index)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
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

            <RhfTextInput
              label="Title"
              path={`getInTouch.${index}.title`}
              register={register}
              errors={errors}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              labelClassName="mb-1 block text-sm font-medium text-slate-700"
            />

            <RhfTextInput
              label="Description"
              path={`getInTouch.${index}.description`}
              register={register}
              errors={errors}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              labelClassName="mb-1 block text-sm font-medium text-slate-700"
            />

            <RhfTextInput
              label="Detail"
              path={`getInTouch.${index}.detail`}
              register={register}
              errors={errors}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              labelClassName="mb-1 block text-sm font-medium text-slate-700"
            />
          </div>
        </details>
      ))}

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() =>
            append({
              img: undefined,
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
