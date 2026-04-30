import type { IContactUs } from "../../models/ContactUs.model.js";
import { parseJsonField, pickImageUrl } from "./shared.js";

export function buildContactUsContentData(
  reqBody: any,
  fileUrl: (fieldName: string) => string | undefined,
  oldDoc: IContactUs | null,
) {
  const getInTouchRaw = parseJsonField<{
    img?: string;
    title?: string;
    description?: string;
    detail?: string;
  }>(reqBody.getInTouch);

  const getInTouch = getInTouchRaw.map((item, i) => {
    const img = pickImageUrl(
      fileUrl(`getInTouchImg_${i}`),
      oldDoc?.getInTouch?.[i]?.img,
      item.img,
    );

    return {
      ...item,
      ...(img && { img }),
    };
  });

  const heroImg = pickImageUrl(fileUrl("img"), oldDoc?.img, reqBody.img);

  return {
    heading: reqBody.heading,
    description: reqBody.description,
    ...(heroImg && { img: heroImg }),
    getInTouch,
  };
}
