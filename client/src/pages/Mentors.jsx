import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import { Bell } from "lucide-react";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  const load = () => api.get("/mentors").then((r) => setMentors(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/mentors", form);
    setForm({ name: "", email: "", role: "" });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/mentors/${id}`);
    load();
  };

  const toggleFollow = async (id) => {
    const mentor = mentors.find((m) => m._id === id);
    await api.put(`/mentors/${id}`, { ...mentor, followed: !mentor.followed });
    load();
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>DNX</h2>
        <nav>
          <a href="/">Dashboard</a>
          <a href="/tasks">Task</a>
          <a href="/mentors" className="active">Mentors</a>
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
          <h1>Mentors</h1>
          <p>Connect with your mentors.</p>
        </header>

        <div className="content-grid">
          {/* Mentors List Section */}
          <div className="card mentors">
            <h3>Monthly Mentors</h3>
            {mentors.map((m) => (
              <div key={m._id} className="mentor">
                <img
                  src={`https://i.pravatar.cc/40?u=${m.name}`}
                  alt={m.name}
                  className="avatar"
                />
                <div className="mentor-info">
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                  <p>
                    {m.tasks || 0} Task | {m.rating || 0} ({m.reviews || 0} Reviews)
                  </p>
                </div>
                <button
                  className="button"
                  onClick={() => toggleFollow(m._id)}
                >
                  {m.followed ? "Followed" : "Follow"}
                </button>
                <button
                  className="button ghost"
                  onClick={() => remove(m._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Add Mentor Section */}
          <div className="card">
            <h3>Add Mentor</h3>
            <form onSubmit={submit} className="task-form">
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  className="input"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <input
                className="input"
                placeholder="Role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <div className="flex">
                <button className="button" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}