# Task Manager Web App
A modern Task Management Web Application built with React.js + Node.js + MongoDB that helps teams create, assign, and track tasks efficiently.
This project demonstrates full-stack development skills including authentication, CRUD operations, dashboards, charts, file attachments, and team collaboration features.---
## Live Features
- User Authentication (JWT)
- Dashboard analytics with charts
- Create, update, delete tasks
- Task status tracking (Pending / In Progress / Completed)
- Priority levels (Low / Medium / High)
- Assign tasks to team members
- Task checklist (sub tasks)
- File attachments
- Export report Task and User(Excel) 
- Team members overview
- Responsive UI
---
## Tech Stack

### Frontend
- React.js
- TailwindCSS
- Recharts (Charts)
- Axios
- React Router
- Zustand

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- ExcelJS (export report)

---

## Project Structure
Task-Controll
│
├── src
│ ├── assets
│ ├── components
│    ├──input	
│    └──layouts
│ ├── context
│ ├── hooks
│ ├── pages
│    ├──Admin
│    ├──Auth	
│    └──User
│ ├── routes
│ ├── utils
│ └── App.jsx
│
├── server
│ ├── configs
│ ├── controller
│ ├── middleware
│ ├── mode
│ ├── routes
│ ├── uploads
│ └── server.js

---

## Screenshots

### Dashboard

Shows overview of tasks distribution and priority levels with charts.
![Dashboard](https://github.com/user-attachments/assets/bc27564c-22bc-401b-9445-f248c3c17a97)

---

### Manage Tasks

View all tasks with filtering by status.

![Task Management](https://github.com/user-attachments/assets/3d5ac9f5-0c6c-4f77-8f3e-cc9d8f6faeaa)

---

### Create Task

Create tasks with checklist, priority, due date and attachments.

![Create Task](https://github.com/user-attachments/assets/77e7b11c-5f6b-4d60-a9b6-0c1c8d7f1c1c)

---

### Team Members

View team members and task statistics.

![Report](https://github.com/user-attachments/assets/1c6bb1c2-5f5c-4f28-8fd9-8a51e4d4d13b)

---

## Installation

### 1. Clone project

--git clone https://github.com/Huywb/Task-Controll.git
--cd client
--npm install

--cd server
--npm install

### 2. Set up .env file

PORT=8000
MONGO_URL=your_mongodb_url

JWT_SECRET=your_secret_key
ADMIN_INVITE_TOKEN=4588944  //key to change role member to admin

CLIENT_URL=http://localhost:5173


### Key Learning Outcomes
RESTful API design
JWT Authentication
MongoDB data modeling
Dashboard analytics visualization
File upload handling
Excel report export
State management with Zustand
Clean UI with TailwindCSS
Role-based access control
