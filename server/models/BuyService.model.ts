import mongoose from "mongoose";
import { z } from "zod";

export const BuyServiceSchemaZod = z.object({
  entries: z
    .array(z.object({ name: z.string(), price: z.string() }))
    .optional(),
});

export type IBuyService = z.infer<typeof BuyServiceSchemaZod>;

const EntrySchema = new mongoose.Schema({ name: String, price: String });

const BuyServiceSchema = new mongoose.Schema(
  { entries: [EntrySchema] },
  { timestamps: true },
);

export default mongoose.model("BuyService", BuyServiceSchema);
