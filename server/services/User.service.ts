import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/User.model.js";
import type { ISafeUser } from "../models/User.model.js";
import { AppError } from "../utils/app-error.js";

const SALT_ROUNDS = 10;

const normalizeRole = (role: unknown): "admin" | "user" =>
  role === "admin" ? "admin" : "user";

const toSafeUser = (user: {
  _id: unknown;
  email: unknown;
  role?: unknown;
}): ISafeUser => ({
  id: String(user._id),
  email: String(user.email),
  role: normalizeRole(user.role),
});

const validateObjectId = (id: string): void => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid user id", 400);
  }
};

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

async function listUsersService(): Promise<ISafeUser[]> {
  const users = await User.find({}, { email: 1, role: 1 }).sort({ email: 1 });
  return users.map((user) => toSafeUser(user));
}

async function createUserService(
  email: string,
  password: string,
): Promise<ISafeUser> {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const createdUser = await User.create({
    email: normalizedEmail,
    password: hashedPassword,
    role: "user",
  });

  return toSafeUser(createdUser);
}

async function updateUserPasswordService(
  userId: string,
  password: string,
): Promise<ISafeUser> {
  validateObjectId(userId);

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.password = await bcrypt.hash(password, SALT_ROUNDS);
  user.role = normalizeRole(user.role);

  await user.save();

  return toSafeUser(user);
}

async function deleteUserService(
  targetUserId: string,
  currentUserId: string,
): Promise<ISafeUser> {
  validateObjectId(targetUserId);
  validateObjectId(currentUserId);

  if (targetUserId === currentUserId) {
    throw new AppError("You cannot delete your own account", 400);
  }

  const deletedUser = await User.findByIdAndDelete(targetUserId);

  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }

  return toSafeUser(deletedUser);
}

export {
  createUserService,
  deleteUserService,
  listUsersService,
  updateUserPasswordService,
};
