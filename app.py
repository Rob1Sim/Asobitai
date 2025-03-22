from flask import Flask, render_template, request
from paddleocr import PaddleOCR
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
ocr = PaddleOCR(use_angle_cls=True, lang='japan', use_gpu=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ocr', methods=['POST'])
def ocr_image():
    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join('static', filename)
    file.save(filepath)

    result = ocr.ocr(filepath, cls=True)
    lines = []
    for line in result:
        for box, (text, conf) in line:
            lines.append(text)
    return "\n".join(lines)

if __name__ == "__main__":
    app.run(debug=True)
