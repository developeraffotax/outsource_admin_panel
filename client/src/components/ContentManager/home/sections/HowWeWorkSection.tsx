import type { Path } from "react-hook-form";
import type { FormValues } from "../home-form.types";
import type { HomeSectionProps, SavedImages } from "./section-props.types";

type StepCardProps = {
  stepIndex: number;
  stepLabel: string;
  stepNumberField: Path<FormValues>;
  iconField: Path<FormValues>;
  titleField: Path<FormValues>;
  descriptionField: Path<FormValues>;
  imageKey: string;
  iconErrorMessage?: string;
  titleErrorMessage?: string;
  descriptionErrorMessage?: string;
  savedImages: SavedImages | undefined;
  register: HomeSectionProps["register"];
};

const StepCard = ({
  stepIndex,
  stepLabel,
  stepNumberField,
  iconField,
  titleField,
  descriptionField,
  imageKey,
  iconErrorMessage,
  titleErrorMessage,
  descriptionErrorMessage,
  savedImages,
  register,
}: StepCardProps) => {
  const stepNumber = stepIndex + 1;
  const iconInputId = `howWeWork-icon-${stepNumber}`;
  const titleInputId = `howWeWork-title-${stepNumber}`;
  const descriptionInputId = `howWeWork-description-${stepNumber}`;
  const stepNumberInputId = `howWeWork-stepNumber-${stepNumber}`;
  const savedIconUrl = savedImages?.[imageKey];

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm">
      <div className="absolute -left-2 -top-2 rounded-full border border-slate-300 bg-white px-2 py-0.5 shadow-sm">
        <input
          id={stepNumberInputId}
          type="text"
          className="w-8 border-none bg-transparent p-0 text-center text-xs font-semibold text-slate-700"
          {...register(stepNumberField)}
        />
      </div>

      <div className="mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full border border-slate-600 bg-white p-3 shadow-lg md:h-28 md:w-28">
        {savedIconUrl ? (
          <img
            src={savedIconUrl}
            alt={`${stepLabel} icon`}
            className="h-full w-full rounded-full object-contain"
          />
        ) : (
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Icon {stepNumber}
          </span>
        )}
      </div>

      <label
        htmlFor={iconInputId}
        className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-600"
      >
        {stepLabel} icon
      </label>
      <input
        id={iconInputId}
        type="file"
        accept="image/*"
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        {...register(iconField)}
      />
      {iconErrorMessage && (
        <p className="mt-1 text-sm text-red-600">{iconErrorMessage}</p>
      )}

      <label
        htmlFor={titleInputId}
        className="mb-1 mt-3 block text-xs font-medium uppercase tracking-wide text-slate-600"
      >
        {stepLabel} title
      </label>
      <input
        id={titleInputId}
        type="text"
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-center text-base font-semibold text-slate-800"
        {...register(titleField)}
      />
      {titleErrorMessage && (
        <p className="mt-1 text-sm text-red-600">{titleErrorMessage}</p>
      )}

      <label
        htmlFor={descriptionInputId}
        className="mb-1 mt-3 block text-xs font-medium uppercase tracking-wide text-slate-600"
      >
        {stepLabel} description
      </label>
      <textarea
        id={descriptionInputId}
        rows={3}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-600"
        {...register(descriptionField)}
      />
      {descriptionErrorMessage && (
        <p className="mt-1 text-sm text-red-600">{descriptionErrorMessage}</p>
      )}
    </div>
  );
};

