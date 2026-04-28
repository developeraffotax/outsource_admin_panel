import { useFieldArray } from "react-hook-form";
import RhfTextInput from "../../shared/RhfTextInput";
import type { AboutUsSectionProps } from "./AboutUsProp";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const OurValue = ({
  register,
  errors,
  control,
  savedImages,
}: AboutUsSectionProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "OurValue",
  });

  return (
    <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">
        Our Value ({fields.length})
      </h2>

      {fields.map((field, index) => (
        <details key={field.id} className="rounded-md border border-slate-200">
          <summary className="cursor-pointer bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
            {`Card ${index + 1}`}
          </summary>

          <div className="grid gap-4 border-t border-slate-200 p-4 md:grid-cols-2">
            <RhfImageUploadField
              id={`imgValue-${index}`}
              label="Image"
              path={`OurValue.${index}.imgValue`}
              register={register}
              errors={errors}
              previewValue={savedImages?.[`imgValue_${index}`]}
              previewAlt="Current value image"
            />

            <RhfTextInput
              label="Heading"
              path={`OurValue.${index}.headingValue`}
              register={register}
              errors={errors}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              labelClassName="mb-1 block text-sm font-medium text-slate-700"
            />

            <RhfTextInput
              label="Description"
              path={`OurValue.${index}.descriptionValue`}
              register={register}
              errors={errors}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
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
              imgValue: undefined,
              headingValue: "",
              descriptionValue: "",
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

export default OurValue;
