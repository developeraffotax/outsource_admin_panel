import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  cardDropdowns,
  serviceCardDropdowns,
  testimonialCardDropdowns,
} from "./home-form.types";
import type { FormValues } from "./home-form.types";
import ClientsTestimonialSection from "./sections/ClientsTestimonialSection";
import HeroSection from "./sections/HeroSection";
import HowWeWorkSection from "./sections/HowWeWorkSection";
import JoinUsSection from "./sections/JoinUsSection";
import ServiceSection from "./sections/ServiceSection";
import TopbarSection from "./sections/TopbarSection";
import WhyOutsourceSection from "./sections/WhyOutsourceSection";

const BACKEND = import.meta.env.VITE_Backend_URL as string;

// Shape of the raw content returned by the backend (image fields are URL strings)
type BackendContent = {
  title?: string;
  headingTextFirst?: string;
  headingTextMiddle?: string;
  headingTextEnd?: string;
  description?: string;
  description2?: string;
  freeConsultation?: string;
  cardSelector?: string;
  bgImage?: string;
  ukFlag?: string;
  heroCards?: {
    heroCardImg?: string;
    heroCardTitle?: string;
    heroCardContent?: string;
  }[];
  whyOutsoutcing?: string;
  headingWhyOutsoutcing?: string;
  descriptionWhyOutsoutcing?: string;
  imgWhyOutsoutcing?: string;
  imgtwoWhyOutsoutcing?: string;
  whyOutSourceAccounting?: string;
  whyOutsoutcingCards?: {
    whyCardImage?: string;
    whyCardPointerText?: string;
  }[];
  headingServiceSection?: string;
  descriptionServiceSection?: string;
  serviceCards?: {
    imgServiceCard?: string;
    titleServiceCard?: string;
    descriptionServiceCard?: string;
    buttontxtServiceCard?: string;
    pglink?: string;
  }[];
  headingHowWeWork?: string;
  howWeWorkSteps?: {
    stepNumber?: string;
    howWeWorkIcon?: string;
    stepTitle?: string;
    stepDescription?: string;
  }[];
  lineOne?: string;
  lineTwo?: string;
  headingClientsTestimonial?: string;
  testimonialsCard?: {
    testimonialBgImg?: string;
    testimonialPersonImg?: string;
    testimonialTitle?: string;
    testimonialDescription?: string;
    testimonialPersonName?: string;
  }[];
  email?: string;
  number?: string;
  eNumber?: string;
  joinUsHeading?: string;
  joinUsBgImage?: string;
};

