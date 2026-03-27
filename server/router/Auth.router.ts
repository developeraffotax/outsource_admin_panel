import express from "express";
import { AuthController } from "../controller/Auth.controller";
const router = express.Router();

router.post("/login", AuthController);

export default router;
