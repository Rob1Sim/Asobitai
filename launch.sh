#!/bin/bash
echo "=== 🛠️ Installing and launching Asobitai ==="

echo "[+] Creating virtual environment..."
python3 -m venv venv

source venv/bin/activate

echo "[+] Upgrading pip..."
pip install --upgrade pip

echo "[+] Installing dependencies..."
pip install -r requirements.txt

echo "[+] Starting the app..."
python app.py