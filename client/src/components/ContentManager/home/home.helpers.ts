import type { FormValues } from "./home-form.types";
import {
  cardDropdowns,
  serviceCardDropdowns,
  testimonialCardDropdowns,
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

export function createHomeDefaultValues() {
  return {
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
  };
}

export function mapHomeSavedImages(content: BackendContent): SavedImages {
  return {
    bgImage: content.bgImage,
    ukFlag: content.ukFlag,
    heroCardImg_0: content.heroCards?.[0]?.heroCardImg,
    heroCardImg_1: content.heroCards?.[1]?.heroCardImg,
    heroCardImg_2: content.heroCards?.[2]?.heroCardImg,
    imgWhyOutsoutcing: content.imgWhyOutsoutcing,
    imgtwoWhyOutsoutcing: content.imgtwoWhyOutsoutcing,
    whyOutSourceAccounting: content.whyOutSourceAccounting,
    whyCardImage_0: content.whyOutsoutcingCards?.[0]?.whyCardImage,
    whyCardImage_1: content.whyOutsoutcingCards?.[1]?.whyCardImage,
    whyCardImage_2: content.whyOutsoutcingCards?.[2]?.whyCardImage,
    imgServiceCard_0: content.serviceCards?.[0]?.imgServiceCard,
    imgServiceCard_1: content.serviceCards?.[1]?.imgServiceCard,
    imgServiceCard_2: content.serviceCards?.[2]?.imgServiceCard,
    imgServiceCard_3: content.serviceCards?.[3]?.imgServiceCard,
    imgServiceCard_4: content.serviceCards?.[4]?.imgServiceCard,
    imgServiceCard_5: content.serviceCards?.[5]?.imgServiceCard,
    howWeWorkIcon_0: content.howWeWorkSteps?.[0]?.howWeWorkIcon,
    howWeWorkIcon_1: content.howWeWorkSteps?.[1]?.howWeWorkIcon,
    howWeWorkIcon_2: content.howWeWorkSteps?.[2]?.howWeWorkIcon,
    lineOne: content.lineOne,
    lineTwo: content.lineTwo,
    testimonialBgImg_0: content.testimonialsCard?.[0]?.testimonialBgImg,
    testimonialBgImg_1: content.testimonialsCard?.[1]?.testimonialBgImg,
    testimonialBgImg_2: content.testimonialsCard?.[2]?.testimonialBgImg,
    testimonialPersonImg_0: content.testimonialsCard?.[0]?.testimonialPersonImg,
    testimonialPersonImg_1: content.testimonialsCard?.[1]?.testimonialPersonImg,
    testimonialPersonImg_2: content.testimonialsCard?.[2]?.testimonialPersonImg,
    joinUsBgImage: content.joinUsBgImage,
  };
}

export function mapHomeFormDefaults(content: BackendContent) {
  return {
    title: content.title ?? "",
    headingFirstText: content.headingTextFirst ?? "",
    headingMiddleText: content.headingTextMiddle ?? "",
    headingEndText: content.headingTextEnd ?? "",
    descriptionHeroHomepage: content.description ?? "",
    descriptionHeroHomePageTwo: content.description2 ?? "",
    freeConsultation: content.freeConsultation ?? "",
    heroCardName: content.cardSelector ?? "",
    heroCardSections: cardDropdowns.map((_, index) => ({
      title: content.heroCards?.[index]?.heroCardTitle ?? "",
      content: content.heroCards?.[index]?.heroCardContent ?? "",
    })),
    whyOutsourcing: content.whyOutsoutcing ?? "",
    headingWhyOutsourcing: content.headingWhyOutsoutcing ?? "",
    descriptionWhyOutsourcing: content.descriptionWhyOutsoutcing ?? "",
    whyOutsourceCardSections: cardDropdowns.map((_, index) => ({
      pointerTextWhyOutsourcing:
        content.whyOutsoutcingCards?.[index]?.whyCardPointerText ?? "",
    })),
    headingService: content.headingServiceSection ?? "",
    descriptionService: content.descriptionServiceSection ?? "",
    serviceCards: serviceCardDropdowns.map((_, index) => ({
      titleServiceCard: content.serviceCards?.[index]?.titleServiceCard ?? "",
      descriptionServiceCard:
        content.serviceCards?.[index]?.descriptionServiceCard ?? "",
      buttontxtServiceCard:
        content.serviceCards?.[index]?.buttontxtServiceCard ?? "",
      pglink: content.serviceCards?.[index]?.pglink ?? "",
    })),
    howWeWork: {
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
    },
    clientsTestimonial: {
      heading: content.headingClientsTestimonial ?? "",
      testimonialCards: testimonialCardDropdowns.map((_, index) => ({
        testimonialTitle:
          content.testimonialsCard?.[index]?.testimonialTitle ?? "",
        testimonialDescription:
          content.testimonialsCard?.[index]?.testimonialDescription ?? "",
        testimonialPersonName:
          content.testimonialsCard?.[index]?.testimonialPersonName ?? "",
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

export function buildHomeFormData(
  data: FormValues,
  existingContent: BackendContent,
): FormData {
  const ec = existingContent;
  const formData = new FormData();

  // Text fields
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
  formData.append(
    "descriptionWhyOutsoutcing",
    data.descriptionWhyOutsourcing ?? "",
  );
  formData.append("headingServiceSection", data.headingService ?? "");
  formData.append("descriptionServiceSection", data.descriptionService ?? "");
  formData.append("headingHowWeWork", data.howWeWork?.heading ?? "");
  formData.append(
    "headingClientsTestimonial",
    data.clientsTestimonial?.heading ?? "",
  );
  formData.append("email", data.topbar?.email ?? "");
  formData.append("number", data.topbar?.number ?? "");
  formData.append("eNumber", data.topbar?.eNumber ?? "");
  formData.append("joinUsHeading", data.joinUs?.heading ?? "");

  // Single image files
  if (data.bgImage?.[0]) formData.append("bgImage", data.bgImage[0]);
  if (data.ukFlag?.[0]) formData.append("ukFlag", data.ukFlag[0]);
  if (data.imgWhyOutsourcing?.[0]) {
    formData.append("imgWhyOutsoutcing", data.imgWhyOutsourcing[0]);
  }
  if (data.imgTwoWhyOutsourcing?.[0]) {
    formData.append("imgtwoWhyOutsoutcing", data.imgTwoWhyOutsourcing[0]);
  }
  if (data.whyOutSourceAccounting?.[0]) {
    formData.append("whyOutSourceAccounting", data.whyOutSourceAccounting[0]);
  }
  if (data.howWeWork?.lineOne?.[0]) {
    formData.append("lineOne", data.howWeWork.lineOne[0]);
  }
  if (data.howWeWork?.lineTwo?.[0]) {
    formData.append("lineTwo", data.howWeWork.lineTwo[0]);
  }
  if (data.joinUs?.bgimg?.[0]) {
    formData.append("joinUsBgImage", data.joinUs.bgimg[0]);
  }

  // Hero cards
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

  // Why Outsource cards
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
    if (card.imgPointerWhyOutsourcing?.[0]) {
      formData.append(`whyCardImage_${i}`, card.imgPointerWhyOutsourcing[0]);
    }
  });

  // Service cards
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
    if (card.imgServiceCard?.[0]) {
      formData.append(`imgServiceCard_${i}`, card.imgServiceCard[0]);
    }
  });

  // How We Work steps
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
  if (data.howWeWork?.oneIcon?.[0]) {
    formData.append("howWeWorkIcon_0", data.howWeWork.oneIcon[0]);
  }
  if (data.howWeWork?.twoIcon?.[0]) {
    formData.append("howWeWorkIcon_1", data.howWeWork.twoIcon[0]);
  }
  if (data.howWeWork?.threeIcon?.[0]) {
    formData.append("howWeWorkIcon_2", data.howWeWork.threeIcon[0]);
  }

  // Testimonials
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
    if (card.testimonialBgImg?.[0]) {
      formData.append(`testimonialBgImg_${i}`, card.testimonialBgImg[0]);
    }
    if (card.testimonialPersonImg?.[0]) {
      formData.append(
        `testimonialPersonImg_${i}`,
        card.testimonialPersonImg[0],
      );
    }
  });

  return formData;
}
