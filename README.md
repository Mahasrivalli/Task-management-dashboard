
# Task Management Dashboard (MERN)

This is a ready-to-run starter matching your pages: **Dashboard, Tasks, Task Details, Mentors, Messages, Settings (Notifications)** with a consistent dashboard CSS.

## 1) Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection string

## 2) Backend Setup
```bash
cd server
cp .env.example .env   # edit .env if needed
npm install
npm run dev
```
Server runs on **http://localhost:5000**. On first run, the DB will auto-seed sample data.

## 3) Frontend Setup
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Frontend Vite dev server at **http://localhost:5173**.

## 4) Connect Frontend to Backend
By default the frontend points to `http://localhost:5000/api`. To change it, create a `.env` in `/client`:
```
VITE_API_BASE=http://localhost:5000/api
```

## 5) Pages & Features
- **Dashboard**: KPI cards + recent tasks
- **Tasks**: CRUD tasks, view details
- **Task Details**: Update status/priority, delete
- **Mentors**: List, create, delete
- **Messages**: List, send, mark read, delete
- **Settings**: Theme + notifications toggles

## 6) Styling
A single `globals.css` (no external libraries) ensures identical look across pages.

## 7) Common Issues
- If MongoDB isn't running, start it or update `MONGODB_URI` in `server/.env`.
- CORS or port conflicts: stop other services using ports 5000 or 5173.
- Seed data appears only when collections are empty.

Happy building! 🚀
