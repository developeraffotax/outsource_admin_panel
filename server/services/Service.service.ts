import Service from "../models/Service.model.js";
import type { IService, IPricing } from "../models/Service.model.js";

// Fetch all services from MongoDB
export async function getServiceContent(): Promise<IService[]> {
  return Service.find({}).lean();
}

// Fetch a single service by slug
export async function getServiceBySlug(slug: string): Promise<IService | null> {
  return Service.findOne({ slug }).lean();
}

// Fetch pricing by service slug
export async function getServicePricingBySlug(
  slug: string,
): Promise<IPricing | null> {
  const doc = await Service.findOne({ slug }, { _id: 0, Pricing: 1 }).lean<{
    Pricing?: IPricing;
  }>();

  return doc?.Pricing ?? null;
}

// Save a single service by slug (upsert)
export async function saveServiceContent(
  data: Partial<IService>,
): Promise<IService> {
  const doc = await Service.findOneAndUpdate(
    { slug: data.slug },
    { $set: data },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  if (!doc) throw new Error("Failed to save Service content");
  return doc.toObject();
}

// Save only the pricing section for a single service (upsert by slug)
export async function saveServicePricingBySlug(
  slug: string,
  pricing: IPricing,
): Promise<IService> {
  const doc = await Service.findOneAndUpdate(
    { slug },
    { $set: { slug, Pricing: pricing } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  if (!doc) throw new Error("Failed to save Service pricing");
  return doc.toObject();
}
