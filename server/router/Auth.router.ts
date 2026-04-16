import express from "express";
import { AuthController } from "../controller/Auth.controller.js";
import AuthMiddleware from "../middleware/Auth.middleware.js";
import RequireAdminMiddleware from "../middleware/RequireAdmin.middleware.js";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserPasswordController,
} from "../controller/User.controller.js";
import {
  getOrderByIdController,
  listOrdersController,
} from "../controller/Order.controller.js";
const router = express.Router();

router.post("/login", AuthController);
router.get("/me", AuthMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get(
  "/users",
  AuthMiddleware,
  RequireAdminMiddleware,
  listUsersController,
);
router.post(
  "/users",
  AuthMiddleware,
  RequireAdminMiddleware,
  createUserController,
);
router.patch(
  "/users/:id/password",
  AuthMiddleware,
  RequireAdminMiddleware,
  updateUserPasswordController,
);
router.delete(
  "/users/:id",
  AuthMiddleware,
  RequireAdminMiddleware,
  deleteUserController,
);

router.get(
  "/orders",
  AuthMiddleware,
  RequireAdminMiddleware,
  listOrdersController,
);
router.get(
  "/orders/:id",
  AuthMiddleware,
  RequireAdminMiddleware,
  getOrderByIdController,
);

export default router;
