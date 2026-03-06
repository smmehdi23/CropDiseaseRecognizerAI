#!/bin/bash

echo "============================================================"
echo "🌾 Crop Disease Recognizer - Flask Server"
echo "============================================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3 from https://www.python.org/"
    exit 1
fi

# Check Python version
echo "Python version:"
python3 --version
echo ""

# Install dependencies if needed
echo "Checking dependencies..."
if ! python3 -m pip show Flask &> /dev/null; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies"
        exit 1
    fi
fi

# Run the Flask app
echo ""
echo "Starting Flask server..."
echo ""
python3 app.py
