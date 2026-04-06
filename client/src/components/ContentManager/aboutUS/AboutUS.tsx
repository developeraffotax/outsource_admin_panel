import { useForm } from "react-hook-form";
import axios from "axios";
import AboutUsSection from "./sections/AboutUsSection";
import type { FormValues } from "./about-Form.types";
import type { SavedImages } from "./sections/AboutUsProp";
import { useRef } from "react";

import { useEffect, useState } from "react";
import OurStory from "./sections/OurStory";
import OurValue from "./sections/OurValue";
import { API_BASE_URL } from "../../../config/api";
import {
  buildAboutUsFormData,
  mapAboutUsFormDefaults,
  mapAboutUsSavedImages,
} from "./aboutUS.helpers";

const BACKEND = API_BASE_URL;

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
      <div className="cms-form-shell mx-auto w-full max-w-5xl">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="cms-form-shell mx-auto w-full max-w-5xl">
      <form
        className="space-y-6"
        action="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} className="cms-btn-primary">
            {saving ? "Saving..." : "Save"}
          </button>
          {saveMessage && (
            <span
              className={`cms-status ${saveMessage === "Saved successfully!" ? "cms-status-success" : "cms-status-error"}`}
            >
              {saveMessage}
            </span>
          )}
        </div>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>About us section</span>
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
          <div className="cms-accordion-content border-t border-slate-100 p-3">
            <AboutUsSection
              register={register}
              errors={errors}
              control={control}
              savedImages={savedImages}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Our story section</span>
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
          <div className="cms-accordion-content border-t border-slate-100 p-3">
            <OurStory
              register={register}
              errors={errors}
              control={control}
              savedImages={savedImages}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Our value section</span>
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
          <div className="cms-accordion-content border-t border-slate-100 p-3">
            <OurValue
              register={register}
              errors={errors}
              control={control}
              savedImages={savedImages}
            />
          </div>
        </details>
      </form>
    </div>
  );
};

export default AboutUS;
