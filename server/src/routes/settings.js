
import express from "express";
import Setting from "../models/Setting.js";

const router = express.Router();

// Load single settings doc (auto-create on first read)
router.get("/", async (req, res) => {
  let s = await Setting.findOne();
  if (!s) s = await Setting.create({});
  res.json(s);
});

router.put("/", async (req, res) => {
  let s = await Setting.findOne();
  if (!s) s = await Setting.create({});
  Object.assign(s, req.body);
  await s.save();
  res.json(s);
});

export default router;
