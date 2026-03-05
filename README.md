# Saraswati School Website

A full-stack, professional-grade school management website built with **React.js**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. It provides dedicated portals for administrators, teachers, and parents, along with features for student management, fee payment, marks tracking, admissions, and announcements.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [License](#license)

---

## Features

### 🏫 Admin Portal
- Secure admin login and session management
- Dashboard with key statistics
- Student creation, editing, and listing
- Medium (language of instruction) selection
- Exam type configuration and management
- Announcement creation and management
- Audit log viewing
- Payment approval panel
- Fee structure configuration (class fees and bus fees)

### 👩‍🏫 Teacher Portal
- Teacher registration and login
- Dashboard with assigned students
- Upload and manage student marks
- Set maximum marks per exam type
- Subject and exam configuration
- View teacher requests

### 👨‍👩‍👧 Parent Portal
- Parent login linked to their child's student record
- View student academic progress and marks
- Download marksheets as PDF
- View announcements
- Initiate and track fee payments via Razorpay
- Upload payment screenshots for approval

### 📋 Other Features
- **Admissions**: Online admission form with admin viewer
- **Announcements**: Public-facing announcement section on the landing page
- **Bus Fee Management**: Route-based bus fee assignment
- **Toppers Section**: Display top-performing students
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Security**: JWT-based authentication, HTTP security headers via Helmet, CORS protection

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, React Router v6, Tailwind CSS |
| UI/Icons  | Lucide React, React Icons               |
| PDF       | jsPDF, jsPDF-AutoTable                  |
| HTTP      | Axios                                   |
| Notifications | React Toastify                      |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB (Mongoose ODM)                  |
| Auth      | JSON Web Tokens (JWT), bcrypt           |
| Payments  | Razorpay                                |
| Email     | Nodemailer                              |
| Security  | Helmet, CORS, cookie-parser             |

---

## Project Structure

```
school-website/
├── backend/
│   ├── controllers/        # Route handler logic
│   ├── middleware/         # Auth and other middleware
│   ├── models/             # Mongoose data models
│   ├── routes/             # Express route definitions
│   ├── scripts/            # Utility scripts
│   ├── utils/              # Helper utilities
│   ├── config.template.js  # Environment variable reference
│   ├── server.js           # Express app entry point
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── context/        # React context providers (Auth, Admin, Parent)
│   │   ├── pages/          # Page-level React components
│   │   ├── App.js          # Root component and routing
│   │   ├── LandingPage.jsx # Public landing page
│   │   └── index.js        # React entry point
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher (LTS recommended)
- [MongoDB](https://www.mongodb.com/) v6 or higher (local or Atlas)
- A [Razorpay](https://razorpay.com/) account (for payment features)
- An SMTP email account (e.g., Gmail App Password) for email notifications

---

## Installation

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create your environment file using the template as reference
# (see Environment Variables below for the required keys)
cp config.template.js .env
# Open .env and replace the placeholder values with your actual configuration
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/excellenceSchool

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Upload
MAX_FILE_SIZE=50mb
```

> ⚠️ Never commit your `.env` file to version control.

---

## Running the Application

### Start the Backend

```bash
cd backend

# Development (with auto-reload)
npm run dev

# Production
npm start
```

The API server will start on `http://localhost:5000`.  
Health check: `http://localhost:5000/api/health`

### Start the Frontend

```bash
cd frontend
npm start
```

The React app will start on `http://localhost:3000` and proxy API calls to the backend automatically.

---

## API Overview

| Prefix               | Description                        |
|----------------------|------------------------------------|
| `/api/admin`         | Admin authentication and actions   |
| `/api/teachers`      | Teacher registration and management|
| `/api/parents`       | Parent login and dashboard data    |
| `/api/students`      | Student CRUD operations            |
| `/api/marks`         | Marks upload, editing, and retrieval|
| `/api/config`        | Exam type and subject configuration|
| `/api/bus`           | Bus route and fee management       |
| `/api/admissions`    | Admission form submissions         |
| `/api/announcements` | Announcement creation and listing  |
| `/api/payments`      | Payment initiation and approval    |
| `/api/health`        | Server health check                |

---

## License

This project is licensed under the [MIT License](LICENSE).
