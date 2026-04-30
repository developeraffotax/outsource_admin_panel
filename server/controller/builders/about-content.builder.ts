import type { IAboutUs } from "../../models/AboutUs.model.js";
import { parseJsonField, pickImageUrl } from "./shared.js";

export function buildAboutUsContentData(
  reqBody: any,
  fileUrl: (fieldName: string) => string | undefined,
  oldDoc: IAboutUs | null,
) {
  const missionCardsRaw = parseJsonField<{
    imgStatment?: string;
    headingStatment?: string;
    descriptionStatement?: string;
  }>(reqBody.missionStatmentCards);

  const missionStatmentCards = missionCardsRaw.map((card, i) => {
    const imgStatment = pickImageUrl(
      fileUrl(`imgStatment_${i}`),
      oldDoc?.OurStory?.missionStatmentCards?.[i]?.imgStatment,
      card.imgStatment,
    );

    return {
      ...card,
      ...(imgStatment && { imgStatment }),
    };
  });

  const ourValueRaw = parseJsonField<{
    imgValue?: string;
    headingValue?: string;
    descriptionValue?: string;
  }>(reqBody.OurValue);

  const OurValue = ourValueRaw.map((card, i) => {
    const imgValue = pickImageUrl(
      fileUrl(`imgValue_${i}`),
      oldDoc?.OurValue?.[i]?.imgValue,
      card.imgValue,
    );

    return {
      ...card,
      ...(imgValue && { imgValue }),
    };
  });

  const heroImg = pickImageUrl(fileUrl("imgHero"), oldDoc?.img, reqBody.img);
  const ourStoryImg = pickImageUrl(
    fileUrl("imgOurStory"),
    oldDoc?.OurStory?.imgOurStory,
    reqBody.imgOurStory,
  );

  return {
    heading: reqBody.heading,
    subHeading: reqBody.subheading,
    ...(heroImg && { img: heroImg }),
    OurStory: {
      headingOurStory: reqBody.headingOurStory,
      descriptionOurStory: reqBody.descriptionOurStory,
      descriptiontwoOurStory: reqBody.descriptiontwoOurStory,
      ...(ourStoryImg && { imgOurStory: ourStoryImg }),
      missionStatmentCards,
    },
    OurValue,
  };
}
