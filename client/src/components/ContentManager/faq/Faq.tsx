import { useForm } from "react-hook-form";
import axios from "axios";
import type { FormValues } from "./Faq.types";
import type { SavedImages } from "./sections/FaqProps";
import { useRef, useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";
import GeneralQuiz from "./sections/GeneralQuiz";
import BookACall from "./sections/BookACall";
import { API_BASE_URL } from "../../../config/api";
import { CmsSaveBar } from "../shared/CmsSaveBar";

const SAVE_MESSAGE_TIMEOUT_MS = 4000;

const Faq = () => {
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
        const res = await axios.get(`${API_BASE_URL}/api/content/faq`);
        const c = res.data.content;
        if (!c) return;
        setSavedImages({ bookACallImg: c.bookACall?.img });
        reset({
          heading: c.heading ?? "",
          description: c.description ?? "",
          link: c.link ?? "",
          generalQuiz: (c.generalQuiz ?? []).map(
            (item: { service?: string; description?: string }) => ({
              service: item.service ?? "",
              description: item.description ?? "",
            }),
          ),
          bookACall: {
            heading: c.bookACall?.heading ?? "",
            description: c.bookACall?.description ?? "",
          },
        });
      } catch (err) {
        console.warn("Failed to load content:", err);
        setSaveMessage("Could not load saved content. Showing defaults.");
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
    }, SAVE_MESSAGE_TIMEOUT_MS);
  };

  useEffect(() => {
    return () => {
      if (saveMessageTimer.current) clearTimeout(saveMessageTimer.current);
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Hero fields
      formData.append("heading", data.heading);
      formData.append("description", data.description);
      formData.append("link", data.link);

      // generalQuiz — no images, send as JSON
      if (data.generalQuiz?.length) {
        formData.append("generalQuiz", JSON.stringify(data.generalQuiz));
      }

      // bookACall
      formData.append("bookACallHeading", data.bookACall.heading);
      formData.append("bookACallDescription", data.bookACall.description);
      if (data.bookACall.img && data.bookACall.img.length > 0) {
        formData.append("bookACallImg", data.bookACall.img[0]);
      } else if (savedImages.bookACallImg) {
        formData.append("bookACallImg", savedImages.bookACallImg);
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/content/faq`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const content = response.data?.content;
      setSavedImages({ bookACallImg: content?.bookACall?.img });
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
      <form
        className="space-y-6"
        action="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CmsSaveBar saving={saving} saveMessage={saveMessage} />

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
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>General quiz section</span>
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
            <GeneralQuiz
              register={register}
              errors={errors}
              control={control}
            />
          </div>
        </details>

        <details className="cms-accordion group overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="cms-accordion-summary flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            <span>Book a call section</span>
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
            <BookACall
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

export default Faq;
