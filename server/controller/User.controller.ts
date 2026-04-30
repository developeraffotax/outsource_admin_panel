import type { Request, Response } from "express";
import { z } from "zod";
import {
  createUserService,
  deleteUserService,
  listUsersService,
  updateUserPasswordService,
} from "../services/User.service.js";
import { catchAsync } from "../utils/catch-async.js";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const updatePasswordSchema = z.object({
  password: z.string().min(8),
});

const userIdParamsSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid user id"),
});

const listUsersController = catchAsync(async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const users = await listUsersService();
  res.status(200).json({ users });
});

const createUserController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const payload = createUserSchema.parse(req.body);
  const user = await createUserService(payload.email, payload.password);
  res.status(201).json({ user });
});

const updateUserPasswordController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = userIdParamsSchema.parse(req.params);
  const payload = updatePasswordSchema.parse(req.body);

  const user = await updateUserPasswordService(id, payload.password);
  res.status(200).json({ user, message: "Password updated" });
});

const deleteUserController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const currentUserId = req.user?.id;
  if (!currentUserId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { id } = userIdParamsSchema.parse(req.params);
  const user = await deleteUserService(id, currentUserId);

  res.status(200).json({ user, message: "User deleted" });
});

export {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserPasswordController,
};
