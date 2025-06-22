# 🎮 Asobitai — Japanese Game OCR WebApp (GPU-Powered & Local)

**Asobitai** is a fast, local-first OCR web application designed for extracting Japanese text from video game screens in real-time.  
Powered by [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) and your GPU, no cloud services are needed.

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-green)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux-lightgrey)
![OCR](https://img.shields.io/badge/OCR-PaddleOCR-orange)

---

## ✨ Features

- 🖥️ 100% local processing — no internet required
- ⚡ GPU-accelerated OCR using PaddleOCR
- 🇯🇵 Japanese text recognition (horizontal & vertical)
- 🖼️ Real-time screen capture from your browser
- 💬 Designed for reading text in Japanese games (e.g. RPG dialogue)

---

## 🚀 Getting Started

### 📦 Requirements

- Python 3.8+
- `pip`
- Google Chrome or Edge (for screen capture via `getDisplayMedia`)
- An NVIDIA GPU with CUDA (optional but recommended)

### 📥 Installation

```bash
pip install -r requirements.txt
```

> ⚠ Make sure the version of `paddlepaddle-gpu` matches your CUDA version!

---

## ⚙️ Installing CUDA & cuDNN (Windows)

### 1. CUDA Toolkit (Recommended: 11.2)
👉 [CUDA 11.2 Download](https://developer.nvidia.com/cuda-11.2.2-download-archive)

### 2. cuDNN for CUDA 11.2
👉 [cuDNN v8.1 Download](https://developer.nvidia.com/rdp/cudnn-archive)

- Extract the files and copy `bin/`, `include/`, and `lib/` into:
  ```
  C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.2\
  ```
- Add the path to your system environment variables (`PATH`).

### 3. Test CUDA Support

```python
import paddle
paddle.utils.run_check()
```

---

## ▶️ Running the App

```bash
python app.py
```

Then go to:

```
http://localhost:5000
```

1. Allow screen capture when prompted  
2. Click “Capture and Analyze” to perform OCR on the frame

---

## 🧪 CPU Mode (Fallback)

The application now automatically checks if CUDA is available. If not, it
falls back to CPU mode so no changes are needed:

```python
use_gpu = paddle.device.is_compiled_with_cuda()
ocr = PaddleOCR(use_angle_cls=True, lang='japan', use_gpu=use_gpu)
```

---

## 📁 Project Structure

```
asobitai/
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
```

---

## 💡 Ideas to Extend Asobitai

- 🔄 Translate text via DeepL or Google Translate API
- 🖍️ Show bounding boxes on OCR’d text
- 💾 Auto-save recognized lines or dialogues
- 🧠 Detect and segment dialogue boxes
- 🧩 Connect with Migaku or Yomichan for word lookup

---

## 🤝 Contributing

Pull requests welcome!  
You can fork this project, suggest features, or report issues in the GitHub Issues tab.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.
