import mongoose from "mongoose";
import { z } from "zod";

export const AboutUsSchemaZod = z.object({
  // Hero section
  heading: z.string().optional(),
  subHeading: z.string().optional(),
  img: z.string().optional(),

  // Our Story section
  OurStory: z
    .object({
      imgOurStory: z.string().optional(),
      headingOurStory: z.string().optional(),
      descriptionOurStory: z.string().optional(),
      descriptiontwoOurStory: z.string().optional(),
      missionStatmentCards: z
        .array(
          z.object({
            imgStatment: z.string().optional(),
            headingStatment: z.string().optional(),
            descriptionStatement: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional(),

  // Our Value section
  OurValue: z
    .array(
      z.object({
        imgValue: z.string().optional(),
        headingValue: z.string().optional(),
        descriptionValue: z.string().optional(),
      }),
    )
    .optional(),
});

export type IAboutUs = z.infer<typeof AboutUsSchemaZod>;

export const validAboutUs = (data: unknown): IAboutUs =>
  AboutUsSchemaZod.parse(data);

// Sub-schema for missionStatmentCards array items
const MissionStatmentCardSchema = new mongoose.Schema(
  {
    imgStatment: String,
    headingStatment: String,
    descriptionStatement: String,
  },
  { _id: false },
);

const OurStorySchema = new mongoose.Schema(
  {
    imgOurStory: String,
    headingOurStory: String,
    descriptionOurStory: String,
    descriptiontwoOurStory: String,
    missionStatmentCards: [MissionStatmentCardSchema],
  },
  { _id: false },
);

const OurValueCardSchema = new mongoose.Schema(
  {
    imgValue: String,
    headingValue: String,
    descriptionValue: String,
  },
  { _id: false },
);

const AboutUsSchema = new mongoose.Schema<IAboutUs>({
  heading: String,
  subHeading: String,
  img: String,
  OurStory: OurStorySchema,
  OurValue: [OurValueCardSchema],
});

const AboutUs = mongoose.model<IAboutUs>("AboutUs", AboutUsSchema);

export default AboutUs;
