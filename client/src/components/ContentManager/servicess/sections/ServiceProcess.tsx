import type { MouseEvent } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import RhfTextInput from "../../shared/RhfTextInput";
import type { ServiceSectionProps } from "./ServicesProps";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const ServiceProcess = ({
  index,
  register,
  control,
  errors,
}: ServiceSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services.${index}.ServiceProcess.stepCard`,
  });
  const stepValues = useWatch({
    control,
    name: `services.${index}.ServiceProcess.stepCard`,
  });

  const handleRemoveStep = (
    event: MouseEvent<HTMLButtonElement>,
    stepIndex: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    remove(stepIndex);
  };

  return (
    <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-900">Service Process</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <RhfTextInput
          label="Heading"
          path={`services.${index}.ServiceProcess.heading`}
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
        <RhfTextInput
          label="Highlight Heading"
          path={`services.${index}.ServiceProcess.highlightheading`}
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">
          Steps ({fields.length})
        </p>

        {fields.map((field, stepIndex) => (
          <details
            key={field.id}
            className="rounded-md border border-slate-200"
          >
            <summary className="flex cursor-pointer items-center justify-between bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
              {`Step ${stepIndex + 1}`}
              <button
                type="button"
                onClick={(event) => handleRemoveStep(event, stepIndex)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </summary>
            <div className="grid gap-4 border-t border-slate-200 p-4 md:grid-cols-2">
              <RhfImageUploadField
                id={`service-process-step-${stepIndex}-img`}
                label="Image"
                path={`services.${index}.ServiceProcess.stepCard.${stepIndex}.imgSrc`}
                register={register}
                errors={errors}
                previewValue={stepValues?.[stepIndex]?.imgSrc}
                allowFileListPreview
              />
              <RhfTextInput
                label="Title"
                path={`services.${index}.ServiceProcess.stepCard.${stepIndex}.title`}
                register={register}
                errors={errors}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                labelClassName="mb-1 block text-sm font-medium text-slate-700"
              />
              <RhfTextInput
                label="Description"
                path={`services.${index}.ServiceProcess.stepCard.${stepIndex}.description`}
                register={register}
                errors={errors}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
                labelClassName="mb-1 block text-sm font-medium text-slate-700"
              />
            </div>
          </details>
        ))}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              append({ imgSrc: undefined, title: "", description: "" })
            }
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            + Add step
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