const Home = () => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
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
    defaultValues: {
      heroCardSections: cardDropdowns.map(() => ({ title: "", content: "" })),
      whyOutsourceCardSections: cardDropdowns.map(() => ({
        pointerTextWhyOutsourcing: "",
      })),
      serviceCards: serviceCardDropdowns.map(() => ({
        titleServiceCard: "",
        descriptionServiceCard: "",
        buttontxtServiceCard: "",
        pglink: "",
      })),
      howWeWork: {
        heading: "",
        one: "",
        title: "",
        description: "",
        two: "",
        titleTwo: "",
        descriptionTwo: "",
        three: "",
        threeTitle: "",
        threeDescription: "",
      },
      clientsTestimonial: {
        heading: "",
        testimonialCards: testimonialCardDropdowns.map(() => ({
          testimonialTitle: "",
          testimonialDescription: "",
          testimonialPersonName: "",
        })),
      },
      topbar: {
        email: "",
        number: "",
        eNumber: "",
      },
      joinUs: {
        heading: "",
      },
    },
  });

  const loadContent = async () => {
    try {
      const res = await axios.get(`${BACKEND}/api/content/home`);
      const c: BackendContent = res.data.content;
      if (!c || Object.keys(c).length === 0) return;

      // Store the raw backend content so we can fall back to existing image URLs on save
      existingContent.current = c;

      reset({
        title: c.title ?? "",
        headingFirstText: c.headingTextFirst ?? "",
        headingMiddleText: c.headingTextMiddle ?? "",
        headingEndText: c.headingTextEnd ?? "",
        descriptionHeroHomepage: c.description ?? "",
        descriptionHeroHomePageTwo: c.description2 ?? "",
        freeConsultation: c.freeConsultation ?? "",
        heroCardName: c.cardSelector ?? "",
        heroCardSections: cardDropdowns.map((_, index) => ({
          title: c.heroCards?.[index]?.heroCardTitle ?? "",
          content: c.heroCards?.[index]?.heroCardContent ?? "",
        })),
        whyOutsourcing: c.whyOutsoutcing ?? "",
        headingWhyOutsourcing: c.headingWhyOutsoutcing ?? "",
        descriptionWhyOutsourcing: c.descriptionWhyOutsoutcing ?? "",
        whyOutsourceCardSections: cardDropdowns.map((_, index) => ({
          pointerTextWhyOutsourcing:
            c.whyOutsoutcingCards?.[index]?.whyCardPointerText ?? "",
        })),
        headingService: c.headingServiceSection ?? "",
        descriptionService: c.descriptionServiceSection ?? "",
        serviceCards: serviceCardDropdowns.map((_, index) => ({
          titleServiceCard: c.serviceCards?.[index]?.titleServiceCard ?? "",
          descriptionServiceCard:
            c.serviceCards?.[index]?.descriptionServiceCard ?? "",
          buttontxtServiceCard:
            c.serviceCards?.[index]?.buttontxtServiceCard ?? "",
          pglink: c.serviceCards?.[index]?.pglink ?? "",
        })),
        howWeWork: {
          heading: c.headingHowWeWork ?? "",
          one: c.howWeWorkSteps?.[0]?.stepNumber ?? "",
          title: c.howWeWorkSteps?.[0]?.stepTitle ?? "",
          description: c.howWeWorkSteps?.[0]?.stepDescription ?? "",
          two: c.howWeWorkSteps?.[1]?.stepNumber ?? "",
          titleTwo: c.howWeWorkSteps?.[1]?.stepTitle ?? "",
          descriptionTwo: c.howWeWorkSteps?.[1]?.stepDescription ?? "",
          three: c.howWeWorkSteps?.[2]?.stepNumber ?? "",
          threeTitle: c.howWeWorkSteps?.[2]?.stepTitle ?? "",
          threeDescription: c.howWeWorkSteps?.[2]?.stepDescription ?? "",
        },
        clientsTestimonial: {
          heading: c.headingClientsTestimonial ?? "",
          testimonialCards: testimonialCardDropdowns.map((_, index) => ({
            testimonialTitle:
              c.testimonialsCard?.[index]?.testimonialTitle ?? "",
            testimonialDescription:
              c.testimonialsCard?.[index]?.testimonialDescription ?? "",
            testimonialPersonName:
              c.testimonialsCard?.[index]?.testimonialPersonName ?? "",
          })),
        },
        topbar: {
          email: c.email ?? "",
          number: c.number ?? "",
          eNumber: c.eNumber ?? "",
        },
        joinUs: {
          heading: c.joinUsHeading ?? "",
        },
      });
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

      const formData = new FormData();

      // --- Text fields ---
      formData.append("title", data.title ?? "");
      formData.append("headingTextFirst", data.headingFirstText ?? "");
      formData.append("headingTextMiddle", data.headingMiddleText ?? "");
      formData.append("headingTextEnd", data.headingEndText ?? "");
      formData.append("description", data.descriptionHeroHomepage ?? "");
      formData.append("description2", data.descriptionHeroHomePageTwo ?? "");
      formData.append("freeConsultation", data.freeConsultation ?? "");
      formData.append("cardSelector", data.heroCardName ?? "");
      formData.append("whyOutsoutcing", data.whyOutsourcing ?? "");
      formData.append(
        "headingWhyOutsoutcing",
        data.headingWhyOutsourcing ?? "",
      );
      formData.append(
        "descriptionWhyOutsoutcing",
        data.descriptionWhyOutsourcing ?? "",
      );
      formData.append("headingServiceSection", data.headingService ?? "");
      formData.append(
        "descriptionServiceSection",
        data.descriptionService ?? "",
      );
      formData.append("headingHowWeWork", data.howWeWork?.heading ?? "");
      formData.append(
        "headingClientsTestimonial",
        data.clientsTestimonial?.heading ?? "",
      );
      formData.append("email", data.topbar?.email ?? "");
      formData.append("number", data.topbar?.number ?? "");
      formData.append("eNumber", data.topbar?.eNumber ?? "");
      formData.append("joinUsHeading", data.joinUs?.heading ?? "");

      // --- Single image files ---
      if (data.bgImage?.[0]) formData.append("bgImage", data.bgImage[0]);
      if (data.ukFlag?.[0]) formData.append("ukFlag", data.ukFlag[0]);
      if (data.imgWhyOutsourcing?.[0])
        formData.append("imgWhyOutsoutcing", data.imgWhyOutsourcing[0]);
      if (data.imgTwoWhyOutsourcing?.[0])
        formData.append("imgtwoWhyOutsoutcing", data.imgTwoWhyOutsourcing[0]);
      if (data.whyOutSourceAccounting?.[0])
        formData.append(
          "whyOutSourceAccounting",
          data.whyOutSourceAccounting[0],
        );
      if (data.howWeWork?.lineOne?.[0])
        formData.append("lineOne", data.howWeWork.lineOne[0]);
      if (data.howWeWork?.lineTwo?.[0])
        formData.append("lineTwo", data.howWeWork.lineTwo[0]);
      if (data.joinUs?.bgimg?.[0])
        formData.append("joinUsBgImage", data.joinUs.bgimg[0]);

      // --- Hero cards: use indexed field names so each card's image stays aligned ---
      formData.append(
        "heroCards",
        JSON.stringify(
          (data.heroCardSections ?? []).map((card, i) => ({
            heroCardImg: ec.heroCards?.[i]?.heroCardImg ?? "",
            heroCardTitle: card.title ?? "",
            heroCardContent: card.content ?? "",
          })),
        ),
      );
      (data.heroCardSections ?? []).forEach((card, i) => {
        if (card.image?.[0]) formData.append(`heroCardImg_${i}`, card.image[0]);
      });

      // --- Why Outsource cards ---
      formData.append(
        "whyOutsoutcingCards",
        JSON.stringify(
          (data.whyOutsourceCardSections ?? []).map((card, i) => ({
            whyCardImage: ec.whyOutsoutcingCards?.[i]?.whyCardImage ?? "",
            whyCardPointerText: card.pointerTextWhyOutsourcing ?? "",
          })),
        ),
      );
      (data.whyOutsourceCardSections ?? []).forEach((card, i) => {
        if (card.imgPointerWhyOutsourcing?.[0])
          formData.append(
            `whyCardImage_${i}`,
            card.imgPointerWhyOutsourcing[0],
          );
      });

      // --- Service cards ---
      formData.append(
        "serviceCards",
        JSON.stringify(
          (data.serviceCards ?? []).map((card, i) => ({
            imgServiceCard: ec.serviceCards?.[i]?.imgServiceCard ?? "",
            titleServiceCard: card.titleServiceCard ?? "",
            descriptionServiceCard: card.descriptionServiceCard ?? "",
            buttontxtServiceCard: card.buttontxtServiceCard ?? "",
            pglink: card.pglink ?? "",
          })),
        ),
      );
      (data.serviceCards ?? []).forEach((card, i) => {
        if (card.imgServiceCard?.[0])
          formData.append(`imgServiceCard_${i}`, card.imgServiceCard[0]);
      });

      // --- How We Work steps ---
      formData.append(
        "howWeWorkSteps",
        JSON.stringify([
          {
            stepNumber: data.howWeWork?.one ?? "",
            howWeWorkIcon: ec.howWeWorkSteps?.[0]?.howWeWorkIcon ?? "",
            stepTitle: data.howWeWork?.title ?? "",
            stepDescription: data.howWeWork?.description ?? "",
          },
          {
            stepNumber: data.howWeWork?.two ?? "",
            howWeWorkIcon: ec.howWeWorkSteps?.[1]?.howWeWorkIcon ?? "",
            stepTitle: data.howWeWork?.titleTwo ?? "",
            stepDescription: data.howWeWork?.descriptionTwo ?? "",
          },
          {
            stepNumber: data.howWeWork?.three ?? "",
            howWeWorkIcon: ec.howWeWorkSteps?.[2]?.howWeWorkIcon ?? "",
            stepTitle: data.howWeWork?.threeTitle ?? "",
            stepDescription: data.howWeWork?.threeDescription ?? "",
          },
        ]),
      );
      if (data.howWeWork?.oneIcon?.[0])
        formData.append("howWeWorkIcon_0", data.howWeWork.oneIcon[0]);
      if (data.howWeWork?.twoIcon?.[0])
        formData.append("howWeWorkIcon_1", data.howWeWork.twoIcon[0]);
      if (data.howWeWork?.threeIcon?.[0])
        formData.append("howWeWorkIcon_2", data.howWeWork.threeIcon[0]);

      // --- Testimonials ---
      formData.append(
        "testimonialsCard",
        JSON.stringify(
          (data.clientsTestimonial?.testimonialCards ?? []).map((card, i) => ({
            testimonialBgImg: ec.testimonialsCard?.[i]?.testimonialBgImg ?? "",
            testimonialPersonImg:
              ec.testimonialsCard?.[i]?.testimonialPersonImg ?? "",
            testimonialTitle: card.testimonialTitle ?? "",
            testimonialDescription: card.testimonialDescription ?? "",
            testimonialPersonName: card.testimonialPersonName ?? "",
          })),
        ),
      );
      (data.clientsTestimonial?.testimonialCards ?? []).forEach((card, i) => {
        if (card.testimonialBgImg?.[0])
          formData.append(`testimonialBgImg_${i}`, card.testimonialBgImg[0]);
        if (card.testimonialPersonImg?.[0])
          formData.append(
            `testimonialPersonImg_${i}`,
            card.testimonialPersonImg[0],
          );
      });

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

        <HeroSection register={register} errors={errors} control={control} />
        <WhyOutsourceSection
          register={register}
          errors={errors}
          control={control}
        />
        <ServiceSection register={register} errors={errors} control={control} />
        <HowWeWorkSection
          register={register}
          errors={errors}
          control={control}
        />
        <ClientsTestimonialSection
          register={register}
          errors={errors}
          control={control}
        />
        <TopbarSection register={register} errors={errors} control={control} />
        <JoinUsSection register={register} errors={errors} control={control} />
      </form>
    </div>
  );
};

export default Home;
