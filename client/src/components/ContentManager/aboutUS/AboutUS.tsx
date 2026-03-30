import form from "react-hook-form";
import axios from "axios";
import AboutUsSection from "./sections/AboutUsSection";
import type { FormValues } from "./homeForm.types";

import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_Backend_URL as string;

const aboutUS = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form.useForm<FormValues>();
  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      await axios.post(`${BACKEND}/api/content/about-us`, data);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      // Handle error (e.g., show a notification)
    }
  };

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await axios.get(`${BACKEND}/api/content/about-us`);
        const c = res.data.content;
        if (!c) return;
        // Map backend content to form fields if necessary
        // For example, if c has a "title" field:
        // reset({ title: c.title });
      } catch {
        // silently ignore — form keeps its defaults
      }
    };
    loadContent();
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <form
        className="space-y-6"
        action="post"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <AboutUsSection register={register} errors={errors} control={control} />
      </form>
    </div>
  );
};

export default aboutUS;
