export type HeroCardForm = {
  image?: FileList;
  title: string;
  content: string;
  existingImageUrl?: string;
};

export type WhyOutsourceCardForm = {
  imgPointerWhyOutsourcing?: FileList;
  pointerTextWhyOutsourcing: string;
  existingWhyCardImage?: string;
};

export type ServiceCardForm = {
  imgServiceCard?: FileList;
  titleServiceCard: string;
  descriptionServiceCard: string;
  buttontxtServiceCard: string;
  pglink: string;
  existingServiceCardImage?: string;
};

export type TestimonialCardForm = {
  testimonialBgImg?: FileList;
  testimonialPersonImg?: FileList;
  testimonialTitle: string;
  testimonialDescription: string;
  testimonialPersonName: string;
  existingTestimonialBgImg?: string;
  existingTestimonialPersonImg?: string;
};

export type FormValues = {
  bgImage?: FileList;
  title: string;
  headingFirstText: string;
  headingMiddleText: string;
  headingEndText: string;
  ukFlag?: FileList;
  descriptionHeroHomepage: string;
  descriptionHeroHomePageTwo: string;
  freeConsultation: string;
  whyOutsourcing: string;
  headingWhyOutsourcing: string;
  descriptionWhyOutsourcing: string;
  imgWhyOutsourcing?: FileList;
  imgTwoWhyOutsourcing?: FileList;
  whyOutSourceAccounting?: FileList;
  headingService: string;
  descriptionService: string;
  heroCardName: string;
  heroCardSections: HeroCardForm[];
  whyOutsourceCardSections: WhyOutsourceCardForm[];
  serviceCards: ServiceCardForm[];
  howWeWork: {
    heading: string;
    one: string;
    oneIcon?: FileList;
    title: string;
    description: string;
    two: string;
    twoIcon?: FileList;
    titleTwo: string;
    descriptionTwo: string;
    three: string;
    threeIcon?: FileList;
    threeTitle: string;
    threeDescription: string;
    lineOne?: FileList;
    lineTwo?: FileList;
  };
  clientsTestimonial: {
    heading: string;
    testimonialCards: TestimonialCardForm[];
  };
  topbar: {
    email: string;
    number: string;
    eNumber: string;
  };
  joinUs: {
    heading: string;
    bgimg?: FileList;
  };
};

export const DEFAULT_HERO_CARD_COUNT = 5;
export const DEFAULT_WHY_OUTSOURCE_CARD_COUNT = 5;
export const DEFAULT_SERVICE_CARD_COUNT = 6;
export const DEFAULT_TESTIMONIAL_CARD_COUNT = 3;

export const createEmptyHeroCard = (): HeroCardForm => ({
  title: "",
  content: "",
  existingImageUrl: "",
});

export const createEmptyWhyOutsourceCard = (): WhyOutsourceCardForm => ({
  pointerTextWhyOutsourcing: "",
  existingWhyCardImage: "",
});

export const createEmptyServiceCard = (): ServiceCardForm => ({
  titleServiceCard: "",
  descriptionServiceCard: "",
  buttontxtServiceCard: "",
  pglink: "",
  existingServiceCardImage: "",
});

export const createEmptyTestimonialCard = (): TestimonialCardForm => ({
  testimonialTitle: "",
  testimonialDescription: "",
  testimonialPersonName: "",
  existingTestimonialBgImg: "",
  existingTestimonialPersonImg: "",
});
