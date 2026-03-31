import { useFieldArray } from "react-hook-form";
import type { FaqSectionProps } from "./FaqProps";

const GeneralQuiz = ({ register, errors, control }: FaqSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "generalQuiz",
  });

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">
        General Quiz ({fields.length})
      </h2>

      {fields.map((field, index) => (
        <details
          key={field.id}
          className="rounded-md border border-slate-200"
        >
          <summary className="flex cursor-pointer items-center justify-between bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
            {`Question ${index + 1}`}
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </summary>

          <div className="grid gap-4 border-t border-slate-200 p-4">
            <div>
              <label
                htmlFor={`generalQuiz-service-${index}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Service / Question
              </label>
              <input
                id={`generalQuiz-service-${index}`}
                type="text"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register(`generalQuiz.${index}.service`)}
              />
              {errors.generalQuiz?.[index]?.service && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.generalQuiz[index]?.service?.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`generalQuiz-description-${index}`}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Description / Answer
              </label>
              <textarea
                id={`generalQuiz-description-${index}`}
                rows={3}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register(`generalQuiz.${index}.description`)}
              />
            </div>
          </div>
        </details>
      ))}

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => append({ service: "", description: "" })}
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          + Add a question
        </button>
      </div>
    </section>
  );
};

export default GeneralQuiz;
