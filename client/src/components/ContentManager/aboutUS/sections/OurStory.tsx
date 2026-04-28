import { useFieldArray } from "react-hook-form";
import RhfTextInput from "../../shared/RhfTextInput";
import type { AboutUsSectionProps } from "./AboutUsProp";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const OurStory = ({
  register,
  errors,
  control,
  savedImages,
}: AboutUsSectionProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: "OurStory.missionStatmentCards",
  });

  return (
    <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Our Story</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <RhfImageUploadField
            id="imgOurStory"
            label="imgOurStory"
            path="OurStory.imgOurStory"
            register={register}
            errors={errors}
            previewValue={savedImages?.imgOurStory}
            previewAlt="Current Our Story"
          />
        </div>
        <RhfTextInput
          label="headingOurStory"
          path="OurStory.headingOurStory"
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
        <RhfTextInput
          label="descriptionOurStory"
          path="OurStory.descriptionOurStory"
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
        <RhfTextInput
          label="descriptiontwoOurStory"
          path="OurStory.descriptiontwoOurStory"
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
      </div>

      <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
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
              <RhfImageUploadField
                id={`imgStatment-${index}`}
                label="Image"
                path={`OurStory.missionStatmentCards.${index}.imgStatment`}
                register={register}
                errors={errors}
                previewValue={savedImages?.[`imgStatment_${index}`]}
                previewAlt="Current card image"
              />

              <RhfTextInput
                label="Heading"
                path={`OurStory.missionStatmentCards.${index}.headingStatment`}
                register={register}
                errors={errors}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                labelClassName="mb-1 block text-sm font-medium text-slate-700"
              />

              <RhfTextInput
                label="Description"
                path={`OurStory.missionStatmentCards.${index}.descriptionStatement`}
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
                imgStatment: undefined,
                headingStatment: "",
                descriptionStatement: "",
              })
            }
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
