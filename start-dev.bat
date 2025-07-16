@echo off
chcp 65001 >nul
echo ========================================
echo AI Psychology Platform Development Server
echo ========================================
echo.

echo Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd backend
if not exist node_modules (
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install backend dependencies
        pause
        exit /b 1
    )
)

echo.
echo Installing frontend dependencies...
cd ..\frontend
if not exist node_modules (
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

cd ..

echo.
echo Checking environment configuration...
if not exist backend\.env (
    echo Environment file already exists at backend\.env
) else (
    echo Environment file found at backend\.env
)

echo.
echo Starting development servers...
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.

start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Development servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to stop all servers...
pause >nul

echo Stopping servers...
taskkill /f /im node.exe 2>nul
echo Servers stopped.
pause