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
    <div className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <label className="mb-4 block text-xl font-semibold text-slate-900">
        Landing page
      </label>

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

        <HeroSection
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
        <WhyOutsourceSection
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
        <ServiceSection
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
        <HowWeWorkSection
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
        <ClientsTestimonialSection
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
        <TopbarSection register={register} errors={errors} control={control} />
        <JoinUsSection
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
      </form>
    </div>
  );
};

export default Home;
