<div align="center">

  <a href="https://github.com/ChinmayPrakashRout03/OpenDrive">
    <img src="./assets/logo.png" alt="OpenDrive Logo" width="130" style="border-radius: 28px; box-shadow: 0 12px 36px rgba(239, 68, 68, 0.45); margin-bottom: 12px;" />
  </a>

  <p align="center">
    <a href="https://github.com/ChinmayPrakashRout03/OpenDrive">
      <img src="https://readme-typing-svg.demolab.com?font=Outfit&weight=800&size=38&pause=1400&color=EF4444&center=true&vCenter=true&width=740&height=70&lines=%F0%9F%9A%80+OpenDrive+%E2%80%94+Infinite+Cloud+Storage;%E2%9A%A1+Multi-Account+Google+Drive+Aggregator;%F0%9F%9B%A1%EF%B8%8F+Zero-Disk+Direct+RAM+Streaming+Engine;%F0%9F%8C%90+100%25+Free%2C+Open-Source+%26+Self-Hosted;%F0%9F%92%8E+Combine+Multiple+15GB+Accounts+Into+One" alt="OpenDrive Animated Title" />
    </a>
  </p>

  <h3><b>The Ultimate Multi-Account Google Drive Storage Gateway & Virtual Cloud Aggregator</b></h3>
  <p><i>Pool Unlimited Google Drive Accounts • 0 Bytes Server Disk Storage • Smart Quota Routing • Direct RAM-to-Cloud Streaming</i></p>

  <p align="center">
    <a href="https://github.com/ChinmayPrakashRout03/OpenDrive/stargazers"><img src="https://img.shields.io/github/stars/ChinmayPrakashRout03/OpenDrive?style=for-the-badge&color=EF4444&logo=star&logoColor=white" alt="GitHub Stars" /></a>
    <a href="https://github.com/ChinmayPrakashRout03/OpenDrive/releases"><img src="https://img.shields.io/badge/Release-v1.0.0--Production-10B981?style=for-the-badge&logo=google-drive&logoColor=white" alt="Release Version" /></a>
    <a href="https://github.com/ChinmayPrakashRout03/OpenDrive/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="License" /></a>
    <a href="https://github.com/ChinmayPrakashRout03/OpenDrive"><img src="https://img.shields.io/badge/Security-AES--256--GCM-8B5CF6?style=for-the-badge&logo=shield&logoColor=white" alt="AES-256 Security" /></a>
    <a href="https://github.com/ChinmayPrakashRout03/OpenDrive"><img src="https://img.shields.io/badge/Docker-Ready-06B6D4?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Ready" /></a>
    <a href="https://github.com/ChinmayPrakashRout03"><img src="https://img.shields.io/badge/Author-Chinmay%20Prakash%20Rout-EF4444?style=for-the-badge&logo=github&logoColor=white" alt="Author" /></a>
  </p>

  <p align="center">
    <b>Stop paying for recurring cloud subscriptions when you already own multiple Google accounts. ☁️</b><br/>
    <b>OpenDrive</b> aggregates unlimited Google Drive accounts into a single, high-speed virtual filesystem. It streams gigabytes of uploads in real-time straight into Google Drive using Node.js RAM pipelines — <b>never storing a single byte on your server's disk</b>.
  </p>

  <p align="center">
    <a href="#-quick-start--1-click-setup">⚡ Quick Start</a> •
    <a href="#-live-screenshot-gallery">📸 UI Showcase</a> •
    <a href="#-the-vibe-coder-story-why-opendrive">💡 The Story</a> •
    <a href="#-core-architecture--zero-disk-pipeline">🏗️ Architecture</a> •
    <a href="#-comparison-matrix">📊 Comparison</a> •
    <a href="#-developer-api--curl-uploads">🔌 API Docs</a>
  </p>

</div>

---

## 🌟 What Makes OpenDrive Special?

<div align="center">
  <a href="./assets/storage-aggregation.png">
    <img src="./assets/storage-aggregation.png" alt="Multi-Account Storage Aggregation Concept" width="460" style="border-radius: 14px; box-shadow: 0 8px 28px rgba(0,0,0,0.12); margin: 16px 0;" />
  </a>
  <p><i>Turn N × 15 GB free accounts into one massive, unified 60 GB+ cloud storage pool!</i></p>
</div>

