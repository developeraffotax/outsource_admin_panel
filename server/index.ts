import express from "express";
import cors from "cors";
import morgan from "morgan";
import dns from "node:dns";
import connectDB from "./config/db.config";
import authRouter from "./router/Auth.router";
import path from "node:path";
import contentRouter from "./router/Content.router";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = new Set(
  (
    process.env.CORS_ORIGINS ||
    process.env.REACT_APP_URL ||
    "http://localhost:5173"
  )
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
      // Allow non-browser requests (SSR/server-to-server/curl) with no Origin header.
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

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
