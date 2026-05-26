# 🎟️ Pratifal — Full Stack Coupon & Reward Manager

> Your one-stop solution to **store, organize, and manage** all your coupon codes and reward offers in a single, beautifully crafted place. No more digging through emails or screenshots to find that one discount code — Pratifal keeps every deal at your fingertips. 🛍️✨

🌐 **Live Demo:** [pratifal-frontend.onrender.com](https://pratifal-frontend.onrender.com)

---

## 📑 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🧐 About

**Pratifal** is a full-stack MERN application that lets users save, categorize, and track every coupon code they collect. Whether it's an e-commerce discount, a referral code, or a one-time gift voucher — Pratifal stores it, lets you mark it as starred, track its expiry, and toggle its redemption status, all behind a secure JWT-authenticated account.

The project is split cleanly into two parts:

- **Frontend** — A snappy React + Vite single-page app styled with Tailwind CSS and enhanced with GSAP, Lenis, and Locomotive Scroll for buttery-smooth animations.
- **Backend** — A RESTful Express.js API backed by MongoDB, with Cloudinary handling profile image uploads.

---

## 🛠️ Tech Stack

### Frontend

| Tech | Purpose |
|------|---------|
| **React 18** | UI library |
| **Vite 5** | Lightning-fast build tool & dev server |
| **React Router DOM v6** | Client-side routing |
| **Tailwind CSS 3** | Utility-first styling |
| **Ant Design** | Pre-built UI components |
| **Axios** | HTTP client |
| **GSAP** | Animation library |
| **Lenis** + **Locomotive Scroll** | Smooth scrolling experience |

### Backend

| Tech | Purpose |
|------|---------|
| **Node.js** + **Express 4** | Runtime & web framework |
| **MongoDB** + **Mongoose 8** | Database & ODM |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **bcrypt** | Password hashing |
| **Cloudinary** | Cloud image storage |
| **Multer** | Multipart/form-data handling for uploads |
| **cookie-parser** | Cookie parsing for auth tokens |
| **CORS** | Cross-origin resource sharing |

---

## ✨ Features

### 🔐 Authentication
- User registration with profile picture upload
- Secure login with hashed passwords (bcrypt)
- JWT-based auth using **access** + **refresh** tokens stored in HttpOnly cookies
- Token refresh endpoint for seamless session continuity
- Protected routes on both frontend (`PrivateRoute`) and backend (`verifyJwt` middleware)

### 👤 User Management
- View and update profile details (username, fullname)
- Replace profile picture (old image auto-deleted from Cloudinary)
- Change password with current-password verification
- Delete account (cascades and removes all owned rewards)

### 🎟️ Coupon & Reward Management
- **Create** rewards with title, description, coupon code, and expiry date
- **Edit** any existing reward
- **Star / Unstar** important rewards for quick access
- **Toggle redeemed** status when you actually use a coupon
- **Delete** rewards you no longer need
- **Search & filter** by title or coupon code (real-time, client-side)
- **Separate views** for all rewards, redeemed rewards, and expired rewards
- **Duplicate prevention** — same coupon code can't be added twice
- **Expiry validation** — past dates are rejected on creation

### 🎨 UI / UX
- Animated landing page with video background, smooth scroll, and horizontal-scroll sections
- Responsive layout (custom `xs: 330px` breakpoint for tiny screens)
- Custom fonts: Press Start 2P, Lato, Headland One, Hanken Grotesk, Harmattan, Economica
- Toast-style success / error feedback components

---

## 📁 Project Structure

```
pratifal_fullStack/
│
├── Backend/                          # Express.js REST API
│   ├── public/temp/                  # Multer temp storage for uploads
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── user.controllers.js   # Register, login, profile, password
│   │   │   └── reward.controllers.js # CRUD + toggle for rewards
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js    # JWT verification
│   │   │   └── multer.middleware.js  # File upload handling
│   │   ├── models/
│   │   │   ├── user.model.js         # User schema + JWT methods
│   │   │   └── rewards.model.js      # Reward schema
│   │   ├── routes/
│   │   │   ├── user.routes.js
│   │   │   └── reward.routes.js
│   │   ├── db/index.js               # MongoDB connection
│   │   ├── utils/
│   │   │   ├── ApiError.js
│   │   │   ├── ApiResponse.js
│   │   │   ├── asyncHandler.js
│   │   │   └── cloudinary.js         # Upload & delete helpers
│   │   ├── app.js                    # Express app setup
│   │   └── index.js                  # Server entry point
│   ├── vercel.json
│   └── package.json
│
├── Frontend/                         # React + Vite SPA
│   ├── public/
│   ├── src/
│   │   ├── assets/                   # Icons, images, fonts, video
│   │   ├── components/
│   │   │   ├── Page.jsx              # Landing page
│   │   │   ├── Home.jsx              # Dashboard (rewards list)
│   │   │   ├── Login.jsx
│   │   │   ├── Ragister.jsx          # (sic) Registration
│   │   │   ├── Profile.jsx
│   │   │   ├── ChangePassword.jsx
│   │   │   ├── CreateReward.jsx
│   │   │   ├── EditReward.jsx
│   │   │   ├── DashBoardNavbar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── littleComponents/     # Reusable UI primitives
│   │   │       ├── Card2.jsx
│   │   │       ├── ColorButton.jsx
│   │   │       ├── IconButton.jsx
│   │   │       ├── ImageUpload.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── TextArea.jsx
│   │   │       ├── HorizontalScroll.jsx
│   │   │       ├── EditProfile.jsx
│   │   │       ├── Error.jsx
│   │   │       └── Success.jsx
│   │   ├── App.jsx                   # Routes + UserContext
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .env.development
│   ├── .env.production
│   └── package.json
│
└── README.md
```

---

## 📡 API Reference

Base URL (dev): `http://localhost:8000/api/v2`
Base URL (prod): `https://pratifal-fullstack.onrender.com/api/v2`

### 👤 User Routes — `/users`

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/ragister` | ❌ | Register a new user (multipart, field `profile` for image) |
| `POST` | `/login` | ❌ | Login with `email` + `password` |
| `POST` | `/logout` | ✅ | Logout & clear cookies |
| `GET`  | `/` | ✅ | Get current logged-in user |
| `GET`  | `/verify-token` | ❌ | Validate access token |
| `PATCH`| `/update-profile` | ✅ | Replace profile picture |
| `PATCH`| `/update-details` | ✅ | Update username / fullname |
| `PATCH`| `/update-password` | ✅ | Change password |
| `POST` | `/refresh-accesstoken` | ❌ | Issue new access token via refresh token |
| `DELETE`| `/delete-user` | ✅ | Permanently delete account + rewards |

### 🎟️ Reward Routes — `/reward`

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/create-reward` | ✅ | Create a new reward |
| `PATCH`| `/update-reward/:id` | ✅ | Edit an existing reward |
| `PATCH`| `/toggle-reward/:id` | ✅ | Toggle starred status |
| `PATCH`| `/toggle-redeem/:id` | ✅ | Toggle redeemed status |
| `DELETE`| `/delete-reward/:id` | ✅ | Delete a reward |
| `GET`  | `/` | ✅ | Get all rewards for current user |
| `GET`  | `/totals` | ✅ | Get total reward count |
| `GET`  | `/redeemed` | ✅ | Get redeemed rewards |
| `GET`  | `/expired-reward` | ✅ | Get expired rewards |

✅ = requires `accessToken` cookie or `Authorization: Bearer <token>` header.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (local instance or [Atlas](https://www.mongodb.com/atlas) cluster)
- **Cloudinary** account (free tier works) — needed for profile image uploads

### 1. Clone the repository

```bash
git clone https://github.com/Kan2003/pratifal_fullStack.git
cd pratifal_fullStack
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/` (see [Environment Variables](#-environment-variables) below), then:

```bash
npm run dev      # starts with nodemon on port 8000 (or PORT from .env)
```

### 3. Setup the Frontend

In a new terminal:

```bash
cd Frontend
npm install
npm run dev      # starts Vite dev server (default: http://localhost:5173)
```

The Vite dev server proxies `/api` to `http://localhost:8000`, so the frontend and backend communicate seamlessly in development.

---

## 🔐 Environment Variables

### Backend (`Backend/.env`)

```env
PORT=8000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net
DB_NAME=pratifal

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary
CLOUDNARY_NAME=your_cloud_name
CLOUDNARY_API_KEY=your_api_key
CLOUDNARY_API_SECRET=your_api_secret
```

> ⚠️ Note: The project uses `CLOUDNARY_*` (without the `I`) — match this spelling in your `.env`.

### Frontend

Two pre-configured files:

- **`Frontend/.env.development`** → `VITE_API_URL='/api/v2'` (uses Vite proxy)
- **`Frontend/.env.production`** → `VITE_API_URL='https://pratifal-fullstack.onrender.com/api/v2'`

---

## 📜 Available Scripts

### Backend

| Command | What it does |
|---------|--------------|
| `npm run dev` | Run with `nodemon` + `cross-env NODE_ENV=development` |
| `npm start` | Run in production mode |

### Frontend

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## ☁️ Deployment

The project is deployed on **Render**:

- 🖼️ **Frontend** → [https://pratifal-frontend.onrender.com](https://pratifal-frontend.onrender.com)
- 🛠️ **Backend** → [https://pratifal-fullstack.onrender.com](https://pratifal-fullstack.onrender.com)

CORS on the backend is configured to allow the frontend origin, and cookies are set with `sameSite: 'None'` + `secure: true` in production to support cross-site auth.

A `vercel.json` is also included in `Backend/` for an alternative Vercel serverless deployment.

---

## 👨‍💻 Author

**Kan2003**

- GitHub: [@Kan2003](https://github.com/Kan2003)
- Repository: [pratifal_fullStack](https://github.com/Kan2003/pratifal_fullStack)

---

## 📝 License

This project is released under the **ISC License** (as declared in `Backend/package.json`). Feel free to fork, learn from, and build on top of it.

---

<div align="center">

⭐ **If you found this project helpful, consider giving it a star on GitHub!** ⭐

Made with ❤️ and a love for clean code.

</div>
