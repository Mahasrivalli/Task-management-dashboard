
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  subject: { type: String, default: "" },
  body: { type: String, default: "" },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Message", MessageSchema);
