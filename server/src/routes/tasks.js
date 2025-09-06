import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// 🔹 Get task stats
router.get("/stats", async (req, res) => {
  const [total, completed, running, pending] = await Promise.all([
    Task.countDocuments(),
    Task.countDocuments({ status: "completed" }),
    Task.countDocuments({ status: "running" }),
    Task.countDocuments({ status: "pending" })
  ]);
  res.json({ total, completed, running, pending });
});

// 🔹 Get all tasks OR filter by date/month
router.get("/", async (req, res) => {
  const { date, month } = req.query;

  let query = {};

  // If ?date=YYYY-MM-DD is given → return tasks due that day
  if (date) {
    const d = new Date(date);
    const nextDay = new Date(d);
    nextDay.setDate(d.getDate() + 1);
    query.dueDate = { $gte: d, $lt: nextDay };
  }

  // If ?month=YYYY-MM is given → return tasks of that month
  if (month) {
    const start = new Date(`${month}-01`);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);
    query.dueDate = { $gte: start, $lt: end };
  }

  const tasks = await Task.find(query).sort({ dueDate: 1 });
  res.json(tasks);
});

// 🔹 Create new task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// 🔹 Get task by id
router.get("/:id", async (req, res) => {
  const item = await Task.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// 🔹 Update task
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// 🔹 Delete task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
