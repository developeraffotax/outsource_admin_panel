import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import type { ServicesForm } from "./sections/ServicesProps";
import ServiceItem from "./sections/ServiceItem";
import {
  appendServicesImages,
  buildServicesTextData,
  createEmptyService,
  type ExistingService,
} from "./services-form.helpers";
import { API_BASE_URL } from "../../../config/api";
import { CmsSaveBar } from "../shared/CmsSaveBar";

const BACKEND = API_BASE_URL;

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
  const [savedServices, setSavedServices] = useState<ExistingService[]>([]);
  const saveMessageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await axios.get(`${BACKEND}/api/content/services`);
        const services = res.data.content;
        if (!Array.isArray(services) || services.length === 0) return;
        setSavedServices(services as ExistingService[]);
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

  useEffect(() => {
    return () => {
      if (saveMessageTimer.current) clearTimeout(saveMessageTimer.current);
    };
  }, []);

  const onSubmit = async (data: ServicesForm) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Send all text data as JSON
      const textData = buildServicesTextData(data, savedServices);
      formData.append("services", JSON.stringify(textData));

      // Append images with indexed names
      appendServicesImages(formData, data);

      const response = await axios.post(
        `${BACKEND}/api/content/services`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const content = response.data?.content;
      if (Array.isArray(content)) {
        setSavedServices(content as ExistingService[]);
      }
      showSaveMessage("Saved successfully!");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Failed to save. Please try again.";
      showSaveMessage(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="cms-form-shell mx-auto w-full max-w-5xl">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="cms-form-shell mx-auto w-full max-w-5xl">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <CmsSaveBar saving={saving} saveMessage={saveMessage} />

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Service pages ({fields.length})</span>
            <svg
              className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <div className="cms-accordion-content space-y-4 border-t border-slate-100 p-3">
            {fields.map((field, index) => (
              <details
                key={field.id}
                className="cms-accordion group rounded-lg border border-slate-200 bg-white"
              >
                <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                  <span>{`Service ${index + 1}`}</span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </summary>
                <div className="cms-accordion-content border-t border-slate-100 p-4">
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
                onClick={() => append(createEmptyService())}
                className="cms-btn-secondary"
              >
                + Add service
              </button>
            </div>
          </div>
        </details>
      </form>
    </div>
  );
};

export default Servicess;
