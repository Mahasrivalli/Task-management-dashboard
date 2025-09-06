
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import tasksRouter from "./src/routes/tasks.js";
import mentorsRouter from "./src/routes/mentors.js";
import messagesRouter from "./src/routes/messages.js";
import settingsRouter from "./src/routes/settings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const MONGO = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/task_dashboard";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

app.get("/", (_, res) => res.send("API OK"));

app.use("/api/tasks", tasksRouter);
app.use("/api/mentors", mentorsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/settings", settingsRouter);

// Dev seeding (runs only once per empty collection)
import { seedIfEmpty } from "./src/seed.js";
seedIfEmpty().catch(console.error);

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
