
import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: -1 });
  res.json(msgs);
});

router.post("/", async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    res.status(201).json(msg);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/:id/read", async (req, res) => {
  const updated = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
