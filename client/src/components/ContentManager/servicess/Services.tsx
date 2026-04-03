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
              onClick={() => append(createEmptyService())}
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
