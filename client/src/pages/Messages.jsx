import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import { Bell } from "lucide-react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ sender: "", receiver: "", subject: "", body: "" });

  const load = () => api.get("/messages").then((r) => setMessages(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/messages", form);
    setForm({ sender: "", receiver: "", subject: "", body: "" });
    load();
  };

  const markRead = async (id) => {
    await api.post(`/messages/${id}/read`);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/messages/${id}`);
    load();
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>DNX</h2>
        <nav>
          <a href="/">Dashboard</a>
          <a href="/tasks">Task</a>
          <a href="/mentors">Mentors</a>
          <a href="/messages" className="active">Messages</a>
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
          <h1>Messages</h1>
          <p>View and manage your messages.</p>
        </header>

        <div className="content-grid">
          {/* Messages List Section */}
          <div className="card messages">
            <h3>Inbox</h3>
            {messages.map((m) => (
              <div key={m._id} className={`message ${!m.read ? "unread" : ""}`}>
                <div className="message-info">
                  <strong>{m.subject || "(no subject)"}</strong>
                  <p>
                    {m.sender} ➜ {m.receiver} • {new Date(m.createdAt).toLocaleString()}
                  </p>
                  <p>{m.body}</p>
                </div>
                <div className="message-actions">
                  {!m.read && (
                    <button className="button small" onClick={() => markRead(m._id)}>
                      Mark Read
                    </button>
                  )}
                  <button className="button ghost small" onClick={() => remove(m._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Send Message Section */}
          <div className="card">
            <h3>Send Message</h3>
            <form onSubmit={submit} className="task-form">
              <div className="form-row">
                <input
                  className="input"
                  placeholder="From"
                  value={form.sender}
                  onChange={(e) => setForm({ ...form, sender: e.target.value })}
                  required
                />
                <input
                  className="input"
                  placeholder="To"
                  value={form.receiver}
                  onChange={(e) => setForm({ ...form, receiver: e.target.value })}
                  required
                />
              </div>
              <input
                className="input"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <textarea
                className="textarea"
                rows="3"
                placeholder="Message"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              ></textarea>
              <div className="flex">
                <button className="button" type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}