import type { IFaq } from "../models/Faq.model";
import Faq from "../models/Faq.model";

export async function getFaqService(): Promise<IFaq | null> {
  return Faq.findOne({}).lean();
}

export async function saveFaqService(data: Partial<IFaq>): Promise<IFaq> {
  const doc = await Faq.findOneAndUpdate(
    {},
    { $set: data },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  if (!doc) throw new Error("Failed to save buy service content");
  return doc.toObject();
}
