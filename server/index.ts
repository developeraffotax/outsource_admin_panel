import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import morgan from "morgan";
import dns from "node:dns";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

import connectDB from "./config/db.config";
import authRouter from "./router/Auth.router";
import contentRouter from "./router/Content.router";

const app = express();
const PORT = Number(process.env.PORT || 5000);
const isVercel = process.env.VERCEL === "1";
const allowVercelPreviewOrigins = process.env.ALLOW_VERCEL_PREVIEWS === "true";
const currentDir = path.dirname(fileURLToPath(import.meta.url));

let dbConnectionPromise: Promise<void> | null = null;

const ensureDbConnection = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) return;

  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().finally(() => {
      dbConnectionPromise = null;
    });
  }

  await dbConnectionPromise;
};

const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

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
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.has(origin) ||
        (allowVercelPreviewOrigins && origin.endsWith(".vercel.app"))
      ) {
        callback(null, true);
        return;
      }

      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    optionsSuccessStatus: 200,
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(async (_req, _res, next) => {
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
  app.use("/uploads", express.static(path.join(currentDir, "uploads")));
}

app.use("/api/content", contentRouter);

app.get("/", (_req, res) => {
  res.send("CMS Backend is running");
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : "Internal server error";
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
