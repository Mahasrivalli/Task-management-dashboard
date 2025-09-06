import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import Table from "../components/Table.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { Bell } from "lucide-react"; // <-- Add this line

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "pending", priority: "medium", dueDate: "" });

  const load = () => api.get("/tasks").then((r) => setTasks(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, dueDate: form.dueDate ? new Date(form.dueDate) : null };
    await api.post("/tasks", payload);
    setForm({ title: "", description: "", status: "pending", priority: "medium", dueDate: "" });
    load();
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>DNX</h2>
        <nav>
          <a href="/">Dashboard</a>
          <a href="/tasks" className="active">Task</a>
          <a href="/mentors">Mentors</a>
          <a href="/messages">Messages</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>
      <main className="main-content">
        <div className="dashboard-topbar">
          <input className="search-box" placeholder="Search..." />
          <div className="topbar-right">
            <span className="time">{new Date().toLocaleTimeString()}</span>
            <div className="icon-btn">
              <Bell size={20} />
            </div>
            <img
              className="profile-pic"
              src="https://i.pravatar.cc/40"
              alt="User"
            />
          </div>
        </div>

        <header>
          <h1>Tasks</h1>
          <p>Manage your tasks efficiently.</p>
        </header>

        <div className="content-grid">
          {/* All Tasks Section */}
          <div className="card">
            <h3>All Tasks</h3>
            <Table
              columns={[
                { key: "title", header: "Title" },
                { key: "status", header: "Status", render: (v) => <StatusBadge status={v} /> },
                { key: "priority", header: "Priority" },
                { key: "dueDate", header: "Due", render: (v) => (v ? new Date(v).toLocaleDateString() : "-") },
                { key: "actions", header: "Actions", render: () => (
                  <div>
                    <button className="button small">Edit</button>
                    <button className="button small danger">Delete</button>
                  </div>
                )},
              ]}
              data={tasks}
              rowHref={(row) => `/tasks/${row._id}`}
            />
          </div>

          {/* Create Task Section */}
          <div className="card">
            <h3>Create Task</h3>
            <form onSubmit={submit} className="task-form">
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <select
                  className="select"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="running">Running</option>
                  <option value="completed">Completed</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              <div className="form-row">
                <select
                  className="select"
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  className="input"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />
              </div>
              <textarea
                className="textarea"
                rows="3"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
              <div className="flex">
                <button className="button" type="submit">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}