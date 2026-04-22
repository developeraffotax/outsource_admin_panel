import { useWatch } from "react-hook-form";
import FormFieldError from "./FormFieldError";
import ImagePreview from "./ImagePreview";
import Pricing from "./Pricing";
import SectionAccordion from "./SectionAccordion";
import ServiceProcess from "./ServiceProcess";
import Statics from "./Statics";
import type { ServiceSectionProps } from "./ServicesProps";
import { useImagePreview } from "./useImagePreview";
import WhatYouGet from "./WhatYouGet";
import WhyChooseUs from "./WhyChooseUs";

type CommonSectionProps = Pick<
  ServiceSectionProps,
  "index" | "register" | "errors"
>;

type HeroSectionProps = CommonSectionProps & {
  heroImageUrl: string | null;
  heroBackgroundUrl: string | null;
  heroImageValue: unknown;
  heroBackgroundValue: unknown;
};

const HeroSection = ({
  index,
  register,
  errors,
  heroImageUrl,
  heroBackgroundUrl,
  heroImageValue,
  heroBackgroundValue,
}: HeroSectionProps) => {
  const servicePath = `services.${index}` as const;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Slug
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          {...register(`${servicePath}.slug`)}
        />
        <FormFieldError errors={errors} path={`${servicePath}.slug`} />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-sky-50 shadow-sm">
        {heroBackgroundUrl ? (
          <img
            src={heroBackgroundUrl}
            alt="Service hero background"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-sky-100 via-blue-50 to-slate-100" />
        )}
        <div className="absolute inset-0 bg-white/48" />

        <div className="relative z-10 flex flex-col gap-6 p-3 md:p-8 lg:flex-row lg:items-start lg:justify-between lg:p-10">
          <div className="w-full space-y-4 lg:w-1/2">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Title row
              </label>
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-bold text-slate-900"
                    {...register(`${servicePath}.title`)}
                  />
                  <FormFieldError
                    errors={errors}
                    path={`${servicePath}.title`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Title highlight"
                    className="w-full rounded-md border border-sky-300 bg-sky-100 px-3 py-2 text-base font-bold text-sky-900"
                    {...register(`${servicePath}.titleHighlight`)}
                  />
                  <FormFieldError
                    errors={errors}
                    path={`${servicePath}.titleHighlight`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Subtitle
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-semibold text-slate-900"
                {...register(`${servicePath}.subtitle`)}
              />
              <FormFieldError
                errors={errors}
                path={`${servicePath}.subtitle`}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Description paragraph one
              </label>
              <textarea
                rows={2}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                {...register(`${servicePath}.description`)}
              />
              <FormFieldError
                errors={errors}
                path={`${servicePath}.description`}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Description paragraph two
              </label>
              <textarea
                rows={2}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                {...register(`${servicePath}.descriptiontwo`)}
              />
              <FormFieldError
                errors={errors}
                path={`${servicePath}.descriptiontwo`}
              />
            </div>

            <div className="max-w-xs">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Button text
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                {...register(`${servicePath}.buttonText`)}
              />
              <FormFieldError
                errors={errors}
                path={`${servicePath}.buttonText`}
              />
            </div>
          </div>

          <div className="w-full space-y-3 lg:w-1/2 lg:pl-4">
            <div className="flex min-h-56 items-center justify-center rounded-xl border border-slate-200 bg-white/85 p-3">
              {heroImageUrl ? (
                <img
                  src={heroImageUrl}
                  alt="Service hero visual"
                  className="h-full w-full max-w-lg object-contain drop-shadow-2xl"
                />
              ) : (
                <p className="text-sm font-medium text-slate-500">
                  Hero image preview
                </p>
              )}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${servicePath}.img`)}
                />
                <ImagePreview value={heroImageValue} />
                <FormFieldError errors={errors} path={`${servicePath}.img`} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Background image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`${servicePath}.bgimg`)}
                />
                <ImagePreview value={heroBackgroundValue} />
                <FormFieldError errors={errors} path={`${servicePath}.bgimg`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GetStartedSection = ({ index, register, errors }: CommonSectionProps) => {
  const servicePath = `services.${index}` as const;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Heading
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`${servicePath}.GetStarted.heading`)}
          />
          <FormFieldError
            errors={errors}
            path={`${servicePath}.GetStarted.heading`}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Description One
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`${servicePath}.GetStarted.descriptionone`)}
          />
          <FormFieldError
            errors={errors}
            path={`${servicePath}.GetStarted.descriptionone`}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Description Two
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`${servicePath}.GetStarted.descriptiontwo`)}
          />
          <FormFieldError
            errors={errors}
            path={`${servicePath}.GetStarted.descriptiontwo`}
          />
        </div>
      </div>
    </div>
  );
};

type DataSectionProps = CommonSectionProps & {
  imageValue: unknown;
  sectionName: "WhatData" | "WhoData";
};

const DataSection = ({
  index,
  register,
  errors,
  imageValue,
  sectionName,
}: DataSectionProps) => {
  const servicePath = `services.${index}` as const;
  const fieldPath = `${servicePath}.${sectionName}` as const;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Heading
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`${fieldPath}.heading`)}
          />
          <FormFieldError errors={errors} path={`${fieldPath}.heading`} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`${fieldPath}.img`)}
          />
          <ImagePreview value={imageValue} />
          <FormFieldError errors={errors} path={`${fieldPath}.img`} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Description One
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`${fieldPath}.descriptionone`)}
          />
          <FormFieldError
            errors={errors}
            path={`${fieldPath}.descriptionone`}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Description Two
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            {...register(`${fieldPath}.descriptiontwo`)}
          />
          <FormFieldError
            errors={errors}
            path={`${fieldPath}.descriptiontwo`}
          />
        </div>
      </div>
    </div>
  );
};

const ServiceItem = ({
  index,
  register,
  errors,
  control,
}: ServiceSectionProps) => {
  const servicePath = `services.${index}` as const;

  const heroImageValue = useWatch({ control, name: `${servicePath}.img` });
  const heroBackgroundValue = useWatch({
    control,
    name: `${servicePath}.bgimg`,
  });
  const whatDataImageValue = useWatch({
    control,
    name: `${servicePath}.WhatData.img`,
  });
  const whoDataImageValue = useWatch({
    control,
    name: `${servicePath}.WhoData.img`,
  });

  const heroImageUrl = useImagePreview(heroImageValue, true);
  const heroBackgroundUrl = useImagePreview(heroBackgroundValue, true);

  return (
    <div className="space-y-4">
      <SectionAccordion title="Hero">
        <HeroSection
          index={index}
          register={register}
          errors={errors}
          heroImageUrl={heroImageUrl}
          heroBackgroundUrl={heroBackgroundUrl}
          heroImageValue={heroImageValue}
          heroBackgroundValue={heroBackgroundValue}
        />
      </SectionAccordion>

      <SectionAccordion title="Pricing">
        <Pricing
          index={index}
          register={register}
          errors={errors}
          control={control}
        />
      </SectionAccordion>

      <SectionAccordion title="What You Get">
        <WhatYouGet
          index={index}
          register={register}
          errors={errors}
          control={control}
        />
      </SectionAccordion>

      <SectionAccordion title="Service Process">
        <ServiceProcess
          index={index}
          register={register}
          errors={errors}
          control={control}
        />
      </SectionAccordion>

      <SectionAccordion title="Get Started">
        <GetStartedSection index={index} register={register} errors={errors} />
      </SectionAccordion>

      <SectionAccordion title="Why Choose Us">
        <WhyChooseUs
          index={index}
          register={register}
          errors={errors}
          control={control}
        />
      </SectionAccordion>

      <SectionAccordion title="Statics">
        <Statics
          index={index}
          register={register}
          errors={errors}
          control={control}
        />
      </SectionAccordion>

      <SectionAccordion title="What Data">
        <DataSection
          index={index}
          register={register}
          errors={errors}
          imageValue={whatDataImageValue}
          sectionName="WhatData"
        />
      </SectionAccordion>

      <SectionAccordion title="Who Data">
        <DataSection
          index={index}
          register={register}
          errors={errors}
          imageValue={whoDataImageValue}
          sectionName="WhoData"
        />
      </SectionAccordion>
    </div>
  );
};

export default ServiceItem;
