import { z } from "zod";
import { AuthService } from "../services/Auth.service.js";
import { validLoginUser } from "../models/User.model.js";
import type { Request, Response } from "express";

async function AuthController(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = validLoginUser(req.body);
    const { token, user } = await AuthService(
      validatedData.email,
      validatedData.password,
    );
    console.log("Generated token:", token);
    console.log("Authenticated user:", validatedData.email);

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
