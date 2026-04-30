import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import morgan from "morgan";
import dns from "node:dns";
import path from "node:path";
import mongoose from "mongoose";
import { z } from "zod";

import connectDB from "./config/db.config.js";
import { corsOptions } from "./config/cors.config.js";
import authRouter from "./router/Auth.router.js";
import contentRouter from "./router/Content.router.js";
import { AppError } from "./utils/app-error.js";

const app = express();
const isVercel = process.env.VERCEL === "1";
const PORT = Number(process.env.PORT || 5000);
const uploadsDir = path.join(process.cwd(), "uploads");

let dbConnectionPromise: Promise<void> | null = null;

const ensureDbConnection = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().finally(() => {
      dbConnectionPromise = null;
    });
  }

  await dbConnectionPromise;
};

const mongoDnsServers = process.env.MONGO_DNS_SERVERS;
if (mongoDnsServers) {
  dns.setServers(
    mongoDnsServers
      .split(",")
      .map((server) => server.trim())
      .filter(Boolean),
  );
}

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", async (_req, _res, next) => {
  try {
    await ensureDbConnection();
    next();
  } catch (err) {
    next(err);
  }
});

// Routes
app.use("/api/auth", authRouter);

if (!isVercel) {
  app.use("/uploads", express.static(uploadsDir));
}

app.use("/api/content", contentRouter);

app.get("/", (_req, res) => {
  res.send("CMS Backend is running");
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ error: err.issues });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  const message = err instanceof Error ? err.message : "Internal Server Error";
  res.status(500).json({ error: message });
});

if (!isVercel) {
  ensureDbConnection()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
}

export default app;
