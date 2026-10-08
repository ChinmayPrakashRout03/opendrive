#Requires -Version 5.1
$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "   🚀 Welcome to OpenDrive Setup Wizard (Windows)" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "❌ Node.js 20+ is required. Please install Node.js from https://nodejs.org"
    exit 1
}

$nodeMajor = [int]((node --version).TrimStart("v").Split(".")[0])
if ($nodeMajor -lt 20) {
    Write-Error "❌ Node.js 20+ is required. Found $(node --version)."
    exit 1
}

function New-RandomHexKey {
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $rng.GetBytes($bytes)
    } finally {
        $rng.Dispose()
    }
    return ([BitConverter]::ToString($bytes) -replace "-", "").ToLowerInvariant()
}

$backendDir = Join-Path $PSScriptRoot "backend"
$frontendDir = Join-Path $PSScriptRoot "frontend"
$backendEnv = Join-Path $backendDir ".env"
$frontendEnv = Join-Path $frontendDir ".env"

$configureBackend = $true
if (Test-Path -LiteralPath $backendEnv) {
    Write-Host "ℹ️  Existing backend/.env detected." -ForegroundColor Green
    $keepEnv = Read-Host "Do you want to keep existing backend/.env? (Y/n)"
    if ([string]::IsNullOrWhiteSpace($keepEnv) -or $keepEnv -eq "Y" -or $keepEnv -eq "y") {
        $configureBackend = $false
    }
}

if ($configureBackend) {
    Write-Host ""
    Write-Host "Let's configure your credentials in 2 quick steps:" -ForegroundColor White
    Write-Host ""

    Write-Host "Step 1: Google OAuth Credentials" -ForegroundColor Cyan
    Write-Host "(Create these at https://console.cloud.google.com -> APIs & Services -> Credentials)" -ForegroundColor Gray
    
    $googleClientId = ""
    while ([string]::IsNullOrWhiteSpace($googleClientId)) {
        $googleClientId = Read-Host "🔑 Enter Google Client ID"
    }

    $googleClientSecret = ""
    while ([string]::IsNullOrWhiteSpace($googleClientSecret)) {
        $googleClientSecret = Read-Host "🔒 Enter Google Client Secret"
    }

    Write-Host ""
    Write-Host "Step 2: MySQL Database URL" -ForegroundColor Cyan
    $databaseUrl = Read-Host "🗄️  Enter MySQL DATABASE_URL [Default: mysql://root@localhost:3306/opendrive]"
    if ([string]::IsNullOrWhiteSpace($databaseUrl)) {
        $databaseUrl = "mysql://root@localhost:3306/opendrive"
    }

    Write-Host ""
    Write-Host "⏳ Generating security encryption keys and writing backend/.env..." -ForegroundColor Gray

    $jwtSecret = New-RandomHexKey
    $tokenKey = (New-RandomHexKey).Substring(0, 32)

    @(
        "DATABASE_URL=`"$databaseUrl`""
        "APP_PORT=4000"
        "FRONTEND_URL=`"http://localhost:5173`""
        "JWT_ACCESS_SECRET=`"$jwtSecret`""
        "TOKEN_ENCRYPTION_KEY=`"$tokenKey`""
        "ACCESS_TOKEN_TTL_SECONDS=900"
        "REFRESH_TOKEN_TTL_DAYS=30"
        "MAX_UPLOAD_BYTES=5368709120"
        "RECAPTCHA_SECRET_KEY=`"`""
        "GOOGLE_CLIENT_ID=`"$googleClientId`""
        "GOOGLE_CLIENT_SECRET=`"$googleClientSecret`""
        "GOOGLE_REDIRECT_URI=`"http://localhost:4000/connected-accounts/google/callback`""
    ) | Set-Content -LiteralPath $backendEnv -Encoding UTF8

    Write-Host "✅ backend/.env configured successfully." -ForegroundColor Green
}

if (-not (Test-Path -LiteralPath $frontendEnv)) {
    @(
        "VITE_API_URL=http://localhost:4000"
        "VITE_RECAPTCHA_SITE_KEY="
    ) | Set-Content -LiteralPath $frontendEnv -Encoding UTF8
    Write-Host "✅ frontend/.env configured successfully." -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Installing backend dependencies & generating Prisma client..." -ForegroundColor Cyan
Push-Location $backendDir
try {
    npm install
    npm run prisma:generate
    Write-Host "🗄️  Setting up database tables..." -ForegroundColor Cyan
    try { npx prisma migrate deploy } catch { npx prisma db push }
    Write-Host "🔑 Seeding Google OAuth configuration into database..." -ForegroundColor Cyan
    try { npm run seed:google-config } catch {}
} finally {
    Pop-Location
}

Write-Host ""
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
Push-Location $frontendDir
try {
    npm install
} finally {
    Pop-Location
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "   🎉 OpenDrive setup complete!" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting Backend and Frontend..." -ForegroundColor White
Write-Host "   🌐 Web App URL: http://localhost:5173" -ForegroundColor Cyan
Write-Host "   🔌 Backend API: http://localhost:4000" -ForegroundColor Cyan
Write-Host ""

# Launch browser
Start-Process "http://localhost:5173"

# Start servers in separate windows or concurrent jobs
Start-Process "cmd.exe" -ArgumentList "/c title OpenDrive Backend && cd /d `"$backendDir`" && npm run dev"
Start-Process "cmd.exe" -ArgumentList "/c title OpenDrive Frontend && cd /d `"$frontendDir`" && npm run dev"

Write-Host "👉 OpenDrive is running in background terminal windows!" -ForegroundColor Green
Write-Host "Press Enter to exit this setup installer..."
Read-Host
