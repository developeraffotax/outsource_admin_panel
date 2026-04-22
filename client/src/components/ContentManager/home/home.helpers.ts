import type { FormValues } from "./home-form.types";
import {
  createEmptyHeroCard,
  createEmptyServiceCard,
  createEmptyTestimonialCard,
  createEmptyWhyOutsourceCard,
  DEFAULT_HERO_CARD_COUNT,
  DEFAULT_SERVICE_CARD_COUNT,
  DEFAULT_TESTIMONIAL_CARD_COUNT,
  DEFAULT_WHY_OUTSOURCE_CARD_COUNT,
} from "./home-form.types";
import type { SavedImages } from "./sections/section-props.types";

// Shape of the raw content returned by the backend (image fields are URL strings)
export type BackendContent = {
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

export function createHomeDefaultValues(): FormValues {
  return {
    bgImage: undefined,
    title: "",
    headingFirstText: "",
    headingMiddleText: "",
    headingEndText: "",
    ukFlag: undefined,
    descriptionHeroHomepage: "",
    descriptionHeroHomePageTwo: "",
    freeConsultation: "",
    whyOutsourcing: "",
    headingWhyOutsourcing: "",
    descriptionWhyOutsourcing: "",
    imgWhyOutsourcing: undefined,
    imgTwoWhyOutsourcing: undefined,
    whyOutSourceAccounting: undefined,
    headingService: "",
    descriptionService: "",
    heroCardName: "",
    heroCardSections: Array.from({ length: DEFAULT_HERO_CARD_COUNT }, () =>
      createEmptyHeroCard(),
    ),
    whyOutsourceCardSections: Array.from(
      { length: DEFAULT_WHY_OUTSOURCE_CARD_COUNT },
      () => createEmptyWhyOutsourceCard(),
    ),
    serviceCards: Array.from({ length: DEFAULT_SERVICE_CARD_COUNT }, () =>
      createEmptyServiceCard(),
    ),
    howWeWork: {
      heading: "",
      one: "",
      oneIcon: undefined,
      title: "",
      description: "",
      two: "",
      twoIcon: undefined,
      titleTwo: "",
      descriptionTwo: "",
      three: "",
      threeIcon: undefined,
      threeTitle: "",
      threeDescription: "",
      lineOne: undefined,
      lineTwo: undefined,
    },
    clientsTestimonial: {
      heading: "",
      testimonialCards: Array.from(
        { length: DEFAULT_TESTIMONIAL_CARD_COUNT },
        () => createEmptyTestimonialCard(),
      ),
    },
    topbar: {
      email: "",
      number: "",
      eNumber: "",
    },
    joinUs: {
      heading: "",
      bgimg: undefined,
    },
  };
}

export function mapHomeSavedImages(content: BackendContent): SavedImages {
  const mappedImages: SavedImages = {
    bgImage: content.bgImage,
    ukFlag: content.ukFlag,
    imgWhyOutsoutcing: content.imgWhyOutsoutcing,
    imgtwoWhyOutsoutcing: content.imgtwoWhyOutsoutcing,
    whyOutSourceAccounting: content.whyOutSourceAccounting,
    lineOne: content.lineOne,
    lineTwo: content.lineTwo,
    joinUsBgImage: content.joinUsBgImage,
  };

  (content.heroCards ?? []).forEach((card, index) => {
    mappedImages[`heroCardImg_${index}`] = card.heroCardImg;
  });

  (content.whyOutsoutcingCards ?? []).forEach((card, index) => {
    mappedImages[`whyCardImage_${index}`] = card.whyCardImage;
  });

  (content.serviceCards ?? []).forEach((card, index) => {
    mappedImages[`imgServiceCard_${index}`] = card.imgServiceCard;
  });

  (content.howWeWorkSteps ?? []).forEach((step, index) => {
    mappedImages[`howWeWorkIcon_${index}`] = step.howWeWorkIcon;
  });

  (content.testimonialsCard ?? []).forEach((card, index) => {
    mappedImages[`testimonialBgImg_${index}`] = card.testimonialBgImg;
    mappedImages[`testimonialPersonImg_${index}`] = card.testimonialPersonImg;
  });

  return mappedImages;
}

function getDefaultArray<T>(items: T[] | undefined, defaultCount: number): T[] {
  if (items && items.length > 0) {
    return items;
  }

  return Array.from({ length: defaultCount }, () => ({} as T));
}

function mapHowWeWorkDefaults(content: BackendContent): FormValues["howWeWork"] {
  return {
    heading: content.headingHowWeWork ?? "",
    one: content.howWeWorkSteps?.[0]?.stepNumber ?? "",
    title: content.howWeWorkSteps?.[0]?.stepTitle ?? "",
    description: content.howWeWorkSteps?.[0]?.stepDescription ?? "",
    two: content.howWeWorkSteps?.[1]?.stepNumber ?? "",
    titleTwo: content.howWeWorkSteps?.[1]?.stepTitle ?? "",
    descriptionTwo: content.howWeWorkSteps?.[1]?.stepDescription ?? "",
    three: content.howWeWorkSteps?.[2]?.stepNumber ?? "",
    threeTitle: content.howWeWorkSteps?.[2]?.stepTitle ?? "",
    threeDescription: content.howWeWorkSteps?.[2]?.stepDescription ?? "",
  };
}

export function mapHomeFormDefaults(content: BackendContent): FormValues {
  type HeroCardContent = NonNullable<BackendContent["heroCards"]>[number];
  type WhyOutsourceCardContent = NonNullable<BackendContent["whyOutsoutcingCards"]>[number];
  type ServiceCardContent = NonNullable<BackendContent["serviceCards"]>[number];
  type TestimonialCardContent = NonNullable<BackendContent["testimonialsCard"]>[number];

  const heroCardsSource = getDefaultArray<HeroCardContent>(
    content.heroCards,
    DEFAULT_HERO_CARD_COUNT,
  );
  const whyOutsourceCardsSource = getDefaultArray<WhyOutsourceCardContent>(
    content.whyOutsoutcingCards,
    DEFAULT_WHY_OUTSOURCE_CARD_COUNT,
  );
  const serviceCardsSource = getDefaultArray<ServiceCardContent>(
    content.serviceCards,
    DEFAULT_SERVICE_CARD_COUNT,
  );
  const testimonialCardsSource = getDefaultArray<TestimonialCardContent>(
    content.testimonialsCard,
    DEFAULT_TESTIMONIAL_CARD_COUNT,
  );

  return {
    title: content.title ?? "",
    headingFirstText: content.headingTextFirst ?? "",
    headingMiddleText: content.headingTextMiddle ?? "",
    headingEndText: content.headingTextEnd ?? "",
    descriptionHeroHomepage: content.description ?? "",
    descriptionHeroHomePageTwo: content.description2 ?? "",
    freeConsultation: content.freeConsultation ?? "",
    heroCardName: content.cardSelector ?? "",
    heroCardSections: heroCardsSource.map((card) => ({
      title: card.heroCardTitle ?? "",
      content: card.heroCardContent ?? "",
      existingImageUrl: card.heroCardImg ?? "",
    })),
    whyOutsourcing: content.whyOutsoutcing ?? "",
    headingWhyOutsourcing: content.headingWhyOutsoutcing ?? "",
    descriptionWhyOutsourcing: content.descriptionWhyOutsoutcing ?? "",
    whyOutsourceCardSections: whyOutsourceCardsSource.map((card) => ({
      pointerTextWhyOutsourcing: card.whyCardPointerText ?? "",
      existingWhyCardImage: card.whyCardImage ?? "",
    })),
    headingService: content.headingServiceSection ?? "",
    descriptionService: content.descriptionServiceSection ?? "",
    serviceCards: serviceCardsSource.map((card) => ({
      titleServiceCard: card.titleServiceCard ?? "",
      descriptionServiceCard: card.descriptionServiceCard ?? "",
      buttontxtServiceCard: card.buttontxtServiceCard ?? "",
      pglink: card.pglink ?? "",
      existingServiceCardImage: card.imgServiceCard ?? "",
    })),
    howWeWork: mapHowWeWorkDefaults(content),
    clientsTestimonial: {
      heading: content.headingClientsTestimonial ?? "",
      testimonialCards: testimonialCardsSource.map((card) => ({
        testimonialTitle: card.testimonialTitle ?? "",
        testimonialDescription: card.testimonialDescription ?? "",
        testimonialPersonName: card.testimonialPersonName ?? "",
        existingTestimonialBgImg: card.testimonialBgImg ?? "",
        existingTestimonialPersonImg: card.testimonialPersonImg ?? "",
      })),
    },
    topbar: {
      email: content.email ?? "",
      number: content.number ?? "",
      eNumber: content.eNumber ?? "",
    },
    joinUs: {
      heading: content.joinUsHeading ?? "",
    },
  };
}

function appendTextFields(formData: FormData, data: FormValues): void {
  formData.append("title", data.title ?? "");
  formData.append("headingTextFirst", data.headingFirstText ?? "");
  formData.append("headingTextMiddle", data.headingMiddleText ?? "");
  formData.append("headingTextEnd", data.headingEndText ?? "");
  formData.append("description", data.descriptionHeroHomepage ?? "");
  formData.append("description2", data.descriptionHeroHomePageTwo ?? "");
  formData.append("freeConsultation", data.freeConsultation ?? "");
  formData.append("cardSelector", data.heroCardName ?? "");
  formData.append("whyOutsoutcing", data.whyOutsourcing ?? "");
  formData.append("headingWhyOutsoutcing", data.headingWhyOutsourcing ?? "");
  formData.append("descriptionWhyOutsoutcing", data.descriptionWhyOutsourcing ?? "");
  formData.append("headingServiceSection", data.headingService ?? "");
  formData.append("descriptionServiceSection", data.descriptionService ?? "");
  formData.append("headingHowWeWork", data.howWeWork?.heading ?? "");
  formData.append("headingClientsTestimonial", data.clientsTestimonial?.heading ?? "");
  formData.append("email", data.topbar?.email ?? "");
  formData.append("number", data.topbar?.number ?? "");
  formData.append("eNumber", data.topbar?.eNumber ?? "");
  formData.append("joinUsHeading", data.joinUs?.heading ?? "");
}

function appendSingleImageFiles(formData: FormData, data: FormValues): void {
  if (data.bgImage?.[0]) formData.append("bgImage", data.bgImage[0]);
  if (data.ukFlag?.[0]) formData.append("ukFlag", data.ukFlag[0]);
  if (data.imgWhyOutsourcing?.[0]) formData.append("imgWhyOutsoutcing", data.imgWhyOutsourcing[0]);
  if (data.imgTwoWhyOutsourcing?.[0]) {
    formData.append("imgtwoWhyOutsoutcing", data.imgTwoWhyOutsourcing[0]);
  }
  if (data.whyOutSourceAccounting?.[0]) {
    formData.append("whyOutSourceAccounting", data.whyOutSourceAccounting[0]);
  }
  if (data.howWeWork?.lineOne?.[0]) formData.append("lineOne", data.howWeWork.lineOne[0]);
  if (data.howWeWork?.lineTwo?.[0]) formData.append("lineTwo", data.howWeWork.lineTwo[0]);
  if (data.joinUs?.bgimg?.[0]) formData.append("joinUsBgImage", data.joinUs.bgimg[0]);
}

function appendHeroCards(
  formData: FormData,
  data: FormValues,
  existingContent: BackendContent,
): void {
  formData.append(
    "heroCards",
    JSON.stringify(
      (data.heroCardSections ?? []).map((card, index) => ({
        heroCardImg: card.existingImageUrl ?? existingContent.heroCards?.[index]?.heroCardImg ?? "",
        heroCardTitle: card.title ?? "",
        heroCardContent: card.content ?? "",
      })),
    ),
  );

  (data.heroCardSections ?? []).forEach((card, index) => {
    if (card.image?.[0]) {
      formData.append(`heroCardImg_${index}`, card.image[0]);
    }
  });
}

function appendWhyOutsourceCards(
  formData: FormData,
  data: FormValues,
  existingContent: BackendContent,
): void {
  formData.append(
    "whyOutsoutcingCards",
    JSON.stringify(
      (data.whyOutsourceCardSections ?? []).map((card, index) => ({
        whyCardImage:
          card.existingWhyCardImage ??
          existingContent.whyOutsoutcingCards?.[index]?.whyCardImage ??
          "",
        whyCardPointerText: card.pointerTextWhyOutsourcing ?? "",
      })),
    ),
  );

  (data.whyOutsourceCardSections ?? []).forEach((card, index) => {
    if (card.imgPointerWhyOutsourcing?.[0]) {
      formData.append(`whyCardImage_${index}`, card.imgPointerWhyOutsourcing[0]);
    }
  });
}

function appendServiceCards(
  formData: FormData,
  data: FormValues,
  existingContent: BackendContent,
): void {
  formData.append(
    "serviceCards",
    JSON.stringify(
      (data.serviceCards ?? []).map((card, index) => ({
        imgServiceCard:
          card.existingServiceCardImage ??
          existingContent.serviceCards?.[index]?.imgServiceCard ??
          "",
        titleServiceCard: card.titleServiceCard ?? "",
        descriptionServiceCard: card.descriptionServiceCard ?? "",
        buttontxtServiceCard: card.buttontxtServiceCard ?? "",
        pglink: card.pglink ?? "",
      })),
    ),
  );

  (data.serviceCards ?? []).forEach((card, index) => {
    if (card.imgServiceCard?.[0]) {
      formData.append(`imgServiceCard_${index}`, card.imgServiceCard[0]);
    }
  });
}

function appendHowWeWorkSteps(
  formData: FormData,
  data: FormValues,
  existingContent: BackendContent,
): void {
  formData.append(
    "howWeWorkSteps",
    JSON.stringify([
      {
        stepNumber: data.howWeWork?.one ?? "",
        howWeWorkIcon: existingContent.howWeWorkSteps?.[0]?.howWeWorkIcon ?? "",
        stepTitle: data.howWeWork?.title ?? "",
        stepDescription: data.howWeWork?.description ?? "",
      },
      {
        stepNumber: data.howWeWork?.two ?? "",
        howWeWorkIcon: existingContent.howWeWorkSteps?.[1]?.howWeWorkIcon ?? "",
        stepTitle: data.howWeWork?.titleTwo ?? "",
        stepDescription: data.howWeWork?.descriptionTwo ?? "",
      },
      {
        stepNumber: data.howWeWork?.three ?? "",
        howWeWorkIcon: existingContent.howWeWorkSteps?.[2]?.howWeWorkIcon ?? "",
        stepTitle: data.howWeWork?.threeTitle ?? "",
        stepDescription: data.howWeWork?.threeDescription ?? "",
      },
    ]),
  );

  if (data.howWeWork?.oneIcon?.[0]) formData.append("howWeWorkIcon_0", data.howWeWork.oneIcon[0]);
  if (data.howWeWork?.twoIcon?.[0]) formData.append("howWeWorkIcon_1", data.howWeWork.twoIcon[0]);
  if (data.howWeWork?.threeIcon?.[0]) {
    formData.append("howWeWorkIcon_2", data.howWeWork.threeIcon[0]);
  }
}

function appendTestimonials(
  formData: FormData,
  data: FormValues,
  existingContent: BackendContent,
): void {
  formData.append(
    "testimonialsCard",
    JSON.stringify(
      (data.clientsTestimonial?.testimonialCards ?? []).map((card, index) => ({
        testimonialBgImg:
          card.existingTestimonialBgImg ??
          existingContent.testimonialsCard?.[index]?.testimonialBgImg ??
          "",
        testimonialPersonImg:
          card.existingTestimonialPersonImg ??
          existingContent.testimonialsCard?.[index]?.testimonialPersonImg ??
          "",
        testimonialTitle: card.testimonialTitle ?? "",
        testimonialDescription: card.testimonialDescription ?? "",
        testimonialPersonName: card.testimonialPersonName ?? "",
      })),
    ),
  );

  (data.clientsTestimonial?.testimonialCards ?? []).forEach((card, index) => {
    if (card.testimonialBgImg?.[0]) {
      formData.append(`testimonialBgImg_${index}`, card.testimonialBgImg[0]);
    }
    if (card.testimonialPersonImg?.[0]) {
      formData.append(`testimonialPersonImg_${index}`, card.testimonialPersonImg[0]);
    }
  });
}

export function buildHomeFormData(data: FormValues, existingContent: BackendContent): FormData {
  const formData = new FormData();

  appendTextFields(formData, data);
  appendSingleImageFiles(formData, data);
  appendHeroCards(formData, data, existingContent);
  appendWhyOutsourceCards(formData, data, existingContent);
  appendServiceCards(formData, data, existingContent);
  appendHowWeWorkSteps(formData, data, existingContent);
  appendTestimonials(formData, data, existingContent);

  return formData;
}
