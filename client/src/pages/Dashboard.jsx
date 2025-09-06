import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bell } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, running: 0, pending: 0 });
  const [mentors, setMentors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    api.get("/tasks/stats").then((r) => setStats(r.data));
    api.get("/mentors").then((r) => setMentors(r.data));
    api.get("/tasks").then((r) => setTasks(r.data));

    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake data for activity chart
  const activityData = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 3 },
    { day: "Wed", tasks: 5 },
    { day: "Thu", tasks: 1 },
    { day: "Fri", tasks: 4 },
    { day: "Sat", tasks: 2 },
    { day: "Sun", tasks: 3 },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>DNX</h2>
        <nav>
          <a href="/" className="active">Dashboard</a>
          <a href="/tasks">Task</a>
          <a href="/mentors">Mentors</a>
          <a href="/messages">Messages</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>
      <main className="main-content">
        {/* Top bar */}
        <div className="dashboard-topbar">
          <input className="search-box" placeholder="Search..." />
          <div className="topbar-right">
            <span className="time">{time}</span>
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
          <h1>Hi, Dennis Nzioki</h1>
          <p>Let's finish your task today!</p>
        </header>

        <div className="content-grid">
          {/* Running Task */}
          <div className="card running-task">
            <h3>Running Task</h3>
            <div className="progress-circle">
              <span>{stats.running}</span>
              <span>{stats.total}</span>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="card activity">
            <h3>Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tasks" stroke="#007bff" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
            <span>This Week</span>
          </div>

          {/* Monthly Mentors */}
          <div className="card mentors">
            <h3>Monthly Mentors</h3>
            {mentors.slice(0, 2).map((m) => (
              <div key={m._id} className="mentor">
                <img src={`https://i.pravatar.cc/40?u=${m.name}`} alt={m.name} />
                <div>
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                  <p>{m.tasks || 0} Task | {m.rating || 0} ({m.reviews || 0} Reviews)</p>
                  <button>{m.followed ? 'Followed' : 'Follow'}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Tasks */}
          <div className="card upcoming-tasks">
            <h3>Upcoming Tasks</h3>
            {tasks.slice(0, 2).map((t) => (
              <div key={t._id} className="task">
                <img src={`https://i.pravatar.cc/40?u=${t.title}`} alt={t.title} />
                <div>
                  <h4>{t.title}</h4>
                  <div className="progress-bar" style={{ width: t.status === "completed" ? "100%" : "60%" }}></div>
                  <p>{t.progress || 60}% | {t.dueDate ? `${new Date(t.dueDate).getDate()} Days Left` : 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Task Today */}
          <div className="card task-today">
            <h3>Task Today</h3>
            <img src="https://picsum.photos/200" alt="task" className="task-img" />
            <h4>{tasks[0]?.title || "No task today"}</h4>
            <p>{tasks[0]?.description || "Description not available"}</p>
            <div className="progress-bar" style={{ width: tasks[0]?.status === "completed" ? "100%" : "70%" }}></div>
            <ul>
              <li>Understand the tools</li>
              <li>Work on basics</li>
              <li>Complete with design</li>
            </ul>
            <button>Go To Detail</button>
          </div>
        </div>
      </main>
    </div>
  );
}