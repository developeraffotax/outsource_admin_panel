import mongoose from "mongoose";
import { z } from "zod";

export const pricingFeatureSchemaZod = z.object({
  text: z.string().optional(),
  included: z.boolean().optional(),
});

export const pricingPlanSchemaZod = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  checkoutName: z.string().optional(),
  price: z.number().optional(),
  currency: z.string().optional(),
  description: z.string().optional(),
  billingCycle: z.string().optional(),
  isPopular: z.boolean().optional(),
  features: z.array(pricingFeatureSchemaZod).optional(),
});

export const pricingSchemaZod = z.object({
  config: z
    .object({
      eyebrow: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  plans: z.array(pricingPlanSchemaZod).optional(),
});

export type IPricing = z.infer<typeof pricingSchemaZod>;

// --- Zod validation schema ---
export const serviceSchemaZod = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().optional(),
  titleHighlight: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  descriptiontwo: z.string().optional(),
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

  Pricing: pricingSchemaZod.optional(),
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

const PricingFeatureSchema = new mongoose.Schema(
  { text: String, included: Boolean },
  { _id: false },
);

const PricingPlanSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    checkoutName: String,
    price: Number,
    currency: String,
    description: String,
    billingCycle: String,
    isPopular: Boolean,
    features: [PricingFeatureSchema],
  },
  { _id: false },
);

const PricingConfigSchema = new mongoose.Schema(
  {
    eyebrow: String,
    title: String,
    description: String,
  },
  { _id: false },
);

const PricingSchema = new mongoose.Schema(
  {
    config: PricingConfigSchema,
    plans: [PricingPlanSchema],
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
    descriptiontwo: String,
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
    Pricing: PricingSchema,
  },
  { timestamps: true },
);

export default mongoose.model<IService>("Service", ServiceSchema);
