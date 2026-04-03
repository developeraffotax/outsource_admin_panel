import type { ServicesForm } from "./sections/ServicesProps";

export type ExistingService = {
  slug?: string;
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
};

export function buildServicesTextData(
  data: ServicesForm,
  savedServices: ExistingService[],
) {
  const savedBySlug = new Map(savedServices.map((svc) => [svc.slug, svc]));

  return data.services.map((svc, i) => {
    const existing = savedBySlug.get(svc.slug) ?? savedServices[i];

    return {
      slug: svc.slug,
      title: svc.title,
      titleHighlight: svc.titleHighlight,
      subtitle: svc.subtitle,
      description: svc.description,
      descriptiontwo: svc.descriptiontwo,
      buttonText: svc.buttonText,
      img: existing?.img,
      bgimg: existing?.bgimg,
      WhatYouGet: {
        heading: svc.WhatYouGet?.heading,
        card: svc.WhatYouGet?.card?.map((c, j) => ({
          img: existing?.WhatYouGet?.card?.[j]?.img,
          title: c.title,
          description: c.description,
        })),
      },
      ServiceProcess: {
        heading: svc.ServiceProcess?.heading,
        highlightheading: svc.ServiceProcess?.highlightheading,
        stepCard: svc.ServiceProcess?.stepCard?.map((s, j) => ({
          imgSrc: existing?.ServiceProcess?.stepCard?.[j]?.imgSrc,
          title: s.title,
          description: s.description,
        })),
      },
      GetStarted: svc.GetStarted,
      WhyChooseUs: {
        heading: svc.WhyChooseUs?.heading,
        img: existing?.WhyChooseUs?.img,
        card: svc.WhyChooseUs?.card?.map((c, j) => ({
          img: existing?.WhyChooseUs?.card?.[j]?.img,
          title: c.title,
          description: c.description,
        })),
      },
      statics: {
        heading: svc.statics?.heading,
        description: svc.statics?.description,
        img: existing?.statics?.img,
        card: svc.statics?.card?.map((c, j) => ({
          img: existing?.statics?.card?.[j]?.img,
          title: c.title,
          description: c.description,
        })),
      },
      WhatData: {
        heading: svc.WhatData?.heading,
        descriptionone: svc.WhatData?.descriptionone,
        descriptiontwo: svc.WhatData?.descriptiontwo,
        img: existing?.WhatData?.img,
      },
      WhoData: {
        heading: svc.WhoData?.heading,
        descriptionone: svc.WhoData?.descriptionone,
        descriptiontwo: svc.WhoData?.descriptiontwo,
        img: existing?.WhoData?.img,
      },
    };
  });
}

export function appendServicesImages(formData: FormData, data: ServicesForm) {
  data.services.forEach((svc, i) => {
    if (svc.img?.[0]) formData.append(`img_${i}`, svc.img[0]);
    if (svc.bgimg?.[0]) formData.append(`bgimg_${i}`, svc.bgimg[0]);
    if (svc.WhyChooseUs?.img?.[0]) {
      formData.append(`whyChooseUsImg_${i}`, svc.WhyChooseUs.img[0]);
    }
    if (svc.statics?.img?.[0]) {
      formData.append(`staticsImg_${i}`, svc.statics.img[0]);
    }
    if (svc.WhatData?.img?.[0]) {
      formData.append(`whatDataImg_${i}`, svc.WhatData.img[0]);
    }
    if (svc.WhoData?.img?.[0]) {
      formData.append(`whoDataImg_${i}`, svc.WhoData.img[0]);
    }

    svc.WhatYouGet?.card?.forEach((c, j) => {
      if (c.img?.[0]) {
        formData.append(`whatYouGetCardImg_${i}_${j}`, c.img[0]);
      }
    });

    svc.ServiceProcess?.stepCard?.forEach((s, j) => {
      if (s.imgSrc?.[0]) {
        formData.append(`serviceProcessStepImg_${i}_${j}`, s.imgSrc[0]);
      }
    });

    svc.WhyChooseUs?.card?.forEach((c, j) => {
      if (c.img?.[0]) {
        formData.append(`whyChooseUsCardImg_${i}_${j}`, c.img[0]);
      }
    });

    svc.statics?.card?.forEach((c, j) => {
      if (c.img?.[0]) {
        formData.append(`staticsCardImg_${i}_${j}`, c.img[0]);
      }
    });
  });
}

export function createEmptyService(): ServicesForm["services"][number] {
  return {
    slug: "",
    title: "",
    titleHighlight: "",
    subtitle: "",
    description: "",
    descriptiontwo: "",
    buttonText: "",
    img: undefined as unknown as FileList,
    bgimg: undefined as unknown as FileList,
    WhatYouGet: { heading: "", card: [] },
    ServiceProcess: {
      heading: "",
      highlightheading: "",
      stepCard: [],
    },
    GetStarted: {
      heading: "",
      descriptionone: "",
      descriptiontwo: "",
    },
    WhyChooseUs: {
      heading: "",
      img: undefined as unknown as FileList,
      card: [],
    },
    statics: {
      heading: "",
      description: "",
      img: undefined as unknown as FileList,
      card: [],
    },
    WhatData: {
      heading: "",
      descriptionone: "",
      descriptiontwo: "",
      img: undefined as unknown as FileList,
    },
    WhoData: {
      heading: "",
      descriptionone: "",
      descriptiontwo: "",
      img: undefined as unknown as FileList,
    },
  };
}
