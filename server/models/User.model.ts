import mongoose from "mongoose";
import { z } from "zod";

export const UserSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type IUser = z.infer<typeof UserSchemaZod>;

export const validUser = (data: unknown): IUser => UserSchemaZod.parse(data);

export interface ISafeUser {
  id: string;
  email: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
