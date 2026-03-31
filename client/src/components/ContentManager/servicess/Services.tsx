import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import type { ServicesForm } from "./sections/ServicesProps";
import ServiceItem from "./sections/ServiceItem";

const BACKEND = import.meta.env.VITE_Backend_URL as string;

const Servicess = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServicesForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const saveMessageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await axios.get(`${BACKEND}/api/content/services`);
        const services = res.data.content;
        if (!Array.isArray(services) || services.length === 0) return;
        reset({ services });
      } catch {
        // silently ignore — form keeps its defaults
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [reset]);

  const showSaveMessage = (msg: string) => {
    setSaveMessage(msg);
    if (saveMessageTimer.current) clearTimeout(saveMessageTimer.current);
    saveMessageTimer.current = setTimeout(() => setSaveMessage(null), 4000);
  };

  const onSubmit = async (data: ServicesForm) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Send all text data as JSON
      const textData = data.services.map((svc) => ({
        slug: svc.slug,
        title: svc.title,
        titleHighlight: svc.titleHighlight,
        subtitle: svc.subtitle,
        description: svc.description,
        buttonText: svc.buttonText,
        WhatYouGet: {
          heading: svc.WhatYouGet?.heading,
          card: svc.WhatYouGet?.card?.map((c) => ({
            title: c.title,
            description: c.description,
          })),
        },
        ServiceProcess: {
          heading: svc.ServiceProcess?.heading,
          highlightheading: svc.ServiceProcess?.highlightheading,
          stepCard: svc.ServiceProcess?.stepCard?.map((s) => ({
            title: s.title,
            description: s.description,
          })),
        },
        GetStarted: svc.GetStarted,
        WhyChooseUs: {
          heading: svc.WhyChooseUs?.heading,
          card: svc.WhyChooseUs?.card?.map((c) => ({
            title: c.title,
            description: c.description,
          })),
        },
        statics: {
          heading: svc.statics?.heading,
          description: svc.statics?.description,
          card: svc.statics?.card?.map((c) => ({
            title: c.title,
            description: c.description,
          })),
        },
        WhatData: {
          heading: svc.WhatData?.heading,
          descriptionone: svc.WhatData?.descriptionone,
          descriptiontwo: svc.WhatData?.descriptiontwo,
        },
        WhoData: {
          heading: svc.WhoData?.heading,
          descriptionone: svc.WhoData?.descriptionone,
          descriptiontwo: svc.WhoData?.descriptiontwo,
        },
      }));
      formData.append("services", JSON.stringify(textData));

      // Append images with indexed names
      data.services.forEach((svc, i) => {
        if (svc.img?.[0]) formData.append(`img_${i}`, svc.img[0]);
        if (svc.bgimg?.[0]) formData.append(`bgimg_${i}`, svc.bgimg[0]);
        if (svc.WhyChooseUs?.img?.[0])
          formData.append(`whyChooseUsImg_${i}`, svc.WhyChooseUs.img[0]);
        if (svc.statics?.img?.[0])
          formData.append(`staticsImg_${i}`, svc.statics.img[0]);
        if (svc.WhatData?.img?.[0])
          formData.append(`whatDataImg_${i}`, svc.WhatData.img[0]);
        if (svc.WhoData?.img?.[0])
          formData.append(`whoDataImg_${i}`, svc.WhoData.img[0]);
        svc.WhatYouGet?.card?.forEach((c, j) => {
          if (c.img?.[0])
            formData.append(`whatYouGetCardImg_${i}_${j}`, c.img[0]);
        });
        svc.ServiceProcess?.stepCard?.forEach((s, j) => {
          if (s.imgSrc?.[0])
            formData.append(`serviceProcessStepImg_${i}_${j}`, s.imgSrc[0]);
        });
        svc.WhyChooseUs?.card?.forEach((c, j) => {
          if (c.img?.[0])
            formData.append(`whyChooseUsCardImg_${i}_${j}`, c.img[0]);
        });
        svc.statics?.card?.forEach((c, j) => {
          if (c.img?.[0]) formData.append(`staticsCardImg_${i}_${j}`, c.img[0]);
        });
      });

      await axios.post(`${BACKEND}/api/content/services`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSaveMessage("Saved successfully!");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Failed to save. Please try again.";
      setSaveMessage(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {saveMessage && (
            <span
              className={`text-sm font-medium ${saveMessage === "Saved successfully!" ? "text-green-600" : "text-red-600"}`}
            >
              {saveMessage}
            </span>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            Services ({fields.length})
          </h2>

          {fields.map((field, index) => (
            <details
              key={field.id}
              className="rounded-lg border border-slate-200"
            >
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                {`Service ${index + 1}`}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </summary>
              <div className="p-4">
                <ServiceItem
                  index={index}
                  register={register}
                  errors={errors}
                  control={control}
                />
              </div>
            </details>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                append({
                  slug: "",
                  title: "",
                  titleHighlight: "",
                  subtitle: "",
                  description: "",
                  buttonText: "",
                  img: undefined as unknown as FileList,
                  bgimg: undefined as unknown as FileList,
                  WhatYouGet: { heading: "", card: [] },
                  ServiceProcess: {
                    heading: "",
                    highlightheading: "",
                    stepCard: [],
                  },
                  GetStarted: {
                    heading: "",
                    descriptionone: "",
                    descriptiontwo: "",
                  },
                  WhyChooseUs: {
                    heading: "",
                    img: undefined as unknown as FileList,
                    card: [],
                  },
                  statics: {
                    heading: "",
                    description: "",
                    img: undefined as unknown as FileList,
                    card: [],
                  },
                  WhatData: {
                    heading: "",
                    descriptionone: "",
                    descriptiontwo: "",
                    img: undefined as unknown as FileList,
                  },
                  WhoData: {
                    heading: "",
                    descriptionone: "",
                    descriptiontwo: "",
                    img: undefined as unknown as FileList,
                  },
                })
              }
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              + Add service
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Servicess;
