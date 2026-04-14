export type PricingFeature = {
  text: string;
  included: boolean;
};

export type PricingPlan = {
  id: string;
  name: string;
  checkoutName: string;
  price?: number;
  currency: string;
  description: string;
  billingCycle: string;
  isPopular: boolean;
  features: PricingFeature[];
};

export type PricingConfig = {
  eyebrow: string;
  title: string;
  description: string;
};

export type PricingSection = {
  config: PricingConfig;
  plans: PricingPlan[];
};

export type FormValues = {
  slug: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  descriptiontwo: string;
  buttonText: string;
  img: FileList;
  bgimg: FileList;
  WhatYouGet: {
    heading: string;
    card: {
      img: FileList;
      title: string;
      description: string;
    }[];
  };
  ServiceProcess: {
    heading: string;
    highlightheading: string;
    stepCard: {
      imgSrc: FileList;
      title: string;
      description: string;
    }[];
  };
  GetStarted: {
    heading: string;
    descriptionone: string;
    descriptiontwo: string;
  };
  WhyChooseUs: {
    heading: string;
    img: FileList;
    card: {
      img: FileList;
      title: string;
      description: string;
    }[];
  };

  statics: {
    heading: string;
    description: string;
    img: FileList;
    card: {
      img: FileList;
      title: string;
      description: string;
    }[];
  };
  WhatData: {
    heading: string;
    descriptionone: string;
    descriptiontwo: string;
    img: FileList;
  };
  WhoData: {
    heading: string;
    descriptionone: string;
    descriptiontwo: string;
    img: FileList;
  };
  Pricing: PricingSection;
}[];
