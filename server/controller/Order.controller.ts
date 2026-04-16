import type { Request, Response } from "express";
import { z } from "zod";
import {
  getOrderByIdService,
  isOrderServiceError,
  listOrdersService,
} from "../services/Order.service.js";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const listOrdersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

const orderIdParamsSchema = z.object({
  id: z.string().regex(OBJECT_ID_REGEX, "Invalid order id"),
});

const handleControllerError = (error: unknown, res: Response): void => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
    return;
  }

  if (isOrderServiceError(error)) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: "Internal Server Error" });
};

async function listOrdersController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const query = listOrdersQuerySchema.parse(req.query);
    const result = await listOrdersService(query);

    res.status(200).json(result);
  } catch (error) {
    handleControllerError(error, res);
  }
}

async function getOrderByIdController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = orderIdParamsSchema.parse(req.params);
    const order = await getOrderByIdService(id);

    res.status(200).json({ order });
  } catch (error) {
    handleControllerError(error, res);
  }
}

export { getOrderByIdController, listOrdersController };
