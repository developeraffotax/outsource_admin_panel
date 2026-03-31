import type { ServiceSectionProps } from "./ServicesProps";
import WhatYouGet from "./WhatYouGet";
import ServiceProcess from "./ServiceProcess";
import WhyChooseUs from "./WhyChooseUs";
import Statics from "./Statics";

const ServiceItem = ({ index, register, errors, control }: ServiceSectionProps) => {
  const p = `services.${index}` as const;

  return (
    <div className="space-y-4">
      {/* Hero */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Hero</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.slug`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.title`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Title Highlight</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.titleHighlight`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Subtitle</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.subtitle`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Button Text</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.buttonText`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Image</label>
            <input type="file" accept="image/*" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.img`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Background Image</label>
            <input type="file" accept="image/*" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.bgimg`)} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.description`)} />
          </div>
        </div>
      </section>

      <WhatYouGet index={index} register={register} errors={errors} control={control} />
      <ServiceProcess index={index} register={register} errors={errors} control={control} />

      {/* Get Started */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Get Started</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Heading</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.GetStarted.heading`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description One</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.GetStarted.descriptionone`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description Two</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.GetStarted.descriptiontwo`)} />
          </div>
        </div>
      </section>

      <WhyChooseUs index={index} register={register} errors={errors} control={control} />
      <Statics index={index} register={register} errors={errors} control={control} />

      {/* What Data */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">What Data</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Heading</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.WhatData.heading`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Image</label>
            <input type="file" accept="image/*" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.WhatData.img`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description One</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.WhatData.descriptionone`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description Two</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.WhatData.descriptiontwo`)} />
          </div>
        </div>
      </section>

      {/* Who Data */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Who Data</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Heading</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.WhoData.heading`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Image</label>
            <input type="file" accept="image/*" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.WhoData.img`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description One</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.WhoData.descriptionone`)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description Two</label>
            <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register(`${p}.WhoData.descriptiontwo`)} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceItem;
