import type { IAboutUs } from "../models/AboutUs.model.js";
import type { IContactUs } from "../models/ContactUs.model.js";
import type { IFaq } from "../models/Faq.model.js";
import type { IHomeContent } from "../models/HomeContent.model.js";
import type { IService } from "../models/Service.model.js";
import { serviceSchemaZod } from "../models/Service.model.js";
import {
  buildUrlMap,
  collectCloudinaryUrls,
  deleteCloudinaryImages,
} from "../utils/cloudinary.utils.js";

export function parseJsonField<T>(value: unknown): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value as string);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function pickImageUrl(
  ...candidates: Array<string | null | undefined>
): string | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }
  return undefined;
}

function normalizeMulterFiles(rawFiles: unknown): Express.Multer.File[] {
  if (!rawFiles) return [];
  if (Array.isArray(rawFiles)) {
    return rawFiles as Express.Multer.File[];
  }

  const groups = Object.values(
    rawFiles as Record<string, Express.Multer.File[] | undefined>,
  );
  return groups.flatMap((group) => group ?? []);
}

export async function createFileUrlResolver(
  rawFiles: unknown,
): Promise<(fieldName: string) => string | undefined> {
  const filesArray = normalizeMulterFiles(rawFiles);
  const urlMap = await buildUrlMap(filesArray);
  return (fieldName: string): string | undefined => urlMap.get(fieldName);
}

export async function cleanupRemovedCloudinaryUrls(
  oldValue: unknown,
  newValue: unknown,
): Promise<void> {
  const oldUrls = collectCloudinaryUrls(oldValue);
  const newUrls = new Set(collectCloudinaryUrls(newValue));
  await deleteCloudinaryImages(oldUrls.filter((url) => !newUrls.has(url)));
}

export function buildHomeContentData(
  reqBody: any,
  fileUrl: (fieldName: string) => string | undefined,
): Partial<IHomeContent> {
  const heroCardsRaw = parseJsonField<{
    heroCardImg?: string;
    heroCardTitle?: string;
    heroCardContent?: string;
  }>(reqBody.heroCards);
  const whyCardsRaw = parseJsonField<{
    whyCardImage?: string;
    whyCardPointerText?: string;
  }>(reqBody.whyOutsoutcingCards);
  const serviceCardsRaw = parseJsonField<{
    imgServiceCard?: string;
    titleServiceCard?: string;
    descriptionServiceCard?: string;
    buttontxtServiceCard?: string;
    pglink?: string;
  }>(reqBody.serviceCards);
  const howWeWorkStepsRaw = parseJsonField<{
    stepNumber?: string;
    howWeWorkIcon?: string;
    stepTitle?: string;
    stepDescription?: string;
  }>(reqBody.howWeWorkSteps);
  const testimonialsRaw = parseJsonField<{
    testimonialBgImg?: string;
    testimonialPersonImg?: string;
    testimonialTitle?: string;
    testimonialDescription?: string;
    testimonialPersonName?: string;
  }>(reqBody.testimonialsCard);

  const heroCards = heroCardsRaw.map((card, i) => ({
    ...card,
    heroCardImg: fileUrl(`heroCardImg_${i}`) ?? card.heroCardImg,
  }));
  const whyOutsoutcingCards = whyCardsRaw.map((card, i) => ({
    ...card,
    whyCardImage: fileUrl(`whyCardImage_${i}`) ?? card.whyCardImage,
  }));
  const serviceCards = serviceCardsRaw.map((card, i) => ({
    ...card,
    imgServiceCard: fileUrl(`imgServiceCard_${i}`) ?? card.imgServiceCard,
  }));
  const howWeWorkSteps = howWeWorkStepsRaw.map((step, i) => ({
    ...step,
    howWeWorkIcon: fileUrl(`howWeWorkIcon_${i}`) ?? step.howWeWorkIcon,
  }));
  const testimonialsCard = testimonialsRaw.map((card, i) => ({
    ...card,
    testimonialBgImg: fileUrl(`testimonialBgImg_${i}`) ?? card.testimonialBgImg,
    testimonialPersonImg:
      fileUrl(`testimonialPersonImg_${i}`) ?? card.testimonialPersonImg,
  }));

  return {
    title: reqBody.title,
    headingTextFirst: reqBody.headingTextFirst,
    headingTextMiddle: reqBody.headingTextMiddle,
    headingTextEnd: reqBody.headingTextEnd,
    description: reqBody.description,
    description2: reqBody.description2,
    freeConsultation: reqBody.freeConsultation,
    cardSelector: reqBody.cardSelector,
    whyOutsoutcing: reqBody.whyOutsoutcing,
    headingWhyOutsoutcing: reqBody.headingWhyOutsoutcing,
    descriptionWhyOutsoutcing: reqBody.descriptionWhyOutsoutcing,
    headingServiceSection: reqBody.headingServiceSection,
    descriptionServiceSection: reqBody.descriptionServiceSection,
    headingHowWeWork: reqBody.headingHowWeWork,
    headingClientsTestimonial: reqBody.headingClientsTestimonial,
    email: reqBody.email,
    number: reqBody.number,
    eNumber: reqBody.eNumber,
    joinUsHeading: reqBody.joinUsHeading,

    ...(fileUrl("bgImage") && { bgImage: fileUrl("bgImage") }),
    ...(fileUrl("ukFlag") && { ukFlag: fileUrl("ukFlag") }),
    ...(fileUrl("imgWhyOutsoutcing") && {
      imgWhyOutsoutcing: fileUrl("imgWhyOutsoutcing"),
    }),
    ...(fileUrl("imgtwoWhyOutsoutcing") && {
      imgtwoWhyOutsoutcing: fileUrl("imgtwoWhyOutsoutcing"),
    }),
    ...(fileUrl("whyOutSourceAccounting") && {
      whyOutSourceAccounting: fileUrl("whyOutSourceAccounting"),
    }),
    ...(fileUrl("lineOne") && { lineOne: fileUrl("lineOne") }),
    ...(fileUrl("lineTwo") && { lineTwo: fileUrl("lineTwo") }),
    ...(fileUrl("joinUsBgImage") && {
      joinUsBgImage: fileUrl("joinUsBgImage"),
    }),

    heroCards,
    whyOutsoutcingCards,
    serviceCards,
    howWeWorkSteps,
    testimonialsCard,
  };
}

