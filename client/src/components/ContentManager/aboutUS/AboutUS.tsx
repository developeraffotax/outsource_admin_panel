import { useForm } from "react-hook-form";
import axios from "axios";
import AboutUsSection from "./sections/AboutUsSection";
import type { FormValues } from "./about-Form.types";
import type { SavedImages } from "./sections/AboutUsProp";
import { useRef } from "react";

import { useEffect, useState } from "react";
import OurStory from "./sections/OurStory";
import OurValue from "./sections/OurValue";
import {
  buildAboutUsFormData,
  mapAboutUsFormDefaults,
  mapAboutUsSavedImages,
} from "./aboutUS.helpers";

const BACKEND = import.meta.env.VITE_Backend_URL as string;

const AboutUS = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [savedImages, setSavedImages] = useState<SavedImages>({});
  const saveMessageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await axios.get(`${BACKEND}/api/content/about-us`);
        const c = res.data.content;
        if (!c) return;

        setSavedImages(mapAboutUsSavedImages(c));
        reset(mapAboutUsFormDefaults(c));
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
    saveMessageTimer.current = setTimeout(() => {
      setSaveMessage(null);
    }, 4000);
  };
  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const token = localStorage.getItem("token");
      const formData = buildAboutUsFormData(data, savedImages);

      const response = await axios.post(
        `${BACKEND}/api/content/about-us`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSavedImages(mapAboutUsSavedImages(response.data?.content));
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
        <AboutUsSection
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
        <OurStory
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
        <OurValue
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
      </form>
    </div>
  );
};

export default AboutUS;
