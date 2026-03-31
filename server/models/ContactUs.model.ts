import mongoose from "mongoose";
import { z } from "zod";

export const contactUsSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional(),
  img: z.string().optional(),
  getInTouch: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        detail: z.string().optional(),
        img: z.string().optional(),
      }),
    )
    .optional(),
});

export type IContactUs = z.infer<typeof contactUsSchema>;

export const validContactUs = (data: unknown): IContactUs =>
  contactUsSchema.parse(data);

const GetInTouchSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    detail: String,
    img: String,
  },
  { _id: false },
);

const ContactUs = mongoose.model<IContactUs>(
  "ContactUs",
  new mongoose.Schema<IContactUs>({
    heading: String,
    description: String,
    img: String,
    getInTouch: [GetInTouchSchema],
  }),
);

export default ContactUs;