export function buildAboutUsContentData(
  reqBody: any,
  fileUrl: (fieldName: string) => string | undefined,
  oldDoc: IAboutUs | null,
) {
  const missionCardsRaw = parseJsonField<{
    imgStatment?: string;
    headingStatment?: string;
    descriptionStatement?: string;
  }>(reqBody.missionStatmentCards);

  const missionStatmentCards = missionCardsRaw.map((card, i) => {
    const imgStatment = pickImageUrl(
      fileUrl(`imgStatment_${i}`),
      oldDoc?.OurStory?.missionStatmentCards?.[i]?.imgStatment,
      card.imgStatment,
    );

    return {
      ...card,
      ...(imgStatment && { imgStatment }),
    };
  });

  const ourValueRaw = parseJsonField<{
    imgValue?: string;
    headingValue?: string;
    descriptionValue?: string;
  }>(reqBody.OurValue);

  const OurValue = ourValueRaw.map((card, i) => {
    const imgValue = pickImageUrl(
      fileUrl(`imgValue_${i}`),
      oldDoc?.OurValue?.[i]?.imgValue,
      card.imgValue,
    );

    return {
      ...card,
      ...(imgValue && { imgValue }),
    };
  });

  const heroImg = pickImageUrl(fileUrl("imgHero"), oldDoc?.img, reqBody.img);
  const ourStoryImg = pickImageUrl(
    fileUrl("imgOurStory"),
    oldDoc?.OurStory?.imgOurStory,
    reqBody.imgOurStory,
  );

  return {
    heading: reqBody.heading,
    subHeading: reqBody.subheading,
    ...(heroImg && { img: heroImg }),
    OurStory: {
      headingOurStory: reqBody.headingOurStory,
      descriptionOurStory: reqBody.descriptionOurStory,
      descriptiontwoOurStory: reqBody.descriptiontwoOurStory,
      ...(ourStoryImg && { imgOurStory: ourStoryImg }),
      missionStatmentCards,
    },
    OurValue,
  };
}

