
import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: false },
    sms: { type: Boolean, default: false }
  },
  theme: { type: String, enum: ["light", "dark"], default: "light" }
}, { timestamps: true });

export default mongoose.model("Setting", SettingSchema);
