import mongoose from "mongoose";
import { z } from "zod";

// --- Zod validation schema ---
export const serviceSchemaZod = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().optional(),
  titleHighlight: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  img: z.string().optional(),
  bgimg: z.string().optional(),

  WhatYouGet: z
    .object({
      heading: z.string().optional(),
      card: z
        .array(
          z.object({
            img: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional(),

  ServiceProcess: z
    .object({
      heading: z.string().optional(),
      highlightheading: z.string().optional(),
      stepCard: z
        .array(
          z.object({
            imgSrc: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional(),

  GetStarted: z
    .object({
      heading: z.string().optional(),
      descriptionone: z.string().optional(),
      descriptiontwo: z.string().optional(),
    })
    .optional(),

  WhyChooseUs: z
    .object({
      heading: z.string().optional(),
      img: z.string().optional(),
      card: z
        .array(
          z.object({
            img: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional(),

  statics: z
    .object({
      heading: z.string().optional(),
      description: z.string().optional(),
      img: z.string().optional(),
      card: z
        .array(
          z.object({
            img: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional(),

  WhatData: z
    .object({
      heading: z.string().optional(),
      descriptionone: z.string().optional(),
      descriptiontwo: z.string().optional(),
      img: z.string().optional(),
    })
    .optional(),

  WhoData: z
    .object({
      heading: z.string().optional(),
      descriptionone: z.string().optional(),
      descriptiontwo: z.string().optional(),
      img: z.string().optional(),
    })
    .optional(),
});

// TypeScript type inferred from the Zod schema
export type IService = z.infer<typeof serviceSchemaZod>;

// --- Mongoose sub-schemas ---
const WhatYouGetCardSchema = new mongoose.Schema(
  { img: String, title: String, description: String },
  { _id: false },
);

const WhatYouGetSchema = new mongoose.Schema(
  { heading: String, card: [WhatYouGetCardSchema] },
  { _id: false },
);

const ServiceProcessStepCardSchema = new mongoose.Schema(
  { imgSrc: String, title: String, description: String },
  { _id: false },
);

const ServiceProcessSchema = new mongoose.Schema(
  {
    heading: String,
    highlightheading: String,
    stepCard: [ServiceProcessStepCardSchema],
  },
  { _id: false },
);

const GetStartedSchema = new mongoose.Schema(
  { heading: String, descriptionone: String, descriptiontwo: String },
  { _id: false },
);

const WhyChooseUsCardSchema = new mongoose.Schema(
  { img: String, title: String, description: String },
  { _id: false },
);

const WhyChooseUsSchema = new mongoose.Schema(
  { heading: String, img: String, card: [WhyChooseUsCardSchema] },
  { _id: false },
);

const StaticsCardSchema = new mongoose.Schema(
  { img: String, title: String, description: String },
  { _id: false },
);

const StaticsSchema = new mongoose.Schema(
  {
    heading: String,
    description: String,
    img: String,
    card: [StaticsCardSchema],
  },
  { _id: false },
);

const WhatDataSchema = new mongoose.Schema(
  {
    heading: String,
    descriptionone: String,
    descriptiontwo: String,
    img: String,
  },
  { _id: false },
);

const WhoDataSchema = new mongoose.Schema(
  {
    heading: String,
    descriptionone: String,
    descriptiontwo: String,
    img: String,
  },
  { _id: false },
);

// --- Main Mongoose schema ---
const ServiceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: String,
    titleHighlight: String,
    subtitle: String,
    description: String,
    buttonText: String,
    img: String,
    bgimg: String,
    WhatYouGet: WhatYouGetSchema,
    ServiceProcess: ServiceProcessSchema,
    GetStarted: GetStartedSchema,
    WhyChooseUs: WhyChooseUsSchema,
    statics: StaticsSchema,
    WhatData: WhatDataSchema,
    WhoData: WhoDataSchema,
  },
  { timestamps: true },
);

export default mongoose.model<IService>("Service", ServiceSchema);
