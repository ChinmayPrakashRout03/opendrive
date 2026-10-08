# 🚀 OpenDrive — Self-Hosting Setup Guide

This guide will help you run OpenDrive on your own machine from scratch.

---

## 📋 Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 20+ | https://nodejs.org |
| npm | 10+ | (comes with Node.js) |
| MySQL | 8+ | https://dev.mysql.com/downloads/ |
| Git | any | https://git-scm.com |

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/chinmayprakashrout/opendrive.git
cd opendrive
```

---

## Step 2 — Create a Google Cloud Project

### 2.1 — Create Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **"New Project"** → Give it a name (e.g. `opendrive`) → **Create**

### 2.2 — Enable Google Drive API
1. Go to **APIs & Services** → **Enable APIs and Services**
2. Search for **"Google Drive API"** → Click **Enable**

### 2.3 — Configure OAuth Consent Screen
1. Go to **Google Auth Platform** → **Overview** → **Get Started**
2. Fill in App name, support email, developer contact email
3. **Scopes** → Add: `openid`, `email`, `profile`, `https://www.googleapis.com/auth/drive`
4. **Audience** → Select **External**
5. Finish and save

### 2.4 — Create OAuth 2.0 Credentials
1. Go to **Google Auth Platform** → **Clients** → **Create Client**
2. Application type: **Web Application**
3. Add **Authorized JavaScript origins**: `http://localhost:5173`
4. Add **Authorized redirect URIs**:
   - `http://localhost:4000/auth/google/callback`
   - `http://localhost:4000/connected-accounts/google/callback`
5. Click **Create** → Copy your `Client ID` and `Client Secret`

### 2.5 — Publish the App
1. Go to **Google Auth Platform** → **Audience**
2. Click **"Publish App"** → Confirm

> **Note:** Until Google verifies your app, users will see an "This app isn't verified" warning.
> They can proceed by clicking **"Advanced"** → **"Go to OpenDrive (unsafe)"**.
> This is completely normal for self-hosted open source apps.

---

## ⚡ Fast-Track: 1-Click Interactive Setup (Recommended)

Once you have your Google `Client ID` and `Client Secret`, you don't need to manually configure `.env` files or run multiple commands. Just run our setup wizard:

* **Windows:**
  Double-click `start.bat` **OR** run in PowerShell:
  ```powershell
  .\setup.ps1
  ```

* **Mac / Linux:**
  Run in Terminal:
  ```bash
  bash setup.sh
  ```

### What this wizard does automatically:
1. 🔑 Asks for your **Google Client ID** & **Google Client Secret**.
2. 🗄️ Asks for your **MySQL DATABASE_URL** (press Enter for default).
3. 🔐 Automatically generates 32-character AES encryption keys and JWT secrets.
4. 📄 Generates and writes `backend/.env` and `frontend/.env`.
5. 📦 Installs dependencies and runs database migrations.
6. 🔑 Seeds your Google OAuth credentials into the database.
7. 🚀 Starts both Backend & Frontend and opens **http://localhost:5173** in your browser!

---

## 🛠️ Alternative: Manual Step-by-Step Setup

If you prefer setting up everything manually instead of using the wizard, follow steps 3 to 8 below:


```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS \`opendrive\`;"
```

---

## Step 4 — Configure Backend Environment

Create `backend/.env` with the following content:

```env
DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/opendrive"
APP_PORT=4000
FRONTEND_URL=http://localhost:5173

JWT_ACCESS_SECRET=any-random-string-at-least-32-characters
TOKEN_ENCRYPTION_KEY=exactly-32-characters-string-here!
ACCESS_TOKEN_TTL_SECONDS=3600
REFRESH_TOKEN_TTL_DAYS=30

MAX_UPLOAD_BYTES=104857600

GOOGLE_CLIENT_ID=your-google-client-id-from-step-2
GOOGLE_CLIENT_SECRET=your-google-client-secret-from-step-2
GOOGLE_REDIRECT_URI=http://localhost:4000/connected-accounts/google/callback

RECAPTCHA_SECRET_KEY=
```

> **Tips:**
> - `TOKEN_ENCRYPTION_KEY` must be **exactly 32 characters**
> - `JWT_ACCESS_SECRET` should be a long random string
> - Leave `RECAPTCHA_SECRET_KEY` blank to disable captcha

---

## Step 5 — Install Dependencies & Run Migrations

### Backend
```bash
cd backend
npm install
npx prisma migrate deploy
npm run seed:google-config
```

### Frontend
```bash
cd frontend
npm install
```

---

## Step 6 — Configure Frontend Environment

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000
VITE_RECAPTCHA_SITE_KEY=
```

---

## Step 7 — Start the Project

**Terminal 1 — Backend:**
```bash
cd backend && npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend && npm run dev
```

---

## Step 8 — Open the App

Visit: **http://localhost:5173** ✅

---

## ✅ Verification Checklist

- [ ] Backend health: `http://localhost:4000/health` → returns `{"status":"ok"}`
- [ ] Frontend running at `http://localhost:5173`
- [ ] Can register with email/password
- [ ] Google login works
- [ ] Can connect Google Drive from Settings page
- [ ] Can upload files

---

## 🐳 Docker Setup (Alternative)

```bash
# 1. Copy and fill env file
cp .env.docker.example .env

# 2. Start all services
docker compose up -d --build

# 3. Seed Google config
docker compose exec backend npm run seed:google-config
```

App will be available at **http://localhost:5173**

---

## ❓ Common Issues

### "No record was found" error on Google login
```bash
cd backend && npm run seed:google-config
```

### Google login shows "Access blocked"
Go to: **Google Auth Platform → Audience → Publish App**

### MySQL connection error
Check `DATABASE_URL` in `backend/.env`. Make sure MySQL is running and password is correct.

### `vite: command not found`
```bash
cd frontend && npm install
```

---

## 🔗 Links

- [Google Cloud Console](https://console.cloud.google.com)
- [Google Drive API Docs](https://developers.google.com/drive)
- [Prisma Docs](https://www.prisma.io/docs)
