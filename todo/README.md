# CC - Cloud-Based To-Do List Manager

A full-stack MERN task management application for Cloud Computing practical deployment.

## Features

- Create new tasks
- View all tasks
- Mark tasks as complete/incomplete
- Update task title using edit option
- Delete tasks
- Store task data in MongoDB database
- Deployable on AWS EC2 using Nginx

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express.js
- Database: MongoDB
- Deployment: AWS EC2 Ubuntu + Nginx

## Folder Structure

```text
cc_cloud_todo_manager/
├── backend/
│   ├── server.js
│   ├── Task.js
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── setup.sh
├── run.sh
└── deployment_guide.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a new task |
| PATCH | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## Local Run

```bash
npm install --prefix backend
npm install --prefix frontend
npm run build --prefix frontend
cd backend
npm start
```

Open:

```text
http://localhost:5000
```
