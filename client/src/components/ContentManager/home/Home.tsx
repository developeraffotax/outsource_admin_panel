import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { CmsSaveBar } from "../shared/CmsSaveBar";
import SectionAccordion from "../servicess/sections/SectionAccordion";
import {
  buildHomeFormData,
  createHomeDefaultValues,
  mapHomeFormDefaults,
  mapHomeSavedImages,
  type BackendContent,
} from "./home.helpers";

const SAVE_MESSAGE_TIMEOUT_MS = 4000;

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

  // Clear the save message after 4 seconds
  const showSaveMessage = useCallback((msg: string) => {
    setSaveMessage(msg);
    if (saveMessageTimer.current) clearTimeout(saveMessageTimer.current);
    saveMessageTimer.current = setTimeout(
      () => setSaveMessage(null),
      SAVE_MESSAGE_TIMEOUT_MS,
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/content/home`);
        if (!isMounted) return;

        const c: BackendContent = res.data.content;
        if (!c || Object.keys(c).length === 0) return;

        // Preserve existing image URLs so unchanged assets survive saves.
        existingContent.current = c;
        setSavedImages(mapHomeSavedImages(c));
        reset(mapHomeFormDefaults(c));
      } catch (err: unknown) {
        if (!isMounted) return;
        const message =
          (err as { response?: { data?: { error?: string } } })?.response?.data
            ?.error ?? "Failed to load content. Is the server running?";
        showSaveMessage(message);
      }
    };

    void loadContent();

    return () => {
      isMounted = false;
    };
  }, [reset, showSaveMessage]);

  useEffect(() => {
    return () => {
      if (saveMessageTimer.current) {
        clearTimeout(saveMessageTimer.current);
      }
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showSaveMessage("You are not authenticated. Please log in again.");
        return;
      }
      const ec = existingContent.current;
      const formData = buildHomeFormData(data, ec);

      await axios.post(`${API_BASE_URL}/api/content/home`, formData, {
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

  const sectionPanels = useMemo(
    () => [
      {
        key: "hero",
        title: "Hero section",
        content: (
          <HeroSection
            register={register}
            errors={errors}
            control={control}
            savedImages={savedImages}
          />
        ),
      },
      {
        key: "why-outsource",
        title: "Why outsource section",
        content: (
          <WhyOutsourceSection
            register={register}
            errors={errors}
            control={control}
            savedImages={savedImages}
          />
        ),
      },
      {
        key: "service",
        title: "Service section",
        content: (
          <ServiceSection
            register={register}
            errors={errors}
            control={control}
            savedImages={savedImages}
          />
        ),
      },
      {
        key: "how-we-work",
        title: "How we work section",
        content: (
          <HowWeWorkSection
            register={register}
            errors={errors}
            control={control}
            savedImages={savedImages}
          />
        ),
      },
      {
        key: "clients-testimonial",
        title: "Clients testimonial section",
        content: (
          <ClientsTestimonialSection
            register={register}
            errors={errors}
            control={control}
            savedImages={savedImages}
          />
        ),
      },
      {
        key: "topbar",
        title: "Topbar section",
        content: <TopbarSection register={register} errors={errors} control={control} />,
      },
      {
        key: "join-us",
        title: "Join us section",
        content: (
          <JoinUsSection
            register={register}
            errors={errors}
            control={control}
            savedImages={savedImages}
          />
        ),
      },
    ],
    [control, errors, register, savedImages],
  );

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
        <CmsSaveBar saving={saving} saveMessage={saveMessage} />

        {sectionPanels.map((sectionPanel) => (
          <SectionAccordion key={sectionPanel.key} title={sectionPanel.title}>
            {sectionPanel.content}
          </SectionAccordion>
        ))}
      </form>
    </div>
  );
};

export default Home;
