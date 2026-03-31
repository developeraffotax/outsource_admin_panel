import mongoose from "mongoose";

import z from "zod";

export const faqSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
  generalQuiz: z
    .array(
      z.object({
        service: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  bookACall: z
    .object({
      heading: z.string().optional(),
      description: z.string().optional(),
      img: z.string().optional(),
    })
    .optional(),
});

export type IFaq = z.infer<typeof faqSchema>;

export const validFaq = (data: unknown): IFaq => faqSchema.parse(data);

const GeneralQuizSchema = new mongoose.Schema(
  {
    service: String,
    description: String,
  },
  { _id: false },
);

const bookACallSchema = new mongoose.Schema(
  {
    heading: String,
    description: String,
    img: String,
  },
  { _id: false },
);

const Faq = mongoose.model<IFaq>(
  "Faq",
  new mongoose.Schema<IFaq>({
    heading: String,
    description: String,
    link: String,
    generalQuiz: [GeneralQuizSchema],
    bookACall: bookACallSchema,
  }),
);

export default Faq;
