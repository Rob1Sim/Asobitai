@echo off
echo === 🛠️ Installing and launching Asobitai ===

echo [+] Creating virtual environment...
python -m venv venv

call venv\Scripts\activate

echo [+] Upgrading pip...
python -m pip install --upgrade pip

echo [+] Installing dependencies...
pip install -r requirements.txt

echo [+] Starting the app...
start "" python app.py

echo [+] Opening the browser...
start http://localhost:5000
