# E-learning Platform (MERN Stack)

A comprehensive EdTech & Learning Management System (LMS) built with **MongoDB**, **Express.js**, **React (Vite)**, and **Node.js**.

---

##  Features

-  **Interactive Course Catalog & Details**: Browse courses with category filtering, searching, and pagination.
-  **Offline & Backend-Resilient**: Gracefully displays fallback featured courses, categories, and reviews when backend services are offline.
-  **Authentication & Role-Based Access**: JWT-based authentication for students and admin dashboards.
-  **Wishlist & Cart System**: Interactive wishlist toggle and course enrollment.
- **Admin Dashboard**: Manage courses, lectures, quizzes, and comments.
-  **Responsive Modern UI**: Built with Bootstrap, Lucide/Bootstrap icons, and clean CSS styling.

---

## 📁 Project Architecture

```
SDLC-Main-Mern-E-lering/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # Axios API client functions
│   │   ├── components/     # Reusable UI components & home sections
│   │   ├── context/        # Auth & global state context
│   │   ├── data/           # Fallback mock datasets (offline preview)
│   │   ├── pages/          # Home, Courses, Course Details, Auth, Dashboard
│   │   └── routes/         # React Router configurations
│   ├── vercel.json         # Vercel SPA routing configuration
│   └── .env.example        # Frontend environment variables template
│
├── server/                 # Express.js REST API backend
│   ├── app/
│   │   ├── Config/         # DB & app configuration
│   │   ├── Controller/     # Admin and User business logic controllers
│   │   ├── Model/          # Mongoose database models
│   │   └── Router/         # Express named route definitions
│   ├── uploads/            # Static uploads
│   ├── app.js              # Server entrypoint
│   └── .env.example        # Backend environment variables template
│
├── .gitignore              # Protects secrets & large zip/node_modules files
└── README.md
```

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or free cloud MongoDB Atlas)

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env     # Update MONGO_URL and JWT secrets in .env
npm run dev
```
Backend will run on `http://localhost:3005`.

### 3. Frontend Setup
```bash
cd ../client
npm install
cp .env.example .env     # Set VITE_API_BASE_URL=http://localhost:3005
npm run dev
```
Frontend will run on `http://localhost:5173`.

---

## 🌐 Cloud Deployment Guide

### A. Free Cloud Database (MongoDB Atlas)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free M0 cluster.
3. Under **Database Access**, create a user & password.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere).
5. Copy your connection string (`mongodb+srv://<user>:<password>@cluster0.mongodb.net/edtech?retryWrites=true&w=majority`).

### B. Backend Deployment on [Render](https://render.com)
1. Push your repository to GitHub.
2. Log in to Render and click **New + Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. In **Environment Variables**, add:
   - `MONGO_URL`: *Your MongoDB Atlas connection string*
   - `PORT`: `10000` (or leave default, Render sets `PORT` automatically)
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: *Your JWT secret*
   - `FRONTEND_URL`: *Your Vercel frontend URL*

### C. Frontend Deployment on [Vercel](https://vercel.com)
1. Log in to Vercel and click **Add New > Project**.
2. Select your GitHub repository.
3. Configure the project:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   - `VITE_API_BASE_URL`: *Your Render backend URL (e.g. `https://your-backend.onrender.com`)*
5. Click **Deploy**.

---

##  Git Push Instructions

Run the following commands in the root workspace directory:

```bash
# Initialize git repository
git init

# Stage all project files (safe .gitignore will prevent uploading heavy zip/node_modules)
git add .

# Create initial commit
git commit -m "feat: complete MERN LMS platform with offline fallback data and deployment configurations"

# Rename branch to main
git branch -M main

# Link to your GitHub repository
git remote add origin https://github.com/sourishchatterjee/E-learning-for-edtech-.git

# Push to GitHub
git push -u origin main
```
