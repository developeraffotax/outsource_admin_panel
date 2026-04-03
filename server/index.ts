import express from "express";
import cors from "cors";
import morgan from "morgan";
import dns from "node:dns";
import path from "node:path";

import connectDB from "./config/db.config";
import authRouter from "./router/Auth.router";
import contentRouter from "./router/Content.router";

const app = express();

const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || "http://localhost:5173")
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
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    optionsSuccessStatus: 200,
  }),
);

app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

app.use("/api/content", contentRouter);

app.get("/", (req, res) => {
  res.send("CMS Backend is running");
});

// ❗ IMPORTANT — connect DB here
connectDB();

// ❗ EXPORT app (DO NOT listen)
export default app;
