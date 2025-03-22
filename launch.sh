#!/bin/bash
echo "=== 🛠️ Installing and launching Asobitai ==="

# Create virtual environment
echo "[+] Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
echo "[+] Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "[+] Installing dependencies..."
pip install -r requirements.txt

# Start the Flask app in background
echo "[+] Starting the app in the background..."
python app.py &

# Wait a moment for the server to start
sleep 10

# Open browser depending on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "[+] Opening in browser (macOS)..."
    open http://localhost:5000
else
    echo "[+] Opening in browser (Linux)..."
    xdg-open http://localhost:5000
fi