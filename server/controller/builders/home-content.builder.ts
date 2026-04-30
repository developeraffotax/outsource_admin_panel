import type { IHomeContent } from "../../models/HomeContent.model.js";
import { parseJsonField, pickImageUrl } from "./shared.js";

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
