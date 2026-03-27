import { z } from "zod";
import { AuthService } from "../services/Auth.service";
import { validUser } from "../models/User.model";
import type { Request, Response } from "express";

async function AuthController(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = validUser(req.body);
    const { token, user } = await AuthService(
      validatedData.email,
      validatedData.password,
    );
    res.status(200).json({ token, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export { AuthController };
