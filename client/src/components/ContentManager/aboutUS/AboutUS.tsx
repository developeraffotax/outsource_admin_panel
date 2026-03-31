import { useForm } from "react-hook-form";
import axios from "axios";
import AboutUsSection from "./sections/AboutUsSection";
import type { FormValues } from "./about-Form.types";
import { useRef } from "react";

import { useEffect, useState } from "react";
import OurStory from "./sections/OurStory";
import OurValue from "./sections/OurValue";

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
  const saveMessageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await axios.get(`${BACKEND}/api/content/about-us`);
        const c = res.data.content;
        if (!c) return;
        reset({
          heading: c.heading ?? "",
          subHeading: c.subHeading ?? "",
          OurStory: {
            headingOurStory: c.OurStory?.headingOurStory ?? "",
            descriptionOurStory: c.OurStory?.descriptionOurStory ?? "",
            descriptiontwoOurStory: c.OurStory?.descriptiontwoOurStory ?? "",
            missionStatmentCards: (c.OurStory?.missionStatmentCards ?? []).map(
              (card: { headingStatment?: string; descriptionStatement?: string }) => ({
                headingStatment: card.headingStatment ?? "",
                descriptionStatement: card.descriptionStatement ?? "",
              }),
            ),
          },
          OurValue: (c.OurValue ?? []).map(
            (card: { headingValue?: string; descriptionValue?: string }) => ({
              headingValue: card.headingValue ?? "",
              descriptionValue: card.descriptionValue ?? "",
            }),
          ),
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

      // Hero text
      formData.append("heading", data.heading);
      formData.append("subheading", data.subHeading);

      // Hero image
      if (data.imgHero && data.imgHero.length > 0) {
        formData.append("imgHero", data.imgHero[0]);
      }

      // OurStory text
      if (data.OurStory?.headingOurStory)
        formData.append("headingOurStory", data.OurStory.headingOurStory);
      if (data.OurStory?.descriptionOurStory)
        formData.append(
          "descriptionOurStory",
          data.OurStory.descriptionOurStory,
        );
      if (data.OurStory?.descriptiontwoOurStory)
        formData.append(
          "descriptiontwoOurStory",
          data.OurStory.descriptiontwoOurStory,
        );

      // OurStory image
      if (data.OurStory?.imgOurStory && data.OurStory.imgOurStory.length > 0) {
        formData.append("imgOurStory", data.OurStory.imgOurStory[0]);
      }

      // missionStatmentCards — text as JSON, images as indexed files
      if (data.OurStory?.missionStatmentCards?.length) {
        const cardsData = data.OurStory.missionStatmentCards.map((card) => ({
          headingStatment: card.headingStatment,
          descriptionStatement: card.descriptionStatement,
        }));
        formData.append("missionStatmentCards", JSON.stringify(cardsData));
        data.OurStory.missionStatmentCards.forEach((card, i) => {
          if (card.imgStatment && card.imgStatment.length > 0) {
            formData.append(`imgStatment_${i}`, card.imgStatment[0]);
          }
        });
      }

      // OurValue — text as JSON, images as indexed files
      if (data.OurValue?.length) {
        const ourValueData = data.OurValue.map((card) => ({
          headingValue: card.headingValue,
          descriptionValue: card.descriptionValue,
        }));
        formData.append("OurValue", JSON.stringify(ourValueData));
        data.OurValue.forEach((card, i) => {
          if (card.imgValue && card.imgValue.length > 0) {
            formData.append(`imgValue_${i}`, card.imgValue[0]);
          }
        });
      }

      await axios.post(`${BACKEND}/api/content/about-us`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        <AboutUsSection register={register} errors={errors} control={control} />
        <OurStory register={register} errors={errors} control={control} />
        <OurValue register={register} errors={errors} control={control} />
      </form>
    </div>
  );
};

export default AboutUS;
