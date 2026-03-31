import { useFieldArray } from "react-hook-form";
import type { ServiceSectionProps } from "./ServicesProps";

const WhyChooseUs = ({ index, register, control }: ServiceSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services.${index}.WhyChooseUs.card`,
  });

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-900">Why Choose Us</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Heading</label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`services.${index}.WhyChooseUs.heading`)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`services.${index}.WhyChooseUs.img`)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">Cards ({fields.length})</p>

        {fields.map((field, cardIndex) => (
          <details key={field.id} className="rounded-md border border-slate-200">
            <summary className="flex cursor-pointer items-center justify-between bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
              {`Card ${cardIndex + 1}`}
              <button
                type="button"
                onClick={() => remove(cardIndex)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </summary>
            <div className="grid gap-4 border-t border-slate-200 p-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`services.${index}.WhyChooseUs.card.${cardIndex}.img`)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`services.${index}.WhyChooseUs.card.${cardIndex}.title`)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`services.${index}.WhyChooseUs.card.${cardIndex}.description`)}
                />
              </div>
            </div>
          </details>
        ))}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => append({ img: undefined as unknown as FileList, title: "", description: "" })}
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            + Add card
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
