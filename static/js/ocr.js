export function initOCR() {
    const captureButton = document.getElementById("capture-btn");
    const selectWindowButton = document.getElementById("select-window-btn");
    
    captureButton.addEventListener("click", captureFrame);
    selectWindowButton.addEventListener("click", startCapture);
    initOCRTextSizeSlider();
}

/**
 * Starts capturing the display media and sets the video source to the captured stream.
 * 
 * This function uses the `navigator.mediaDevices.getDisplayMedia` API to capture the display media (screen, window, or tab).
 * The captured media stream is then assigned to the `srcObject` of the video element with the ID "video".
 * 
 * @async
 * @function startCapture
 * @returns {Promise<void>} A promise that resolves when the display media has been successfully captured and assigned to the video element.
 * @throws {DOMException} If the user denies permission to capture the display media or if there is an error in capturing the media.
 */
async function startCapture() {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const video = document.getElementById("video");
  video.srcObject = stream;
}

/**
 * Captures a frame from a video element, converts it to a PNG image, 
 * sends it to the server for OCR processing, and displays the mined text.
 * 
 * @async
 * @function captureFrame
 * @returns {Promise<void>} A promise that resolves when the frame capture and OCR processing is complete.
 */
export async function captureFrame() {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/png");

  const formData = new FormData();
  formData.append("image", dataURLtoBlob(dataUrl), "capture.png");

  const response = await fetch("/ocr", {
    method: "POST",
    body: formData
  });

  const text = await response.text();
  dispalyMinedText(text);
}

/**
 * Displays the mined text inside an HTML element with the ID 'ocr-result'.
 * The text is wrapped in a <main> element with a 'lang' attribute set to 'ja'.
 *
 * @param {string} text - The text to be displayed.
 */
function dispalyMinedText(text) {
  const wrapper = document.getElementById('ocr-result');
  wrapper.innerHTML = ''; 
  const div = document.createElement('main');
  div.setAttribute('lang', 'ja');
  div.innerHTML = text;
    wrapper.appendChild(div);
}

/**
 * Converts a data URL to a Blob object.
 *
 * @param {string} dataurl - The data URL to convert.
 * @returns {Blob} - The resulting Blob object.
 */
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], {type:mime});
}

function initOCRTextSizeSlider() {
  const slider = document.getElementById("ocr-text-size");
  const result = document.getElementById("ocr-result");
  if (!slider || !result) return;

  slider.addEventListener("input", () => {
    result.style.fontSize = `${slider.value}px`;
  });

  // Set initial font size
  result.style.fontSize = `${slider.value}px`;
}