* **⚡ Zero Server Disk Consumption**: Most self-hosted clouds buffer uploads to local storage before sending them onwards, which instantly crashes a cheap $5 VPS when uploading a 5GB file. OpenDrive uses high-performance memory pipelines (`Busboy` + `Undici` stream) to stream chunks straight to Google Drive in real time.
* **🔗 Unlimited Connected Accounts**: No artificial 1-account or 7-account locks. Connect as many Google accounts as you need. If you have 5 Google accounts, you instantly have **75 GB of high-speed cloud storage** for free.
* **🧭 Smart Quota-Aware Routing**: Uploads automatically route to the account with the most remaining gigabytes (**Most Available Space**), or rotate cyclically (**Round Robin**), or sequentially fill drives (**Priority Order**).
* **📂 Auto-Managed `OpenDrive` Folder**: All uploaded files are sandboxed into a dedicated root folder named `OpenDrive` on each connected Google account. Your personal Google Drive files remain completely separate and untouched.
* **🎬 Instant Media Streaming & Previews**: Stream large 4K/1080p MP4/MKV video files with instant seek bar response via an embedded **Plyr.js** player using HTTP Range requests. Preview PDFs, high-res images, and text documents directly in your browser.
* **🔗 Public Share Links (Zero Login Required)**: Create custom share links with expiration timers, view counters, and direct download buttons. Friends, family, or clients do not need a Google account or OpenDrive account to stream or download.
* **🔑 Developer API with `od_live_` Keys**: Generate programmatic API keys to stream backups, server logs, or media files directly from external scripts, GitHub Actions, or `curl`.

---

## 📸 Live Screenshot Gallery

All screenshots captured live from the running OpenDrive web application at 2x Retina resolution (1440×900).

### 1. Unified Dashboard & Storage Aggregation

<table>
  <tr>
    <td width="50%" align="center">
      <b>🖥️ Unified All-Files Dashboard</b><br/><br/>
      <a href="./screenshot/03-all-files-dashboard.png">
        <img src="./screenshot/03-all-files-dashboard.png" alt="All Files Dashboard" width="100%" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />
      </a>
      <p><i>Virtual folders, active search, real-time combined storage meter, and instant file actions.</i></p>
    </td>
    <td width="50%" align="center">
      <b>☁️ Multi-Account Storage Pooling Concept</b><br/><br/>
      <a href="./assets/storage-aggregation.png">
        <img src="./assets/storage-aggregation.png" alt="Multi-Account Storage Aggregation" width="100%" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(239,68,68,0.15);" />
      </a>
      <p><i>Pool unlimited 15GB free Google Drive accounts into one massive, unified 60GB+ cloud pool.</i></p>
    </td>
  </tr>
</table>

### 2. Multi-Account Telemetry & Account Management

<table>
  <tr>
    <td width="50%" align="center">
      <b>📊 Multi-Account Quota Tracker</b><br/><br/>
      <a href="./screenshot/04-quota-tracker.png">
        <img src="./screenshot/04-quota-tracker.png" alt="Quota Tracker" width="100%" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />
      </a>
      <p><i>Live per-account storage breakdown, one-click quota refresh, and routing policy switcher.</i></p>
    </td>
    <td width="50%" align="center">
      <b>⚙️ Connected Google Accounts Manager</b><br/><br/>
      <a href="./screenshot/05-settings-connected-accounts.png">
        <img src="./screenshot/05-settings-connected-accounts.png" alt="Settings & Connected Accounts" width="100%" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />
      </a>
      <p><i>Connect unlimited Google accounts with OAuth 2.0, view account health, and manage credentials.</i></p>
    </td>
  </tr>
</table>

### 3. Developer API & Activity Audit Trail

<table>
  <tr>
    <td width="50%" align="center">
      <b>🔑 Programmatic API & Access Keys</b><br/><br/>
      <a href="./screenshot/07-api-management.png">
        <img src="./screenshot/07-api-management.png" alt="API Key Management" width="100%" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />
      </a>
      <p><i>Generate revocable <code>od_live_</code> API keys and copy instant <code>curl</code> upload snippets.</i></p>
    </td>
    <td width="50%" align="center">
      <b>📜 Live Activity & Audit Log</b><br/><br/>
      <a href="./screenshot/06-activity-log.png">
        <img src="./screenshot/06-activity-log.png" alt="Activity Log" width="100%" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />
      </a>
      <p><i>Detailed chronological history of every upload, rename, deletion, and share event.</i></p>
    </td>
  </tr>
</table>

### 4. Recycle Bin & Seamless Authentication

