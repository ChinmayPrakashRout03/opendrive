@echo off
title OpenDrive Launcher
cd /d "%~dp0"

echo =====================================================
echo    OpenDrive Launcher
echo =====================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup.ps1"
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Setup encountered an issue.
    pause
)
