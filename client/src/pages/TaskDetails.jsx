import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import StatusBadge from "../components/StatusBadge.jsx";
import { Bell } from "lucide-react";

export default function TaskDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [task, setTask] = useState(null);

  const load = () => api.get(`/tasks/${id}`).then((r) => setTask(r.data));
  useEffect(() => { load(); }, [id]);

  const update = async (changes) => {
    await api.put(`/tasks/${id}`, { ...task, ...changes });
    load();
  };
  const remove = async () => {
    if (confirm("Delete this task?")) {
      await api.delete(`/tasks/${id}`);
      nav("/tasks");
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>DNX</h2>
        <nav>
          <a href="/">Dashboard</a>
          <a href="/tasks">Task</a>
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
          <h1>Task Details</h1>
          <p>View and manage details of {task.title}.</p>
        </header>

        <div className="content-grid">
          <div className="card task-details">
            <h3>{task.title}</h3>
            <img
              src="https://picsum.photos/400/200"
              alt={task.title}
              className="task-img"
            />
            <div className="task-info">
              <div className="flex">
                <StatusBadge status={task.status} />
                <strong>Priority:</strong> {task.priority}
                <strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
              </div>
              <p>{task.description || "No description."}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width:
                      task.status === "completed"
                        ? "100%"
                        : task.status === "running"
                        ? "70%"
                        : "30%",
                  }}
                ></div>
              </div>
            </div>

            <div className="task-actions">
              <div className="flex">
                <select
                  className="select"
                  value={task.status}
                  onChange={(e) => update({ status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="running">Running</option>
                  <option value="completed">Completed</option>
                  <option value="blocked">Blocked</option>
                </select>
                <select
                  className="select"
                  value={task.priority}
                  onChange={(e) => update({ priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button className="button" onClick={remove}>Delete</button>
              </div>
              <button className="button go-to-detail">Go To Detail</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}