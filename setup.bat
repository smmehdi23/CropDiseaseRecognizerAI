@echo off
REM Crop Disease Recognizer AI - Complete Setup Script
REM This script sets up both backend and frontend

color 0A
cls

echo.
echo ============================================================
echo  Crop Disease Recognizer AI - Setup
echo ============================================================
echo.

REM Check if Python is installed
echo [1/4] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)
python --version
echo [✓] Python found
echo.

REM Setup Frontend
echo [2/4] Setting up Frontend...
cd Frontend
echo Installing Frontend dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo [✓] Frontend dependencies installed
cd ..
echo.

REM Check if models exist
echo [3/4] Checking for trained models...
if exist "backend\wheat_disease_model.keras" (
    echo [✓] Models found
) else (
    echo [⚠] No trained models found
    echo.
    echo To train models, run:
    echo   cd backend
    echo   python train_models.py
    echo.
)
echo.

REM Ready to run
echo [4/4] Setup complete!
echo.
echo ============================================================
echo  Next Steps
echo ============================================================
echo.
echo Option A: Run the application
echo   1. cd Frontend
echo   2. python app.py
echo   3. Open http://localhost:5000 in your browser
echo.
echo Option B: Train models first (optional)
echo   1. cd backend
echo   2. python train_models.py
echo   3. Then follow Option A
echo.
echo ============================================================
echo.
pause

exit /b 0
