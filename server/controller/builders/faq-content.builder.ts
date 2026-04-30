import type { IFaq } from "../../models/Faq.model.js";
import { parseJsonField, pickImageUrl } from "./shared.js";

export function buildFaqContentData(
  reqBody: any,
  fileUrl: (fieldName: string) => string | undefined,
  oldDoc: IFaq | null,
) {
  const generalQuizRaw = parseJsonField<{
    service?: string;
    description?: string;
  }>(reqBody.generalQuiz);
  const generalQuiz = generalQuizRaw.map((item, i) => ({
    ...item,
    ...(fileUrl(`generalQuizImg_${i}`) && {
      img: fileUrl(`generalQuizImg_${i}`),
    }),
  }));

  const bookACallImg = pickImageUrl(
    fileUrl("bookACallImg"),
    oldDoc?.bookACall?.img,
    reqBody.bookACallImg,
  );

  return {
    heading: reqBody.heading,
    description: reqBody.description,
    link: reqBody.link,
    generalQuiz,
    bookACall: {
      heading: reqBody.bookACallHeading,
      description: reqBody.bookACallDescription,
      ...(bookACallImg && { img: bookACallImg }),
    },
  };
}
