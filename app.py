from flask import Flask, render_template, request
from paddleocr import PaddleOCR
from PIL import Image
from io import BytesIO
import numpy as np

app = Flask(__name__)
ocr = PaddleOCR(use_angle_cls=True, lang='japan', use_gpu=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ocr', methods=['POST'])
def ocr_image():
    file = request.files['image']

    img_bytes = file.read()
    image = Image.open(BytesIO(img_bytes)).convert("RGB")

    result = ocr.ocr(np.array(image), cls=True)
    boxes_with_text = []
    for line in result:
        for box, (text, conf) in line:
            x_avg = sum(p[0] for p in box) / 4
            y_avg = sum(p[1] for p in box) / 4
            boxes_with_text.append((y_avg, x_avg, text))

    boxes_with_text.sort()
    lines = [text for _, _, text in boxes_with_text]
    return "\n".join(lines)

if __name__ == "__main__":
    app.run(debug=True)
