export type FormValues = {
  bgImage: FileList;
  title: string;
  headingFirstText: string;
  headingMiddleText: string;
  headingEndText: string;
  ukFlag: FileList;
  descriptionHeroHomepage: string;
  descriptionHeroHomePageTwo: string;
  freeConsultation: string;
  whyOutsourcing: string;
  headingWhyOutsourcing: string;
  descriptionWhyOutsourcing: string;
  imgWhyOutsourcing: FileList;
  imgTwoWhyOutsourcing: FileList;
  whyOutSourceAccounting: FileList;
  headingService: string;
  descriptionService: string;
  heroCardName: string;
  heroCardSections: {
    image: FileList;
    title: string;
    content: string;
  }[];
  whyOutsourceCardSections: {
    imgPointerWhyOutsourcing: FileList;
    pointerTextWhyOutsourcing: string;
  }[];
  serviceCards: {
    imgServiceCard: FileList;
    titleServiceCard: string;
    descriptionServiceCard: string;
    buttontxtServiceCard: string;
    pglink: string;
  }[];
  howWeWork: {
    heading: string;
    one: string;
    oneIcon: FileList;
    title: string;
    description: string;
    two: string;
    twoIcon: FileList;
    titleTwo: string;
    descriptionTwo: string;
    three: string;
    threeIcon: FileList;
    threeTitle: string;
    threeDescription: string;
    lineOne: FileList;
    lineTwo: FileList;
  };
  clientsTestimonial: {
    heading: string;
    testimonialCards: {
      testimonialBgImg: FileList;
      testimonialPersonImg: FileList;
      testimonialTitle: string;
      testimonialDescription: string;
      testimonialPersonName: string;
    }[];
  };
  topbar: {
    email: string;
    number: string;
    eNumber: string;
  };
  joinUs: {
    heading: string;
    bgimg: FileList;
  };
};

export const cardDropdowns = [
  { id: "serviceCardOne", title: "Card Dropdown 1" },
  { id: "serviceCardTwo", title: "Card Dropdown 2" },
  { id: "serviceCardThree", title: "Card Dropdown 3" },
  { id: "serviceCardFour", title: "Card Dropdown 4" },
  { id: "serviceCardFive", title: "Card Dropdown 5" },
];

export const serviceCardDropdowns = Array.from({ length: 6 }, (_, index) => ({
  id: `serviceSectionCard${index + 1}`,
  title: `Service Card ${index + 1}`,
}));

export const testimonialCardDropdowns = [
  { id: "testimonialFounder", title: "Founder" },
  { id: "testimonialCEO", title: "CEO" },
  { id: "testimonialCoFounder", title: "Co-Founder" },
];
