import HomeContent from "../models/HomeContent.model.js";
import type { IHomeContent } from "../models/HomeContent.model.js";
import { AppError } from "../utils/app-error.js";
// Fetch the homepage content from MongoDB
export async function getHomeContent(): Promise<IHomeContent | null> {
  const doc = await HomeContent.findOne({}).lean();
  return doc as IHomeContent | null;
}

// Save (or update) the homepage content
// Uses "upsert" = insert if no document exists, update if one already exists
// $set means "only update the fields we provide, leave others alone"
export async function saveHomeContent(
  data: Partial<IHomeContent>,
): Promise<IHomeContent> {
  const doc = await HomeContent.findOneAndUpdate(
    {}, // match the one singleton document
    { $set: data }, // only update provided fields
    { upsert: true, new: true, setDefaultsOnInsert: true }, // create if missing, return updated doc
  );
  if (!doc) throw new AppError("Failed to save home content", 500);
  return doc.toObject() as IHomeContent;
}