<table>
  <tr>
    <td width="50%" align="center">
      <b>🗑️ Soft Deletion & Trash Bin</b><br/><br/>
      <a href="./screenshot/08-recycle-bin.png">
        <img src="./screenshot/08-recycle-bin.png" alt="Recycle Bin" width="100%" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />
      </a>
      <p><i>Accidental deletion safety net with instant one-click restoration and permanent purge.</i></p>
    </td>
    <td width="50%" align="center">
      <b>🔐 Login & Registration Portal</b><br/><br/>
      <a href="./screenshot/01-login-screen.png">
        <img src="./screenshot/01-login-screen.png" alt="Login Portal" width="100%" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" />
      </a>
      <p><i>1-Click Google Sign-In (auto-connects 1st Drive) + Email/Password with optional reCAPTCHA.</i></p>
    </td>
  </tr>
</table>

---

## 💡 The "Vibe Coder" Story: Why OpenDrive?

> *"As a developer and vibe coder, I believe our software should give us freedom, not bill us monthly for basic digital storage. Why pay for paid cloud subscriptions when you already own multiple Google accounts with 15GB each? I built OpenDrive to turn those scattered accounts into a single, high-performance, cloud-native storage gateway."*
> 
> — **Chinmay Prakash Rout** ([@ChinmayPrakashRout03](https://github.com/ChinmayPrakashRout03))

### The 4 Frustrations That Sparked This Project:
1. **The 15GB Paywall**: You quickly fill up one Google account with videos or backups, and Google aggressively nags you to subscribe to Google One.
2. **Account Switching Exhaustion**: You have 3 to 6 Google accounts (college, work, personal, gaming), but your files are scattered everywhere. You spend 10 minutes trying to remember *which* email holds *what* file.
3. **The VPS Disk Trap**: Traditional self-hosted solutions like Nextcloud write incoming uploads to the local hard drive before sending them elsewhere. A user uploading a 10GB video instantly crashes a 20GB VPS.
4. **Login Walls for Shared Files**: When you send a file to a friend, client, or teammate, they shouldn't be forced to sign into a Google account just to watch or download it.

OpenDrive solves all four simultaneously with **Zero Server Disk Overhead**, **Unlimited Account Pooling**, and **Universal Public Sharing**.

---

## 🏗️ Core Architecture & Zero-Disk Pipeline

OpenDrive separates **virtual metadata** from **physical binary storage**:
* **MySQL 8.4 + Prisma ORM**: Stores user identities, virtual folder trees, file permissions, and AES-256 encrypted OAuth credentials.
* **Google Drive API v3**: Serves as the raw, infinite physical object storage layer.
* **RAM Streaming Pipe**: Binary chunks flow from client to cloud through server memory buffers without ever touching the server's disk (`fs.writeFile` is never used for user files).

<div align="center">
  <a href="./opendrive-architecture.html">
    <img src="./opendrive-architecture.svg" alt="OpenDrive Complete Architecture Diagram" width="100%" style="border-radius: 16px; box-shadow: 0 12px 36px rgba(0,0,0,0.15);" />
  </a>
  <p><i>Interactive version with live animated nodes available in <b><a href="./opendrive-architecture.html">opendrive-architecture.html</a></b></i></p>
</div>

### The Lifecycle of an Upload:
1. **Frontend / API** sends a `multipart/form-data` request containing file binary streams and JSON metadata.
2. **Busboy Parser** intercepts the incoming stream chunk-by-chunk in memory.
3. **Upload Router** queries connected accounts, selects the best account based on active strategy (e.g., most available remaining bytes), and validates available space.
4. **PassThrough Stream** pipes the binary buffer directly into Google Drive API's `drive.files.create` endpoint inside the user's dedicated `OpenDrive` root folder.
5. **Database Transaction** records the file row in MySQL, linked to virtual folders and the physical Google Drive File ID.

---

## 📊 Comparison Matrix

| Feature | 🚀 OpenDrive | 📁 Nextcloud / ownCloud | ☁️ Google One | 🌐 Google Drive Web |
|---|:---:|:---:|:---:|:---:|
| **Cost** | **100% Free** | Free / Hosting Cost | $2 - $10 / month | 15 GB Free |
| **Combine Multiple Accounts** | **✅ Unlimited Accounts** | ❌ (Separate Mounts) | ❌ (Single Account) | ❌ (Manual Switching) |
| **Server Disk Required** | **0 GB (Memory Only)** | Full File Size (GBs) | N/A | N/A |
| **Works on $5 / Free VPS** | **✅ Yes (RAM Pipe)** | ❌ (Needs Large Disk) | N/A | N/A |
| **No-Login File Sharing** | **✅ Yes (Instant Link)** | ⚠️ Complex Config | ⚠️ Permissions Mess | ⚠️ Requires Google Sign-in |
| **Embedded 4K Video Player** | **✅ Built-in (Plyr.js)** | ⚠️ Basic Player | ⚠️ Truncated Viewer | ⚠️ Compression Artifacts |
| **Clean Dedicated Drive Folder** | **✅ Yes (`OpenDrive/`)** | ❌ Sprawls in Root | N/A | N/A |
| **Programmatic Upload API** | **✅ Yes (`od_live_` keys)** | ⚠️ WebDAV only | ❌ Complex GCP setup | ❌ No direct API |
| **1-Click CLI Setup Wizard** | **✅ Yes (`setup.sh`/`.ps1`)** | ❌ Complex Stack | N/A | N/A |

---

## ⚡ Quick Start & 1-Click Setup

Get OpenDrive running on your machine or server in under 2 minutes:

### Prerequisites
* **Node.js 20+** & **npm** (or **Docker**)
* **MySQL 8+** (or use the built-in Docker container)
* **Google Cloud OAuth Credentials** (Free Client ID & Secret with Google Drive API enabled — see [SETUP.md](./SETUP.md))

---

### Option A — 1-Click Interactive CLI Setup (Recommended)

Our setup wizard automatically prompts for your Google credentials, generates military-grade encryption keys, installs dependencies, migrates the database, and launches your browser:

```bash
# 1. Clone the repository
git clone https://github.com/ChinmayPrakashRout03/OpenDrive.git
cd OpenDrive

# 2. Run the interactive setup script
# On Linux / macOS:
chmod +x setup.sh && ./setup.sh

# On Windows (PowerShell or double-click start.bat):
.\setup.ps1
```

> **The setup wizard handles everything automatically:**
> * Prompts you for **Google Client ID** & **Client Secret**
> * Generates cryptographic 32-byte AES & JWT secrets
> * Automatically populates `backend/.env` & `frontend/.env`
> * Runs `npm install` and applies Prisma database migrations
> * Seeds your encrypted Google configuration into MySQL
> * Launches Backend & Frontend and opens **`http://localhost:5173`**!

---

### Option B — Turnkey Docker Deployment (Production & VPS)

For production deployment on any Linux VPS or home server using Docker Compose:

```bash
# 1. Clone the repository
git clone https://github.com/ChinmayPrakashRout03/OpenDrive.git
cd OpenDrive

# 2. Configure Docker environment
cp .env.docker.example .env
# Edit .env with your Google Client ID, Secret, and Database passwords

# 3. Build and launch all services (MySQL, Backend, Frontend)
docker compose up -d --build

# 4. Seed your encrypted Google configuration inside the backend container
docker compose exec backend npm run seed:google-config
```

Access your web dashboard at **`http://localhost:5173`** (or your server's public IP).

> 📘 Need a step-by-step walkthrough for Google Cloud Console setup? Check out the **[Complete Setup Guide (SETUP.md)](./SETUP.md)**.

---

## 🔌 Developer API & `curl` Uploads

OpenDrive includes a clean REST API so you can upload files directly from terminal scripts, automated backup cronjobs, or GitHub Actions using personal API keys.

### 1. Generate an API Key
Navigate to **Settings → API Keys** in your OpenDrive dashboard and click **Generate New API Key** to receive your `od_live_...` secret key.

### 2. Stream a File with `curl`

```bash
curl -X POST http://localhost:4000/api/v1/uploads \
  -H "Authorization: Bearer od_live_your_api_key_here" \
  -F "file=@/path/to/your/backup.zip" \
  -F "folderId=optional-virtual-folder-id"
```

### 3. Upload with Python

```python
import requests

url = "http://localhost:4000/api/v1/uploads"
headers = {"Authorization": "Bearer od_live_your_api_key_here"}
files = {"file": open("database-backup.tar.gz", "rb")}

response = requests.post(url, headers=headers, files=files)
print(response.json())
```

---

## 🛠️ Technology Stack

<div align="center">

| Area | Technologies |
|---|---|
| **Frontend UI** | **React 19**, **TypeScript**, **Vite 8**, **Tailwind CSS 4**, **React Router 7**, **Lucide Icons** |
| **Media Engine** | **Plyr.js** (Universal HTML5 4K/1080p Video & Audio streaming with range seeking) |
| **Backend API** | **Node.js 20+**, **Express 5**, **Prisma ORM 6**, **MySQL 8.4**, **Zod Validation** |
| **Streaming Engine** | **Busboy** (RAM streaming multipart parser), **Google APIs Client v3**, **Undici** |
| **Security & Auth** | **Argon2id**, **AES-256-GCM** (Token encryption), **JWT** (Stateless Bearer auth) |
| **DevOps** | **Docker**, **Docker Compose**, **Nginx** (Frontend static caching), **Multi-stage builds** |

</div>

---

## 🛡️ Security & Privacy

OpenDrive is engineered from the ground up for bank-grade data security:

* **🔐 AES-256-GCM Credential Encryption**: All Google OAuth refresh tokens and provider secrets are encrypted with authenticated AES-256-GCM before entering the MySQL database. Even if a raw database dump is leaked, your Google Drive accounts cannot be accessed without the server's master encryption key.
* **🛡️ Zero Local File Exposure**: Uploaded files pass purely through volatile memory buffers. Temporary files are never written to disk, eliminating risks of undeleted sensitive caches or local disk harvesting.
* **🔑 Argon2id Password Hashing**: Passwords are hashed using state-of-the-art Argon2id memory-hard algorithms resistant to GPU brute-forcing.
* **🌐 Sandboxed Drive Access**: OpenDrive only touches files within the dedicated `OpenDrive` directory on Google Drive, keeping your private spreadsheets, photos, and personal documents completely isolated.

---

## 📁 Repository Structure

```
OpenDrive/
├── assets/                 # Brand logo (red lightning) & aggregation infographics
├── backend/
│   ├── prisma/             # Database schema & migrations
│   ├── src/
│   │   ├── config/         # Environment & Prisma client instances
│   │   ├── middleware/     # Auth, error handling, rate limiting
│   │   ├── modules/        # Feature routers (auth, files, folders, quota, uploads)
│   │   ├── scripts/        # Database seeding & Google OAuth setup
│   │   └── utils/          # AES encryption, JWT signing, password hashing
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Drive UI components, modals, players, uploaders
│   │   ├── layouts/        # App shell, navigation sidebar, search header
│   │   ├── pages/          # Dashboard, Quota Tracker, Settings, Shared, API
│   │   └── lib/            # API client, auth session manager, Plyr loader
│   ├── public/             # Branding assets, icons, logo
│   └── package.json
├── screenshot/             # High-resolution retina screenshots & gallery index
├── opendrive-architecture.html # Interactive visual architectural blueprint
├── opendrive-architecture.svg  # Vector system architecture diagram
├── docker-compose.yml      # Multi-container orchestration (MySQL, Backend, Frontend)
├── setup.sh                # 1-Click interactive setup wizard for Linux / macOS
├── setup.ps1               # 1-Click interactive setup wizard for Windows
└── start.bat               # Windows double-click launcher
```

---

## 👨‍💻 Creator & Maintainer

<div align="center">

  <img src="https://github.com/ChinmayPrakashRout03.png" width="100" style="border-radius: 50%; box-shadow: 0 8px 24px rgba(239,68,68,0.35); margin-bottom: 12px;" />

  <h3><b>Chinmay Prakash Rout</b></h3>
  <p>Full-Stack Engineer & Vibe Coder</p>

  <p>
    <a href="https://github.com/ChinmayPrakashRout03">
      <img src="https://img.shields.io/badge/GitHub-ChinmayPrakashRout03-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile" />
    </a>
  </p>

  <p><i>"Aggregate your storage. Own your data. Stream direct to the cloud."</i></p>

</div>

---

## ⭐️ Show Your Support

If **OpenDrive** saves you money on cloud storage subscriptions or helps you build something cool, please consider giving this repository a **⭐️ Star** on GitHub! It helps more developers discover the project and keeps open-source free software alive.

<div align="center">
  <a href="https://github.com/ChinmayPrakashRout03/OpenDrive/stargazers">
    <img src="https://img.shields.io/badge/⭐️_Star_This_Repository-OpenDrive-EF4444?style=for-the-badge&logo=github&logoColor=white" alt="Star OpenDrive" />
  </a>
</div>

---

<div align="center">
  <sub>OpenDrive © 2026 Chinmay Prakash Rout. Released under the <a href="./LICENSE">MIT License</a>.</sub>
</div>
