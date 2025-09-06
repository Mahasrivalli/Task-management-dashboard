
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["pending", "running", "completed", "blocked"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: { type: Date, default: null },
  assignee: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);
