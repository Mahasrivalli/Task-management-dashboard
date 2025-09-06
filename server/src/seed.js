
import Task from "./models/Task.js";
import Mentor from "./models/Mentor.js";
import Message from "./models/Message.js";
import Setting from "./models/Setting.js";

export async function seedIfEmpty() {
  const t = await Task.estimatedDocumentCount();
  const m = await Mentor.estimatedDocumentCount();
  const g = await Message.estimatedDocumentCount();
  const s = await Setting.estimatedDocumentCount();

  if (t === 0) {
    await Task.insertMany([
      { title: "Design landing page", description: "Create hero + features sections", status: "running", priority: "high", dueDate: new Date(Date.now()+86400000*3)},
      { title: "Fix login bug", description: "Resolve 500 on /auth/login", status: "pending", priority: "medium", dueDate: new Date(Date.now()+86400000*5)},
      { title: "Write tests", description: "Add unit tests for tasks API", status: "completed", priority: "low", dueDate: new Date(Date.now()-86400000*1)},
      { title: "Prepare demo", description: "Slides + screen recording", status: "blocked", priority: "high", dueDate: new Date(Date.now()+86400000*7)}
    ]);
    console.log("🌱 Seeded Tasks");
  }
  if (m === 0) {
    await Mentor.insertMany([
      { name: "Priya Singh", email: "priya@company.com", role: "Frontend", avatar: "" },
      { name: "Arun Kumar", email: "arun@company.com", role: "Backend", avatar: "" },
      { name: "Sara Ali", email: "sara@company.com", role: "QA", avatar: "" }
    ]);
    console.log("🌱 Seeded Mentors");
  }
  if (g === 0) {
    await Message.insertMany([
      { sender: "System", receiver: "Team", subject: "Welcome", body: "Welcome to Task Dashboard 🎉" },
      { sender: "Priya", receiver: "Arun", subject: "API check", body: "Please review the tasks API." }
    ]);
    console.log("🌱 Seeded Messages");
  }
  if (s === 0) {
    await Setting.create({ notifications: { email: true, push: false, sms: false }, theme: "light" });
    console.log("🌱 Seeded Settings");
  }
}
