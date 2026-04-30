import type { Request, Response } from "express";
import { z } from "zod";
import {
  getOrderByIdService,
  listOrdersService,
} from "../services/Order.service.js";
import { catchAsync } from "../utils/catch-async.js";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const listOrdersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

const orderIdParamsSchema = z.object({
  id: z.string().regex(OBJECT_ID_REGEX, "Invalid order id"),
});

const listOrdersController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const query = listOrdersQuerySchema.parse(req.query);
  const result = await listOrdersService(query);

  res.status(200).json(result);
});

const getOrderByIdController = catchAsync(async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = orderIdParamsSchema.parse(req.params);
  const order = await getOrderByIdService(id);

  res.status(200).json({ order });
});

export { getOrderByIdController, listOrdersController };
