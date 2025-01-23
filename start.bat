@echo off
:: Navigate to the backend folder and start the server
cd bug-tracker-backend
echo Starting Backend...
start cmd /k "npm start"

:: Navigate to the frontend folder and start the React app
cd ../bug-tracker-frontend
echo Starting Frontend...
start cmd /k "npm start"

:: Go back to the root directory
cd ..
echo Both backend and frontend are starting...
