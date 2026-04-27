import type { FaqSectionProps } from "./FaqProps";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

const BookACall = ({ register, savedImages }: FaqSectionProps) => {
  return (
    <section className="cms-subsection-card space-y-4 rounded-lg border border-slate-200 p-4">
      <h2 className="text-base font-semibold text-slate-900">Book a Call</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="bookACall-heading"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Heading
          </label>
          <input
            type="text"
            id="bookACall-heading"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("bookACall.heading")}
          />
        </div>

        <RhfImageUploadField
          id="bookACall-img"
          label="Image"
          path="bookACall.img"
          register={register}
          previewValue={savedImages?.bookACallImg}
          previewAlt="Current book a call"
        />

        <div className="md:col-span-2">
          <label
            htmlFor="bookACall-description"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <input
            type="text"
            id="bookACall-description"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register("bookACall.description")}
          />
        </div>
      </div>
    </section>
  );
};

export default BookACall;
