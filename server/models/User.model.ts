import mongoose from "mongoose";
import { z } from "zod";

export const UserRoleSchema = z.enum(["admin", "user"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: UserRoleSchema.default("user"),
});

export const LoginSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type IUser = z.infer<typeof UserSchemaZod>;
export type ILoginInput = z.infer<typeof LoginSchemaZod>;

export const validUser = (data: unknown): IUser => UserSchemaZod.parse(data);
export const validLoginUser = (data: unknown): ILoginInput =>
  LoginSchemaZod.parse(data);

export interface ISafeUser {
  id: string;
  email: string;
  role: UserRole;
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
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
