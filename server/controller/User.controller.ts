import type { Request, Response } from "express";
import { z } from "zod";
import {
  createUserService,
  deleteUserService,
  isUserServiceError,
  listUsersService,
  updateUserPasswordService,
} from "../services/User.service.js";

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

const handleControllerError = (error: unknown, res: Response): void => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
    return;
  }

  if (isUserServiceError(error)) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: "Internal Server Error" });
};

async function listUsersController(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const users = await listUsersService();
    res.status(200).json({ users });
  } catch (error) {
    handleControllerError(error, res);
  }
}

async function createUserController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const payload = createUserSchema.parse(req.body);
    const user = await createUserService(payload.email, payload.password);
    res.status(201).json({ user });
  } catch (error) {
    handleControllerError(error, res);
  }
}

async function updateUserPasswordController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = userIdParamsSchema.parse(req.params);
    const payload = updatePasswordSchema.parse(req.body);

    const user = await updateUserPasswordService(id, payload.password);
    res.status(200).json({ user, message: "Password updated" });
  } catch (error) {
    handleControllerError(error, res);
  }
}

async function deleteUserController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = userIdParamsSchema.parse(req.params);
    const user = await deleteUserService(id, currentUserId);

    res.status(200).json({ user, message: "User deleted" });
  } catch (error) {
    handleControllerError(error, res);
  }
}

export {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserPasswordController,
};
