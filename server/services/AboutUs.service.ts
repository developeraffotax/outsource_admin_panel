import type { IAboutUs } from "../models/AboutUs.model";
import AboutUs from "../models/AboutUs.model";

export async function getAboutUsService(): Promise<IAboutUs | null> {
  return AboutUs.findOne({}).lean();
}

export async function saveAboutUsService(
  data: Partial<IAboutUs>,
): Promise<IAboutUs> {
  const doc = await AboutUs.findOneAndUpdate(
    {},
    { $set: data },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  if (!doc) throw new Error("Failed to save buy service content");
  return doc.toObject();
}
