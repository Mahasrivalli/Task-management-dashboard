import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import { Bell } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({ notifications: { email: true, push: false, sms: false }, theme: "light" });

  const load = () => api.get("/settings").then((r) => setSettings(r.data));
  useEffect(() => { load(); }, []);

  const update = async (changes) => {
    const next = { ...settings, ...changes };
    if (changes.notifications) {
      next.notifications = { ...settings.notifications, ...changes.notifications };
    }
    const { data } = await api.put("/settings", next);
    setSettings(data);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>DNX</h2>
        <nav>
          <a href="/">Dashboard</a>
          <a href="/tasks">Task</a>
          <a href="/mentors">Mentors</a>
          <a href="/messages">Messages</a>
          <a href="/settings" className="active">Settings</a>
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
          <h1>Settings</h1>
          <p>Configure your preferences.</p>
        </header>

        <div className="content-grid">
          {/* Theme Settings Section */}
          <div className="card">
            <h3>Theme</h3>
            <div className="flex" style={{ gap: "12px", alignItems: "center" }}>
              <button
                className="button"
                onClick={() => update({ theme: "light" })}
                disabled={settings.theme === "light"}
              >
                Light
              </button>
              <button
                className="button ghost"
                onClick={() => update({ theme: "dark" })}
                disabled={settings.theme === "dark"}
              >
                Dark
              </button>
              <div style={{ color: "var(--subtext)" }}>
                Current: <strong>{settings.theme}</strong>
              </div>
            </div>
          </div>

          {/* Notifications Settings Section */}
          <div className="card">
            <h3>Notifications</h3>
            <label className="flex" style={{ marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={settings.notifications?.email}
                onChange={(e) => update({ notifications: { email: e.target.checked } })}
              />
              <span style={{ marginLeft: "8px" }}>Email</span>
            </label>
            <label className="flex" style={{ marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={settings.notifications?.push}
                onChange={(e) => update({ notifications: { push: e.target.checked } })}
              />
              <span style={{ marginLeft: "8px" }}>Push</span>
            </label>
            <label className="flex">
              <input
                type="checkbox"
                checked={settings.notifications?.sms}
                onChange={(e) => update({ notifications: { sms: e.target.checked } })}
              />
              <span style={{ marginLeft: "8px" }}>SMS</span>
            </label>
            <a href="/setting-notifications" className="button" style={{ marginTop: "12px", display: "block" }}>
              Manage Notifications
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}