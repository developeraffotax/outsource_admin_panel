import type { IService } from "../../models/Service.model.js";
import { serviceSchemaZod } from "../../models/Service.model.js";
import { parseJsonField, pickImageUrl } from "./shared.js";

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