const HowWeWorkSection = ({
  register,
  errors,
  savedImages,
}: HomeSectionProps) => {
  return (
    <section className="cms-section-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="cms-section-header flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <span className="cms-section-accent h-4 w-1 rounded-full bg-indigo-500"></span>
        <h2 className="cms-section-title text-sm font-semibold uppercase tracking-wide text-slate-700">
          How We Work
        </h2>
      </div>
      <div className="cms-section-body space-y-3 p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-b from-sky-50 via-white to-slate-50 shadow-sm">
          <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-sky-200/35 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-amber-200/30 blur-2xl" />

          <div className="relative z-10 px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
            <div className="mx-auto w-full max-w-5xl space-y-6">
              <div className="mx-auto w-full max-w-2xl">
                <label
                  htmlFor="howWeWork-heading"
                  className="mb-1 block text-center text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Section heading
                </label>
                <input
                  id="howWeWork-heading"
                  type="text"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-center text-2xl font-bold text-slate-800"
                  {...register("howWeWork.heading")}
                />
                {errors.howWeWork?.heading && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.howWeWork.heading.message as string}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 items-start gap-y-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-x-2">
                <StepCard
                  stepIndex={0}
                  stepLabel="Step 1"
                  stepNumberField="howWeWork.one"
                  iconField="howWeWork.oneIcon"
                  titleField="howWeWork.title"
                  descriptionField="howWeWork.description"
                  imageKey="howWeWorkIcon_0"
                  iconErrorMessage={errors.howWeWork?.oneIcon?.message as string | undefined}
                  titleErrorMessage={errors.howWeWork?.title?.message as string | undefined}
                  descriptionErrorMessage={errors.howWeWork?.description?.message as string | undefined}
                  savedImages={savedImages}
                  register={register}
                />

                <div className="hidden h-full items-center justify-center md:flex">
                  {savedImages?.lineOne ? (
                    <img
                      src={savedImages.lineOne}
                      alt="Connector line 1"
                      className="w-22 object-contain lg:w-26"
                    />
                  ) : (
                    <span className="h-0.5 w-18 rounded-full bg-slate-300" />
                  )}
                </div>

                <StepCard
                  stepIndex={1}
                  stepLabel="Step 2"
                  stepNumberField="howWeWork.two"
                  iconField="howWeWork.twoIcon"
                  titleField="howWeWork.titleTwo"
                  descriptionField="howWeWork.descriptionTwo"
                  imageKey="howWeWorkIcon_1"
                  iconErrorMessage={errors.howWeWork?.twoIcon?.message as string | undefined}
                  titleErrorMessage={errors.howWeWork?.titleTwo?.message as string | undefined}
                  descriptionErrorMessage={errors.howWeWork?.descriptionTwo?.message as string | undefined}
                  savedImages={savedImages}
                  register={register}
                />

                <div className="hidden h-full items-center justify-center md:flex">
                  {savedImages?.lineTwo ? (
                    <img
                      src={savedImages.lineTwo}
                      alt="Connector line 2"
                      className="w-22 object-contain lg:w-26"
                    />
                  ) : (
                    <span className="h-0.5 w-18 rounded-full bg-slate-300" />
                  )}
                </div>

                <StepCard
                  stepIndex={2}
                  stepLabel="Step 3"
                  stepNumberField="howWeWork.three"
                  iconField="howWeWork.threeIcon"
                  titleField="howWeWork.threeTitle"
                  descriptionField="howWeWork.threeDescription"
                  imageKey="howWeWorkIcon_2"
                  iconErrorMessage={errors.howWeWork?.threeIcon?.message as string | undefined}
                  titleErrorMessage={errors.howWeWork?.threeTitle?.message as string | undefined}
                  descriptionErrorMessage={errors.howWeWork?.threeDescription?.message as string | undefined}
                  savedImages={savedImages}
                  register={register}
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white/92 p-3">
                  <label
                    htmlFor="howWeWork-lineOne"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Connector line 1
                  </label>
                  <input
                    id="howWeWork-lineOne"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register("howWeWork.lineOne")}
                  />
                  {savedImages?.lineOne && (
                    <img
                      src={savedImages.lineOne}
                      alt="Current line 1"
                      className="mt-2 h-16 w-full rounded bg-white object-contain"
                    />
                  )}
                  {errors.howWeWork?.lineOne && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.lineOne.message as string}
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/92 p-3">
                  <label
                    htmlFor="howWeWork-lineTwo"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Connector line 2
                  </label>
                  <input
                    id="howWeWork-lineTwo"
                    type="file"
                    accept="image/*"
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register("howWeWork.lineTwo")}
                  />
                  {savedImages?.lineTwo && (
                    <img
                      src={savedImages.lineTwo}
                      alt="Current line 2"
                      className="mt-2 h-16 w-full rounded bg-white object-contain"
                    />
                  )}
                  {errors.howWeWork?.lineTwo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.howWeWork.lineTwo.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
