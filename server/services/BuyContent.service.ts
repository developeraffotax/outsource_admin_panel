import BuyService from "../models/BuyService.model";
import type { IBuyService } from "../models/BuyService.model";

// Fetch buy service content
export async function getBuyServiceContent(): Promise<IBuyService | null> {
  const doc = await BuyService.findOne({}).lean();
  return doc as IBuyService | null;
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
  return doc.toObject() as IBuyService;
}