export function buildContactUsContentData(
  reqBody: any,
  fileUrl: (fieldName: string) => string | undefined,
  oldDoc: IContactUs | null,
) {
  const getInTouchRaw = parseJsonField<{
    img?: string;
    title?: string;
    description?: string;
    detail?: string;
  }>(reqBody.getInTouch);

  const getInTouch = getInTouchRaw.map((item, i) => {
    const img = pickImageUrl(
      fileUrl(`getInTouchImg_${i}`),
      oldDoc?.getInTouch?.[i]?.img,
      item.img,
    );

    return {
      ...item,
      ...(img && { img }),
    };
  });

  const heroImg = pickImageUrl(fileUrl("img"), oldDoc?.img, reqBody.img);

  return {
    heading: reqBody.heading,
    description: reqBody.description,
    ...(heroImg && { img: heroImg }),
    getInTouch,
  };
}

export function buildFaqContentData(
  reqBody: any,
  fileUrl: (fieldName: string) => string | undefined,
  oldDoc: IFaq | null,
) {
  const generalQuizRaw = parseJsonField<{
    service?: string;
    description?: string;
  }>(reqBody.generalQuiz);
  const generalQuiz = generalQuizRaw.map((item, i) => ({
    ...item,
    ...(fileUrl(`generalQuizImg_${i}`) && {
      img: fileUrl(`generalQuizImg_${i}`),
    }),
  }));

  const bookACallImg = pickImageUrl(
    fileUrl("bookACallImg"),
    oldDoc?.bookACall?.img,
    reqBody.bookACallImg,
  );

  return {
    heading: reqBody.heading,
    description: reqBody.description,
    link: reqBody.link,
    generalQuiz,
    bookACall: {
      heading: reqBody.bookACallHeading,
      description: reqBody.bookACallDescription,
      ...(bookACallImg && { img: bookACallImg }),
    },
  };
}

export type ServiceRaw = {
  slug?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  description?: string;
  descriptiontwo?: string;
  buttonText?: string;
  img?: string;
  bgimg?: string;
  WhatYouGet?: {
    heading?: string;
    card?: { img?: string; title?: string; description?: string }[];
  };
  ServiceProcess?: {
    heading?: string;
    highlightheading?: string;
    stepCard?: { imgSrc?: string; title?: string; description?: string }[];
  };
  GetStarted?: {
    heading?: string;
    descriptionone?: string;
    descriptiontwo?: string;
  };
  WhyChooseUs?: {
    heading?: string;
    img?: string;
    card?: { img?: string; title?: string; description?: string }[];
  };
  statics?: {
    heading?: string;
    description?: string;
    img?: string;
    card?: { img?: string; title?: string; description?: string }[];
  };
  WhatData?: {
    heading?: string;
    descriptionone?: string;
    descriptiontwo?: string;
    img?: string;
  };
  WhoData?: {
    heading?: string;
    descriptionone?: string;
    descriptiontwo?: string;
    img?: string;
  };
  Pricing?: {
    config?: {
      eyebrow?: string;
      title?: string;
      description?: string;
    };
    plans?: {
      id?: string;
      name?: string;
      checkoutName?: string;
      price?: number | string;
      currency?: string;
      description?: string;
      billingCycle?: string;
      isPopular?: boolean;
      features?: {
        text?: string;
        included?: boolean;
      }[];
    }[];
  };
};

function normalizeOptionalNumber(value: unknown): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

export function parseServiceRows(value: unknown): ServiceRaw[] {
  return parseJsonField<ServiceRaw>(value);
}

