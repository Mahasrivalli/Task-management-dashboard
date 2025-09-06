import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "" },
  avatar: { type: String, default: "" },
  tasks: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  followed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Mentor", MentorSchema);