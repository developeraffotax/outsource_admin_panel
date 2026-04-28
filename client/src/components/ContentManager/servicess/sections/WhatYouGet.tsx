import type { MouseEvent } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import RhfTextInput from "../../shared/RhfTextInput";
import type { ServiceSectionProps } from "./ServicesProps";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const WhatYouGet = ({
  index,
  register,
  control,
  errors,
}: ServiceSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `services.${index}.WhatYouGet.card`,
  });
  const cardValues = useWatch({
    control,
    name: `services.${index}.WhatYouGet.card`,
  });

  const handleRemoveCard = (
    event: MouseEvent<HTMLButtonElement>,
    cardIndex: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    remove(cardIndex);
  };

  return (
    <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-900">What You Get</h3>

      <RhfTextInput
        label="Heading"
        path={`services.${index}.WhatYouGet.heading`}
        register={register}
        errors={errors}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        labelClassName="mb-1 block text-sm font-medium text-slate-700"
      />

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">
          Cards ({fields.length})
        </p>

        {fields.map((field, cardIndex) => (
          <details
            key={field.id}
            className="rounded-md border border-slate-200"
          >
            <summary className="flex cursor-pointer items-center justify-between bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
              {`Card ${cardIndex + 1}`}
              <button
                type="button"
                onClick={(event) => handleRemoveCard(event, cardIndex)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </summary>
            <div className="grid gap-4 border-t border-slate-200 p-4 md:grid-cols-2">
              <RhfImageUploadField
                id={`what-you-get-card-${cardIndex}-img`}
                label="Image"
                path={`services.${index}.WhatYouGet.card.${cardIndex}.img`}
                register={register}
                errors={errors}
                previewValue={cardValues?.[cardIndex]?.img}
                allowFileListPreview
              />
              <RhfTextInput
                label="Title"
                path={`services.${index}.WhatYouGet.card.${cardIndex}.title`}
                register={register}
                errors={errors}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                labelClassName="mb-1 block text-sm font-medium text-slate-700"
              />
              <RhfTextInput
                label="Description"
                path={`services.${index}.WhatYouGet.card.${cardIndex}.description`}
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
              append({
                img: undefined,
                title: "",
                description: "",
              })
            }
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            + Add card
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
