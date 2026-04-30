import type { IContactUs } from "../models/ContactUs.model.js";
import ContactUs from "../models/ContactUs.model.js";
import { AppError } from "../utils/app-error.js";

export async function getContactUsService(): Promise<IContactUs | null> {
  return ContactUs.findOne({}).lean();
}

export async function saveContactUsService(
  data: Partial<IContactUs>,
): Promise<IContactUs> {
  const doc = await ContactUs.findOneAndUpdate(
    {},
    { $set: data },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  if (!doc) throw new AppError("Failed to save contact us content", 500);
  return doc.toObject();
}
