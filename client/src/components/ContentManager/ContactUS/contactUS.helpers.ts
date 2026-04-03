import type { FormValues } from "./Conact-Form.types";
import type { SavedImages } from "./sections/ConatctUsProps";

type ContactUsContent = {
  heading?: string;
  description?: string;
  img?: string;
  getInTouch?: {
    img?: string;
    title?: string;
    description?: string;
    detail?: string;
  }[];
};

export function mapContactSavedImages(
  content: ContactUsContent | null | undefined,
): SavedImages {
  if (!content) return {};

  return {
    img: content.img,
    ...(content.getInTouch ?? []).reduce(
      (acc: SavedImages, card: { img?: string }, i: number) => {
        acc[`getInTouchImg_${i}`] = card.img;
        return acc;
      },
      {},
    ),
  };
}

export function mapContactFormDefaults(
  content: ContactUsContent,
): Partial<FormValues> {
  return {
    heading: content.heading ?? "",
    description: content.description ?? "",
    getInTouch: (content.getInTouch ?? []).map((card) => ({
      img: undefined as unknown as FileList,
      title: card.title ?? "",
      description: card.description ?? "",
      detail: card.detail ?? "",
    })),
  };
}

export function buildContactFormData(
  data: FormValues,
  savedImages: SavedImages,
): FormData {
  const formData = new FormData();

  formData.append("heading", data.heading);
  formData.append("description", data.description);

  if (data.img && data.img.length > 0) {
    formData.append("img", data.img[0]);
  } else if (savedImages.img) {
    formData.append("img", savedImages.img);
  }

  if (data.getInTouch?.length) {
    const cardsData = data.getInTouch.map((card, i) => ({
      img: savedImages[`getInTouchImg_${i}`],
      title: card.title,
      description: card.description,
      detail: card.detail,
    }));

    formData.append("getInTouch", JSON.stringify(cardsData));
    data.getInTouch.forEach((card, i) => {
      if (card.img && card.img.length > 0) {
        formData.append(`getInTouchImg_${i}`, card.img[0]);
      }
    });
  }

  return formData;
}
