import express from "express";
import cors from "cors";
import morgan from "morgan";
import dns from "node:dns";
import connectDB from "./config/db.config";
import authRouter from "./router/Auth.router";

const app = express();
const PORT = process.env.PORT || 5000;

const mongoDnsServers = process.env.MONGO_DNS_SERVERS;
if (mongoDnsServers) {
  dns.setServers(
    mongoDnsServers
      .split(",")
      .map((server) => server.trim())
      .filter(Boolean),
  );
}

// Routes
app.use("/api/auth", authRouter);

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

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
