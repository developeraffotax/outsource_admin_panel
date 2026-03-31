import Service from "../models/Service.model";
import type { IService } from "../models/Service.model";

// Fetch all services from MongoDB
export async function getServiceContent(): Promise<IService[]> {
  return Service.find({}).lean();
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
