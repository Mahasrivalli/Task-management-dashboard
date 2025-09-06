import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import Mentors from "./pages/Mentors.jsx";
import Messages from "./pages/Messages.jsx";
import Settings from "./pages/Settings.jsx";
import SettingNotifications from "./pages/SettingNotifications.jsx";

function Icon({ name }){
  // minimal inline icons
  const map = {
    dashboard: "📊",
    tasks: "✅",
    mentors: "👩🏽‍🏫",
    messages: "✉️",
    settings: "⚙️"
  };
  return <span style={{fontSize:18}}>{map[name] || "•"}</span>;
}

export default function App(){
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">Task Dashboard</div>
        <nav className="nav">
          <NavLink to="/" end><Icon name="dashboard"/> Dashboard</NavLink>
          <NavLink to="/tasks"><Icon name="tasks"/> Tasks</NavLink>
          <NavLink to="/mentors"><Icon name="mentors"/> Mentors</NavLink>
          <NavLink to="/messages"><Icon name="messages"/> Messages</NavLink>
          <NavLink to="/settings"><Icon name="settings"/> Settings</NavLink>
        </nav>
      </aside>
      <header className="topbar">
        <div className="flex">
          <strong>Welcome!</strong>
        </div>
        
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/tasks" element={<Tasks/>} />
          <Route path="/tasks/:id" element={<TaskDetails/>} />
          <Route path="/mentors" element={<Mentors/>} />
          <Route path="/messages" element={<Messages/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/setting-notifications" element={<SettingNotifications />} />
        </Routes>
      </main>
    </div>
  );
}