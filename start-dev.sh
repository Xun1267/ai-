#!/bin/bash

# AI Psychology Platform Development Server
echo "========================================"
echo "AI Psychology Platform Development Server"
echo "========================================"
echo

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    exit 1
fi
node --version

# Install backend dependencies
echo
echo "Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install backend dependencies"
        exit 1
    fi
fi

# Install frontend dependencies
echo
echo "Installing frontend dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install frontend dependencies"
        exit 1
    fi
fi

cd ..

# Check environment configuration
echo
echo "Checking environment configuration..."
if [ ! -f "backend/.env" ]; then
    echo "Warning: Environment file not found at backend/.env"
    echo "Please copy backend/.env.example to backend/.env and configure it"
else
    echo "Environment file found at backend/.env"
fi

echo
echo "Starting development servers..."
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo

# Start backend server in background
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server in background
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo
echo "========================================"
echo "Development servers are running..."
echo "Backend: http://localhost:5000 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:3000 (PID: $FRONTEND_PID)"
echo "========================================"
echo
echo "Press Ctrl+C to stop all servers..."

# Wait for user interrupt
trap 'echo "\nStopping servers..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo "Servers stopped."; exit 0' INT

# Keep script running
while true; do
    sleep 1
done