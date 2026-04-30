import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import type { ISafeUser, UserRole } from "../models/User.model.js";
import { AppError } from "../utils/app-error.js";

async function authenticateUser(
  email: string,
  password: string,
): Promise<{ token: string; user: ISafeUser }> {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid password", 400);
  }

  const normalizedEmail = user.email.trim().toLowerCase();
  const isReservedAdmin = normalizedEmail === "admin@gmail.com";
  const role: UserRole =
    user.role === "admin" || isReservedAdmin ? "admin" : "user";

  // Keep legacy records consistent so admin menu/routing works after login.
  if (isReservedAdmin && user.role !== "admin") {
    user.role = "admin";
    await user.save();
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("Server misconfigured: JWT secret missing", 500);
  }

  const token = jwt.sign(
    { id: user._id.toString(), role },
    secret,
    {
      expiresIn: "8h",
    },
  );

  const safeUser: ISafeUser = {
    id: user._id.toString(),
    email: user.email,
    role,
  };

  return {
    token,
    user: safeUser,
  };
}
export { authenticateUser };
