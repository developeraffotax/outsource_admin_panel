import type { IFaq } from "../models/Faq.model.js";
import Faq from "../models/Faq.model.js";
import { AppError } from "../utils/app-error.js";

export async function getFaqService(): Promise<IFaq | null> {
  return Faq.findOne({}).lean();
}

export async function saveFaqService(data: Partial<IFaq>): Promise<IFaq> {
  const doc = await Faq.findOneAndUpdate(
    {},
    { $set: data },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  if (!doc) throw new AppError("Failed to save FAQ content", 500);
  return doc.toObject();
}
