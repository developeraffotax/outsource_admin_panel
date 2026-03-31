export type FormValues = {
  slug: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
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
}[];
