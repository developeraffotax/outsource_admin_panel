import { useWatch } from "react-hook-form";
import RhfTextInput from "../../shared/RhfTextInput";
import RhfTextarea from "../../shared/RhfTextarea";
import Pricing from "./Pricing";
import SectionAccordion from "./SectionAccordion";
import ServiceProcess from "./ServiceProcess";
import Statics from "./Statics";
import type { ServiceSectionProps } from "./ServicesProps";
import { useImagePreview } from "../../shared/useImagePreview";
import WhatYouGet from "./WhatYouGet";
import WhyChooseUs from "./WhyChooseUs";
import RhfImageUploadField from "../../shared/RhfImageUploadField";

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
      <RhfTextInput
        label="Slug"
        path={`${servicePath}.slug`}
        register={register}
        errors={errors}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        labelClassName="mb-1 block text-sm font-medium text-slate-700"
      />

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
                <RhfTextInput
                  path={`${servicePath}.title`}
                  register={register}
                  errors={errors}
                  placeholder="Title"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-bold text-slate-900"
                />
                <RhfTextInput
                  path={`${servicePath}.titleHighlight`}
                  register={register}
                  errors={errors}
                  placeholder="Title highlight"
                  className="w-full rounded-md border border-sky-300 bg-sky-100 px-3 py-2 text-base font-bold text-sky-900"
                />
              </div>
            </div>

            <RhfTextInput
              label="Subtitle"
              path={`${servicePath}.subtitle`}
              register={register}
              errors={errors}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-semibold text-slate-900"
              labelClassName="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600"
            />

            <RhfTextarea
              label="Description paragraph one"
              path={`${servicePath}.description`}
              register={register}
              errors={errors}
              rows={2}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              labelClassName="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600"
            />

            <RhfTextarea
              label="Description paragraph two"
              path={`${servicePath}.descriptiontwo`}
              register={register}
              errors={errors}
              rows={2}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              labelClassName="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600"
            />

            <div className="max-w-xs">
              <RhfTextInput
                label="Button text"
                path={`${servicePath}.buttonText`}
                register={register}
                errors={errors}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                labelClassName="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600"
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
              <RhfImageUploadField
                id={`${servicePath}-img`}
                label="Image"
                path={`${servicePath}.img`}
                register={register}
                errors={errors}
                previewValue={heroImageValue}
                allowFileListPreview
              />

              <RhfImageUploadField
                id={`${servicePath}-bgimg`}
                label="Background image"
                path={`${servicePath}.bgimg`}
                register={register}
                errors={errors}
                previewValue={heroBackgroundValue}
                allowFileListPreview
              />
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
        <RhfTextInput
          label="Heading"
          path={`${servicePath}.GetStarted.heading`}
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
        <RhfTextInput
          label="Description One"
          path={`${servicePath}.GetStarted.descriptionone`}
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
        <RhfTextInput
          label="Description Two"
          path={`${servicePath}.GetStarted.descriptiontwo`}
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
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
        <RhfTextInput
          label="Heading"
          path={`${fieldPath}.heading`}
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
        <RhfImageUploadField
          id={`${fieldPath}-img`}
          label="Image"
          path={`${fieldPath}.img`}
          register={register}
          errors={errors}
          previewValue={imageValue}
          allowFileListPreview
        />
        <RhfTextInput
          label="Description One"
          path={`${fieldPath}.descriptionone`}
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
        <RhfTextInput
          label="Description Two"
          path={`${fieldPath}.descriptiontwo`}
          register={register}
          errors={errors}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          labelClassName="mb-1 block text-sm font-medium text-slate-700"
        />
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
