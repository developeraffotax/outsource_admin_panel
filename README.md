# CMS

A full-stack Content Management System built with React on the frontend and Express + MongoDB on the backend.

## Tech Stack

**Frontend (`/client`)**

- React 19 + TypeScript
- Vite (with React Compiler)
- Tailwind CSS v4
- React Router DOM
- React Hook Form
- Axios
  **Backend (`/server`)**
- Node.js runtime
- Express 5
- MongoDB + Mongoose
- JWT authentication
- Bcrypt for password hashing
- Zod for validation
- Multer for file uploads
- Morgan for logging

## Project Structure

```
CMS/
├── client/   # React frontend
└── server/   # Express backend
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for the client)
- [Node.js](https://nodejs.org/) (for the server)
- [MongoDB](https://www.mongodb.com/) instance

### Install Dependencies

```bash
# Frontend
cd client
npm install
# Backend
cd server
npm install
```

### Run in Development

```bash
# Frontend (http://localhost:5173)
cd client
npm run dev
# Backend (http://localhost:5000)
cd server
npm run dev
```

## API Endpoints

| Method | Route             | Description                        | Auth required |
| ------ | ----------------- | ---------------------------------- | ------------- |
| POST   | `/api/auth/login` | Log in and receive a JWT           | No            |
| GET    | `/api/auth/me`    | Get the current authenticated user | Yes           |
