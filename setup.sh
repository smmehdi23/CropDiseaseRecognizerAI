#!/bin/bash

# Crop Disease Recognizer AI - Complete Setup Script (Linux/Mac)

echo ""
echo "============================================================"
echo "  Crop Disease Recognizer AI - Setup"
echo "============================================================"
echo ""

# Check if Python is installed
echo "[1/4] Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org/"
    exit 1
fi
python3 --version
echo "[✓] Python found"
echo ""

# Setup Frontend
echo "[2/4] Setting up Frontend..."
cd Frontend
echo "Installing Frontend dependencies..."
pip3 install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo "[✓] Frontend dependencies installed"
cd ..
echo ""

# Check if models exist
echo "[3/4] Checking for trained models..."
if [ -f "backend/wheat_disease_model.keras" ]; then
    echo "[✓] Models found"
else
    echo "[⚠] No trained models found"
    echo ""
    echo "To train models, run:"
    echo "  cd backend"
    echo "  python3 train_models.py"
    echo ""
fi
echo ""

# Ready to run
echo "[4/4] Setup complete!"
echo ""
echo "============================================================"
echo "  Next Steps"
echo "============================================================"
echo ""
echo "Option A: Run the application"
echo "  1. cd Frontend"
echo "  2. python3 app.py"
echo "  3. Open http://localhost:5000 in your browser"
echo ""
echo "Option B: Train models first (optional)"
echo "  1. cd backend"
echo "  2. python3 train_models.py"
echo "  3. Then follow Option A"
echo ""
echo "============================================================"
echo ""
