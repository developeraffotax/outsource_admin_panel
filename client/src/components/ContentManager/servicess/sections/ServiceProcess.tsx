import type { MouseEvent } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import FormFieldError from "./FormFieldError";
import ImagePreview from "./ImagePreview";
import type { ServiceSectionProps } from "./ServicesProps";

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
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Heading
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`services.${index}.ServiceProcess.heading`)}
          />
          <FormFieldError
            errors={errors}
            path={`services.${index}.ServiceProcess.heading`}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Highlight Heading
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`services.${index}.ServiceProcess.highlightheading`)}
          />
          <FormFieldError
            errors={errors}
            path={`services.${index}.ServiceProcess.highlightheading`}
          />
        </div>
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
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(
                    `services.${index}.ServiceProcess.stepCard.${stepIndex}.imgSrc`,
                  )}
                />
                <ImagePreview value={stepValues?.[stepIndex]?.imgSrc} />
                <FormFieldError
                  errors={errors}
                  path={`services.${index}.ServiceProcess.stepCard.${stepIndex}.imgSrc`}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(
                    `services.${index}.ServiceProcess.stepCard.${stepIndex}.title`,
                  )}
                />
                <FormFieldError
                  errors={errors}
                  path={`services.${index}.ServiceProcess.stepCard.${stepIndex}.title`}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(
                    `services.${index}.ServiceProcess.stepCard.${stepIndex}.description`,
                  )}
                />
                <FormFieldError
                  errors={errors}
                  path={`services.${index}.ServiceProcess.stepCard.${stepIndex}.description`}
                />
              </div>
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