export function buildServiceContentData(
  svc: ServiceRaw,
  index: number,
  oldDocs: IService[],
  oldBySlug: Map<string, IService>,
  fileUrl: (fieldName: string) => string | undefined,
): IService {
  const oldSvc =
    (typeof svc.slug === "string" && svc.slug.length > 0
      ? oldBySlug.get(svc.slug)
      : undefined) ?? oldDocs[index];

  const whatYouGetCard = (svc.WhatYouGet?.card ?? []).map((card, cardIndex) => {
    const img = pickImageUrl(
      fileUrl(`whatYouGetCardImg_${index}_${cardIndex}`),
      oldSvc?.WhatYouGet?.card?.[cardIndex]?.img,
      card.img,
    );

    return {
      ...card,
      ...(img && { img }),
    };
  });

  const serviceProcessStepCard = (svc.ServiceProcess?.stepCard ?? []).map(
    (step, stepIndex) => {
      const imgSrc = pickImageUrl(
        fileUrl(`serviceProcessStepImg_${index}_${stepIndex}`),
        oldSvc?.ServiceProcess?.stepCard?.[stepIndex]?.imgSrc,
        step.imgSrc,
      );

      return {
        ...step,
        ...(imgSrc && { imgSrc }),
      };
    },
  );

  const whyChooseUsCard = (svc.WhyChooseUs?.card ?? []).map(
    (card, cardIndex) => {
      const img = pickImageUrl(
        fileUrl(`whyChooseUsCardImg_${index}_${cardIndex}`),
        oldSvc?.WhyChooseUs?.card?.[cardIndex]?.img,
        card.img,
      );

      return {
        ...card,
        ...(img && { img }),
      };
    },
  );

  const staticsCard = (svc.statics?.card ?? []).map((card, cardIndex) => {
    const img = pickImageUrl(
      fileUrl(`staticsCardImg_${index}_${cardIndex}`),
      oldSvc?.statics?.card?.[cardIndex]?.img,
      card.img,
    );

    return {
      ...card,
      ...(img && { img }),
    };
  });

  const img = pickImageUrl(fileUrl(`img_${index}`), oldSvc?.img, svc.img);
  const bgimg = pickImageUrl(
    fileUrl(`bgimg_${index}`),
    oldSvc?.bgimg,
    svc.bgimg,
  );
  const whyChooseUsImg = pickImageUrl(
    fileUrl(`whyChooseUsImg_${index}`),
    oldSvc?.WhyChooseUs?.img,
    svc.WhyChooseUs?.img,
  );
  const staticsImg = pickImageUrl(
    fileUrl(`staticsImg_${index}`),
    oldSvc?.statics?.img,
    svc.statics?.img,
  );
  const whatDataImg = pickImageUrl(
    fileUrl(`whatDataImg_${index}`),
    oldSvc?.WhatData?.img,
    svc.WhatData?.img,
  );
  const whoDataImg = pickImageUrl(
    fileUrl(`whoDataImg_${index}`),
    oldSvc?.WhoData?.img,
    svc.WhoData?.img,
  );

  const pricingPlans = (svc.Pricing?.plans ?? oldSvc?.Pricing?.plans ?? []).map(
    (plan) => ({
      id: plan?.id,
      name: plan?.name,
      checkoutName: plan?.checkoutName,
      price: normalizeOptionalNumber(plan?.price),
      currency: plan?.currency,
      description: plan?.description,
      billingCycle: plan?.billingCycle,
      isPopular: plan?.isPopular,
      features: (plan?.features ?? []).map((feature) => ({
        text: feature?.text,
        included: feature?.included,
      })),
    }),
  );

  return serviceSchemaZod.parse({
    slug: svc.slug,
    title: svc.title,
    titleHighlight: svc.titleHighlight,
    subtitle: svc.subtitle,
    description: svc.description,
    descriptiontwo: svc.descriptiontwo,
    buttonText: svc.buttonText,
    ...(img && { img }),
    ...(bgimg && { bgimg }),
    WhatYouGet: {
      heading: svc.WhatYouGet?.heading,
      card: whatYouGetCard,
    },
    ServiceProcess: {
      heading: svc.ServiceProcess?.heading,
      highlightheading: svc.ServiceProcess?.highlightheading,
      stepCard: serviceProcessStepCard,
    },
    GetStarted: svc.GetStarted,
    WhyChooseUs: {
      heading: svc.WhyChooseUs?.heading,
      ...(whyChooseUsImg && { img: whyChooseUsImg }),
      card: whyChooseUsCard,
    },
    statics: {
      heading: svc.statics?.heading,
      description: svc.statics?.description,
      ...(staticsImg && { img: staticsImg }),
      card: staticsCard,
    },
    WhatData: {
      ...svc.WhatData,
      ...(whatDataImg && { img: whatDataImg }),
    },
    WhoData: {
      ...svc.WhoData,
      ...(whoDataImg && { img: whoDataImg }),
    },
    Pricing: {
      config: {
        eyebrow:
          svc.Pricing?.config?.eyebrow ?? oldSvc?.Pricing?.config?.eyebrow,
        title: svc.Pricing?.config?.title ?? oldSvc?.Pricing?.config?.title,
        description:
          svc.Pricing?.config?.description ??
          oldSvc?.Pricing?.config?.description,
      },
      plans: pricingPlans,
    },
  });
}
