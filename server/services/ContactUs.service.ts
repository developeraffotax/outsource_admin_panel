import type { IContactUs } from "../models/ContactUs.model";
import ContactUs from "../models/ContactUs.model";

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
  if (!doc) throw new Error("Failed to save buy service content");
  return doc.toObject();
}
