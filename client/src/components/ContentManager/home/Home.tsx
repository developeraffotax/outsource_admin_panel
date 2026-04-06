import { useEffect, useRef, useState } from "react";
import type { SavedImages } from "./sections/section-props.types";
import { useForm } from "react-hook-form";
import axios from "axios";
import type { FormValues } from "./home-form.types";
import ClientsTestimonialSection from "./sections/ClientsTestimonialSection";
import HeroSection from "./sections/HeroSection";
import HowWeWorkSection from "./sections/HowWeWorkSection";
import JoinUsSection from "./sections/JoinUsSection";
import ServiceSection from "./sections/ServiceSection";
import TopbarSection from "./sections/TopbarSection";
import WhyOutsourceSection from "./sections/WhyOutsourceSection";
import { API_BASE_URL } from "../../../config/api";
import {
  buildHomeFormData,
  createHomeDefaultValues,
  mapHomeFormDefaults,
  mapHomeSavedImages,
  type BackendContent,
} from "./home.helpers";

const BACKEND = API_BASE_URL;

const Home = () => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [savedImages, setSavedImages] = useState<SavedImages>({});
  // Holds the raw backend content so we can preserve existing image URLs on save
  const existingContent = useRef<BackendContent>({});
  const saveMessageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: createHomeDefaultValues(),
  });

  const loadContent = async () => {
    try {
      const res = await axios.get(`${BACKEND}/api/content/home`);
      const c: BackendContent = res.data.content;
      if (!c || Object.keys(c).length === 0) return;

      // Store the raw backend content so we can fall back to existing image URLs on save
      existingContent.current = c;
      setSavedImages(mapHomeSavedImages(c));
      reset(mapHomeFormDefaults(c));
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Failed to load content. Is the server running?";
      showSaveMessage(message);
    }
  };

  useEffect(() => {
    loadContent();
  }, [reset]);

  // Clear the save message after 4 seconds
  const showSaveMessage = (msg: string) => {
    setSaveMessage(msg);
    if (saveMessageTimer.current) clearTimeout(saveMessageTimer.current);
    saveMessageTimer.current = setTimeout(() => setSaveMessage(null), 4000);
  };

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const token = localStorage.getItem("token");
      const ec = existingContent.current;
      const formData = buildHomeFormData(data, ec);

      await axios.post(`${BACKEND}/api/content/home`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

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

  return (
    <div className="cms-form-shell mx-auto w-full max-w-5xl">
      {/* Page header */}
      <div className="cms-page-header">
        <h1 className="cms-page-title">Landing Page</h1>
        <p className="cms-page-subtitle">
          Edit the content displayed on your public landing page.
        </p>
      </div>

      <form
        className="space-y-5"
        action="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Sticky save bar */}
        <div className="cms-save-bar">
          <button type="submit" disabled={saving} className="cms-btn-primary">
            {saving && (
              <svg
                className="h-3.5 w-3.5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saveMessage && (
            <span
              className={`cms-status ${
                saveMessage === "Saved successfully!"
                  ? "cms-status-success"
                  : "cms-status-error"
              }`}
            >
              {saveMessage === "Saved successfully!" ? (
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {saveMessage}
            </span>
          )}
        </div>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Hero section</span>
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
            <HeroSection
              register={register}
              errors={errors}
              control={control}
              savedImages={savedImages}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Why outsource section</span>
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
            <WhyOutsourceSection
              register={register}
              errors={errors}
              control={control}
              savedImages={savedImages}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Service section</span>
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
            <ServiceSection
              register={register}
              errors={errors}
              control={control}
              savedImages={savedImages}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>How we work section</span>
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
            <HowWeWorkSection
              register={register}
              errors={errors}
              control={control}
              savedImages={savedImages}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Clients testimonial section</span>
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
            <ClientsTestimonialSection
              register={register}
              errors={errors}
              control={control}
              savedImages={savedImages}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Topbar section</span>
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
            <TopbarSection
              register={register}
              errors={errors}
              control={control}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Join us section</span>
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
            <JoinUsSection
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

export default Home;
