import { useForm } from "react-hook-form";
import axios from "axios";
import type { FormValues } from "./Faq.types";
import type { SavedImages } from "./sections/FaqProps";
import { useRef, useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";
import GeneralQuiz from "./sections/GeneralQuiz";
import BookACall from "./sections/BookACall";
import { API_BASE_URL } from "../../../config/api";

const BACKEND = API_BASE_URL;

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
        const res = await axios.get(`${BACKEND}/api/content/faq`);
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
        `${BACKEND}/api/content/faq`,
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
        <HeroSection register={register} errors={errors} control={control} />
        <GeneralQuiz register={register} errors={errors} control={control} />
        <BookACall
          register={register}
          errors={errors}
          control={control}
          savedImages={savedImages}
        />
      </form>
    </div>
  );
};

export default Faq;
