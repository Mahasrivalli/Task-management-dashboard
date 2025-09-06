import express from "express";
import Mentor from "../models/Mentor.js";

const router = express.Router();

// 🔹 Get a single mentor by ID
router.get("/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    res.json(mentor);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Get all mentors
router.get("/", async (req, res) => {
  const mentors = await Mentor.find().sort({ createdAt: -1 });
  res.json(mentors);
});

// 🔹 Create new mentor
router.post("/", async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// 🔹 Update mentor
router.put("/:id", async (req, res) => {
  try {
    const updated = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// 🔹 Toggle follow status of a mentor
router.put("/follow/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    // Toggle the `followed` status and save
    mentor.followed = !mentor.followed;
    await mentor.save();
    res.json(mentor);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Delete mentor
router.delete("/:id", async (req, res) => {
  try {
    await Mentor.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;