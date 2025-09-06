import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import { Bell } from "lucide-react";

export default function SettingNotifications() {
  const [settings, setSettings] = useState({
    notifications: { email: true, push: false, sms: false, frequency: "immediate" },
  });

  const load = () => api.get("/settings").then((r) => setSettings(r.data));
  useEffect(() => { load(); }, []);

  const update = async (changes) => {
    const next = { ...settings, notifications: { ...settings.notifications, ...changes.notifications } };
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
          <h1>Notification Settings</h1>
          <p>Customize your notification preferences.</p>
        </header>

        <div className="content-grid">
          <div className="card">
            <h3>Notification Preferences</h3>
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
              <span style={{ marginLeft: "8px" }}>Push Notifications</span>
            </label>
            <label className="flex" style={{ marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={settings.notifications?.sms}
                onChange={(e) => update({ notifications: { sms: e.target.checked } })}
              />
              <span style={{ marginLeft: "8px" }}>SMS</span>
            </label>
            <label className="flex" style={{ marginBottom: "8px" }}>
              <span style={{ marginRight: "8px" }}>Frequency:</span>
              <select
                className="select"
                value={settings.notifications?.frequency}
                onChange={(e) => update({ notifications: { frequency: e.target.value } })}
              >
                <option value="immediate">Immediate</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
              </select>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}