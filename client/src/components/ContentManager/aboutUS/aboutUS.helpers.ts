import type { FormValues } from "./about-Form.types";
import type { SavedImages } from "./sections/AboutUsProp";

type AboutUsContent = {
  heading?: string;
  subHeading?: string;
  img?: string;
  OurStory?: {
    imgOurStory?: string;
    headingOurStory?: string;
    descriptionOurStory?: string;
    descriptiontwoOurStory?: string;
    missionStatmentCards?: {
      imgStatment?: string;
      headingStatment?: string;
      descriptionStatement?: string;
    }[];
  };
  OurValue?: {
    imgValue?: string;
    headingValue?: string;
    descriptionValue?: string;
  }[];
};

export function mapAboutUsSavedImages(
  content: AboutUsContent | null | undefined,
): SavedImages {
  if (!content) return {};

  return {
    imgHero: content.img,
    imgOurStory: content.OurStory?.imgOurStory,
    ...(content.OurStory?.missionStatmentCards ?? []).reduce(
      (acc: SavedImages, card: { imgStatment?: string }, i: number) => {
        acc[`imgStatment_${i}`] = card.imgStatment;
        return acc;
      },
      {},
    ),
    ...(content.OurValue ?? []).reduce(
      (acc: SavedImages, card: { imgValue?: string }, i: number) => {
        acc[`imgValue_${i}`] = card.imgValue;
        return acc;
      },
      {},
    ),
  };
}

export function mapAboutUsFormDefaults(
  content: AboutUsContent,
): Partial<FormValues> {
  return {
    heading: content.heading ?? "",
    subHeading: content.subHeading ?? "",
    OurStory: {
      imgOurStory: undefined as unknown as FileList,
      headingOurStory: content.OurStory?.headingOurStory ?? "",
      descriptionOurStory: content.OurStory?.descriptionOurStory ?? "",
      descriptiontwoOurStory: content.OurStory?.descriptiontwoOurStory ?? "",
      missionStatmentCards: (content.OurStory?.missionStatmentCards ?? []).map(
        (card) => ({
          imgStatment: undefined as unknown as FileList,
          headingStatment: card.headingStatment ?? "",
          descriptionStatement: card.descriptionStatement ?? "",
        }),
      ),
    },
    OurValue: (content.OurValue ?? []).map((card) => ({
      imgValue: undefined as unknown as FileList,
      headingValue: card.headingValue ?? "",
      descriptionValue: card.descriptionValue ?? "",
    })),
  };
}

export function buildAboutUsFormData(
  data: FormValues,
  savedImages: SavedImages,
): FormData {
  const formData = new FormData();

  formData.append("heading", data.heading);
  formData.append("subheading", data.subHeading);

  if (data.imgHero && data.imgHero.length > 0) {
    formData.append("imgHero", data.imgHero[0]);
  } else if (savedImages.imgHero) {
    formData.append("img", savedImages.imgHero);
  }

  if (data.OurStory?.headingOurStory) {
    formData.append("headingOurStory", data.OurStory.headingOurStory);
  }
  if (data.OurStory?.descriptionOurStory) {
    formData.append("descriptionOurStory", data.OurStory.descriptionOurStory);
  }
  if (data.OurStory?.descriptiontwoOurStory) {
    formData.append(
      "descriptiontwoOurStory",
      data.OurStory.descriptiontwoOurStory,
    );
  }

  if (data.OurStory?.imgOurStory && data.OurStory.imgOurStory.length > 0) {
    formData.append("imgOurStory", data.OurStory.imgOurStory[0]);
  } else if (savedImages.imgOurStory) {
    formData.append("imgOurStory", savedImages.imgOurStory);
  }

  if (data.OurStory?.missionStatmentCards?.length) {
    const cardsData = data.OurStory.missionStatmentCards.map((card, i) => ({
      imgStatment: savedImages[`imgStatment_${i}`],
      headingStatment: card.headingStatment,
      descriptionStatement: card.descriptionStatement,
    }));

    formData.append("missionStatmentCards", JSON.stringify(cardsData));
    data.OurStory.missionStatmentCards.forEach((card, i) => {
      if (card.imgStatment && card.imgStatment.length > 0) {
        formData.append(`imgStatment_${i}`, card.imgStatment[0]);
      }
    });
  }

  if (data.OurValue?.length) {
    const ourValueData = data.OurValue.map((card, i) => ({
      imgValue: savedImages[`imgValue_${i}`],
      headingValue: card.headingValue,
      descriptionValue: card.descriptionValue,
    }));

    formData.append("OurValue", JSON.stringify(ourValueData));
    data.OurValue.forEach((card, i) => {
      if (card.imgValue && card.imgValue.length > 0) {
        formData.append(`imgValue_${i}`, card.imgValue[0]);
      }
    });
  }

  return formData;
}
