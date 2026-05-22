import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { apiKeyAuth } from "./middleware/auth.js";
import { reservationsRouter } from "./routes/reservations.js";
import { contactRouter } from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "monal-api" });
});

app.use("/api/reservations", apiKeyAuth, reservationsRouter);
app.use("/api/contact", contactRouter);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => {
  console.log(`Monal API running on http://localhost:${PORT}`);
});
