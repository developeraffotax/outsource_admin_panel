import BuyService from "../models/BuyService.model";
import type { IBuyService } from "../models/BuyService.model";

// Fetch buy service content
export async function getBuyServiceContent(): Promise<IBuyService | null> {
  return BuyService.findOne({}).lean();
}

// Save (or update) buy service content
export async function saveBuyServiceContent(
  data: Partial<IBuyService>,
): Promise<IBuyService> {
  const doc = await BuyService.findOneAndUpdate(
    {},
    { $set: data },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  if (!doc) throw new Error("Failed to save buy service content");
  return doc.toObject();
}
