#!/usr/bin/env bash
set -e

# Terminal colors
BOLD='\033[1m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RESET='\033[0m'

echo ""
echo -e "${CYAN}${BOLD}====================================================="
echo "   🚀 Welcome to OpenDrive Setup Wizard"
echo "=====================================================${RESET}"
echo ""

# 1. Check Node.js
if ! command -v node >/dev/null 2>&1; then
  echo -e "${YELLOW}❌ Node.js 20+ is required. Please install Node.js from https://nodejs.org${RESET}" >&2
  exit 1
fi

node_major=$(node --version | sed 's/^v//' | cut -d. -f1)
if [ "$node_major" -lt 20 ]; then
  echo -e "${YELLOW}❌ Node.js 20+ is required. Found $(node --version).${RESET}" >&2
  exit 1
fi

script_dir=$(cd -- "$(dirname -- "$0")" && pwd)
backend_dir="$script_dir/backend"
frontend_dir="$script_dir/frontend"

# Helper to generate random 32-byte hex/string
random_key() {
  node -e "process.stdout.write(require('crypto').randomBytes(32).toString('hex'))"
}

# 2. Check or create backend/.env
configure_backend=true
if [ -f "$backend_dir/.env" ]; then
  echo -e "${GREEN}ℹ️  Existing backend/.env detected.${RESET}"
  read -p "Do you want to keep existing backend/.env? (Y/n): " keep_env
  keep_env=${keep_env:-Y}
  if [ "$keep_env" = "Y" ] || [ "$keep_env" = "y" ]; then
    configure_backend=false
  fi
fi

if [ "$configure_backend" = true ]; then
  echo ""
  echo -e "${BOLD}Let's configure your credentials in 2 quick steps:${RESET}\n"

  echo -e "${CYAN}Step 1: Google OAuth Credentials${RESET}"
  echo -e "(Create these at https://console.cloud.google.com → APIs & Services → Credentials)"
  read -p "🔑 Enter Google Client ID: " google_client_id
  while [ -z "$google_client_id" ]; do
    echo -e "${YELLOW}Google Client ID cannot be empty.${RESET}"
    read -p "🔑 Enter Google Client ID: " google_client_id
  done

  read -p "🔒 Enter Google Client Secret: " google_client_secret
  while [ -z "$google_client_secret" ]; do
    echo -e "${YELLOW}Google Client Secret cannot be empty.${RESET}"
    read -p "🔒 Enter Google Client Secret: " google_client_secret
  done

  echo ""
  echo -e "${CYAN}Step 2: MySQL Database URL${RESET}"
  read -p "🗄️  Enter MySQL DATABASE_URL [Default: mysql://root@localhost:3306/opendrive]: " database_url
  database_url=${database_url:-mysql://root@localhost:3306/opendrive}

  echo ""
  echo -e "⏳ Generating security encryption keys and writing backend/.env..."

  jwt_secret=$(random_key)
  token_key=$(random_key | cut -c1-32)

  cat > "$backend_dir/.env" <<EOF
DATABASE_URL="$database_url"
APP_PORT=4000
FRONTEND_URL="http://localhost:5173"
JWT_ACCESS_SECRET="$jwt_secret"
TOKEN_ENCRYPTION_KEY="$token_key"
ACCESS_TOKEN_TTL_SECONDS=900
REFRESH_TOKEN_TTL_DAYS=30
MAX_UPLOAD_BYTES=5368709120
RECAPTCHA_SECRET_KEY=""
GOOGLE_CLIENT_ID="$google_client_id"
GOOGLE_CLIENT_SECRET="$google_client_secret"
GOOGLE_REDIRECT_URI="http://localhost:4000/connected-accounts/google/callback"
EOF

  echo -e "${GREEN}✅ backend/.env configured successfully.${RESET}"
fi

# 3. Check or create frontend/.env
if [ ! -f "$frontend_dir/.env" ]; then
  cat > "$frontend_dir/.env" <<EOF
VITE_API_URL=http://localhost:4000
VITE_RECAPTCHA_SITE_KEY=
EOF
  echo -e "${GREEN}✅ frontend/.env configured successfully.${RESET}"
fi

# 4. Install backend dependencies & setup database
echo ""
echo -e "${CYAN}📦 Installing backend dependencies & generating Prisma client...${RESET}"
(cd "$backend_dir" && npm install)
(cd "$backend_dir" && npm run prisma:generate)

echo -e "${CYAN}🗄️  Setting up database tables...${RESET}"
(cd "$backend_dir" && (npx prisma migrate deploy || npx prisma db push))

# Seed Google config into DB if credentials are present
echo -e "${CYAN}🔑 Seeding Google OAuth configuration into database...${RESET}"
(cd "$backend_dir" && (npm run seed:google-config || true))

# 5. Install frontend dependencies
echo ""
echo -e "${CYAN}📦 Installing frontend dependencies...${RESET}"
(cd "$frontend_dir" && npm install)

# 6. Success message & Auto-Launch
echo ""
echo -e "${GREEN}${BOLD}====================================================="
echo "   🎉 OpenDrive setup complete!"
echo "=====================================================${RESET}"
echo ""
echo -e "🚀 Starting Backend and Frontend..."
echo -e "   🌐 Web App URL: ${CYAN}${BOLD}http://localhost:5173${RESET}"
echo -e "   🔌 Backend API: ${CYAN}http://localhost:4000${RESET}"
echo ""

# Function to open URL in default browser
open_url() {
  if command -v open >/dev/null 2>&1; then
    open "http://localhost:5173"
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:5173" >/dev/null 2>&1 || true
  fi
}

# Trap to kill background processes on exit (Ctrl+C)
cleanup() {
  echo ""
  echo -e "${YELLOW}Stopping OpenDrive servers...${RESET}"
  kill 0 2>/dev/null || true
  exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# Start backend in background
(cd "$backend_dir" && npm run dev) &
BACKEND_PID=$!

# Start frontend in background
(cd "$frontend_dir" && npm run dev) &
FRONTEND_PID=$!

# Wait 2 seconds and open browser
(sleep 2 && open_url) &

echo -e "${GREEN}👉 OpenDrive is running! Press Ctrl+C in this terminal to stop.${RESET}\n"
wait
