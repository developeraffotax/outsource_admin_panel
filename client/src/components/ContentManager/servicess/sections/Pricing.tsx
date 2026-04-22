import { useFieldArray, useWatch } from "react-hook-form";
import FormFieldError from "./FormFieldError";
import type { ServiceSectionProps } from "./ServicesProps";
import type { PricingPlan } from "../Services.type";
import {
  createEmptyPricingFeature,
  createEmptyPricingPlan,
  parseOptionalNumber,
} from "../services-form.helpers";

type PricingPlanEditorProps = {
  serviceIndex: number;
  planIndex: number;
  register: ServiceSectionProps["register"];
  control: ServiceSectionProps["control"];
  errors: ServiceSectionProps["errors"];
  onRemovePlan: (index: number) => void;
};

const PricingPlanEditor = ({
  serviceIndex,
  planIndex,
  register,
  control,
  errors,
  onRemovePlan,
}: PricingPlanEditorProps) => {
  const basePath =
    `services.${serviceIndex}.Pricing.plans.${planIndex}` as const;
  const plan = useWatch({
    control,
    name: basePath,
  }) as Partial<PricingPlan> | undefined;

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: `${basePath}.features` as const,
  });

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm md:p-6 ${
        plan?.isPopular
          ? "border-blue-500 shadow-blue-100"
          : "border-gray-200 shadow-gray-100"
      }`}
    >
      {plan?.isPopular && (
        <div className="absolute -top-3 right-4 rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </div>
      )}

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Plan name"
          className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-xl font-semibold text-gray-900 outline-none focus:border-blue-200 focus:bg-blue-50"
          {...register(`${basePath}.name` as const)}
        />
        <FormFieldError errors={errors} path={`${basePath}.name`} />
        <input
          type="text"
          placeholder="Plan description"
          className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-sm text-gray-600 outline-none focus:border-blue-200 focus:bg-blue-50"
          {...register(`${basePath}.description` as const)}
        />
        <FormFieldError errors={errors} path={`${basePath}.description`} />
        <input
          type="text"
          placeholder="Checkout name"
          className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-xs text-gray-500 outline-none focus:border-blue-200 focus:bg-blue-50"
          {...register(`${basePath}.checkoutName` as const)}
        />
        <FormFieldError errors={errors} path={`${basePath}.checkoutName`} />
        <input
          type="text"
          placeholder="Billing cycle"
          className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-xs font-medium uppercase tracking-wide text-blue-800 outline-none focus:border-blue-200 focus:bg-blue-50"
          {...register(`${basePath}.billingCycle` as const)}
        />
        <FormFieldError errors={errors} path={`${basePath}.billingCycle`} />
      </div>

      <div className="mt-4 flex items-end gap-2">
        <input
          type="text"
          placeholder="£"
          className="w-16 rounded-md border border-transparent bg-transparent px-2 py-1 text-4xl font-bold text-gray-900 outline-none focus:border-blue-200 focus:bg-blue-50"
          {...register(`${basePath}.currency` as const)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="0"
          className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-4xl font-bold text-gray-900 outline-none focus:border-blue-200 focus:bg-blue-50"
          {...register(`${basePath}.price` as const, {
            setValueAs: parseOptionalNumber,
          })}
        />
      </div>
      <FormFieldError errors={errors} path={`${basePath}.currency`} />
      <FormFieldError errors={errors} path={`${basePath}.price`} />

      <ul className="mt-6 flex flex-1 flex-col gap-2">
        {featureFields.map((featureField, featureIndex) => {
          const included =
            (plan?.features?.[featureIndex]?.included ?? true) === true;

          return (
            <li
              key={featureField.id}
              className="grid grid-cols-[auto_1fr_auto] items-start gap-2 text-sm"
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300"
                {...register(
                  `${basePath}.features.${featureIndex}.included` as const,
                )}
              />
              <input
                type="text"
                placeholder="Feature"
                className={`w-full rounded-md border border-transparent bg-transparent px-2 py-1 outline-none focus:border-blue-200 focus:bg-blue-50 ${
                  included ? "text-gray-700" : "text-gray-500 line-through"
                }`}
                {...register(
                  `${basePath}.features.${featureIndex}.text` as const,
                )}
              />
              <FormFieldError
                errors={errors}
                path={`${basePath}.features.${featureIndex}.text`}
              />
              <button
                type="button"
                onClick={() => removeFeature(featureIndex)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Plan ID
            </label>
            <input
              type="text"
              placeholder="aa-starter"
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              {...register(`${basePath}.id` as const)}
            />
            <FormFieldError errors={errors} path={`${basePath}.id`} />
          </div>

          <label className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-700 md:mt-0 md:self-end">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
              {...register(`${basePath}.isPopular` as const)}
            />
            Show "Most Popular" badge
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => appendFeature(createEmptyPricingFeature())}
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            + Add feature
          </button>

          <button
            type="button"
            onClick={() => onRemovePlan(planIndex)}
            className="text-sm font-medium text-red-500 hover:text-red-700"
          >
            Remove plan
          </button>
        </div>
      </div>
    </article>
  );
};

const Pricing = ({ index, register, control, errors }: ServiceSectionProps) => {
  const {
    fields: planFields,
    append: appendPlan,
    remove: removePlan,
  } = useFieldArray({
    control,
    name: `services.${index}.Pricing.plans`,
  });

  return (
    <div className="my-6 md:my-12 lg:my-16">
      <section
        id="pricing"
        className="rounded-2xl border border-blue-100 bg-linear-to-b from-blue-50 to-white px-4 py-8 md:px-8 md:py-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <input
            type="text"
            placeholder="Transparent Pricing"
            className="mx-auto block w-full max-w-sm rounded-md border border-transparent bg-transparent px-2 py-1 text-center text-sm font-semibold uppercase tracking-wide text-blue-800 outline-none focus:border-blue-200 focus:bg-white"
            {...register(`services.${index}.Pricing.config.eyebrow`)}
          />
          <FormFieldError
            errors={errors}
            path={`services.${index}.Pricing.config.eyebrow`}
          />

          <input
            type="text"
            placeholder="Annual Accounts Plans"
            className="mx-auto mt-2 block w-full max-w-2xl rounded-md border border-transparent bg-transparent px-2 py-1 text-center text-2xl font-semibold text-gray-900 outline-none focus:border-blue-200 focus:bg-white md:text-4xl"
            {...register(`services.${index}.Pricing.config.title`)}
          />
          <FormFieldError
            errors={errors}
            path={`services.${index}.Pricing.config.title`}
          />

          <textarea
            rows={2}
            placeholder="Choose the right annual accounts package for your company size and filing needs."
            className="mx-auto mt-3 block w-full max-w-3xl resize-none rounded-md border border-transparent bg-transparent px-2 py-1 text-center text-sm text-gray-600 outline-none focus:border-blue-200 focus:bg-white md:text-base"
            {...register(`services.${index}.Pricing.config.description`)}
          />
          <FormFieldError
            errors={errors}
            path={`services.${index}.Pricing.config.description`}
          />
        </div>

        {planFields.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {planFields.map((planField, planIndex) => (
              <PricingPlanEditor
                key={planField.id}
                serviceIndex={index}
                planIndex={planIndex}
                register={register}
                control={control}
                errors={errors}
                onRemovePlan={removePlan}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-blue-200 bg-white/60 px-4 py-6 text-center text-sm text-blue-900">
            No plans added yet. Click below to add your first pricing plan.
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => appendPlan(createEmptyPricingPlan())}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
          >
            + Add plan
          </button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
