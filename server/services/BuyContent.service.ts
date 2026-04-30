import BuyService from "../models/BuyService.model.js";
import type { IBuyService } from "../models/BuyService.model.js";
import { AppError } from "../utils/app-error.js";

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
  if (!doc) throw new AppError("Failed to save buy service content", 500);
  return doc.toObject() as IBuyService;
}
