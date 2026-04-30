import type { IAboutUs } from "../models/AboutUs.model.js";
import AboutUs from "../models/AboutUs.model.js";
import { AppError } from "../utils/app-error.js";

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
  if (!doc) throw new AppError("Failed to save about us content", 500);
  return doc.toObject();
}
