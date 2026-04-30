import { authenticateUser } from "../services/Auth.service.js";
import { validLoginUser } from "../models/User.model.js";
import { catchAsync } from "../utils/catch-async.js";
import type { Request, Response } from "express";

const loginController = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const validatedData = validLoginUser(req.body);
  const { token, user } = await authenticateUser(
    validatedData.email,
    validatedData.password,
  );

  res.status(200).json({ token, user });
});

export { loginController };
