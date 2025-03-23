export function initOCR() {
    const captureButton = document.getElementById("capture-btn");
    const selectWindowButton = document.getElementById("select-window-btn");
    
    captureButton?.setAttribute("disabled", "true");
    captureButton?.classList.add("opacity-50", "cursor-not-allowed");
    document.getElementById("select-region-btn")?.setAttribute("disabled", "true");
    document.getElementById("clear-region-btn")?.setAttribute("disabled", "true");
    document.getElementById("select-region-btn")?.classList.add("opacity-50", "cursor-not-allowed");
    document.getElementById("clear-region-btn")?.classList.add("opacity-50", "cursor-not-allowed");

    captureButton.addEventListener("click", captureFrame);
    selectWindowButton.addEventListener("click", startCapture);
    initOCRTextSizeSlider();
    initRegionSelection();
}

let selectedRegion = null;

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
  // Handle end of screen sharing
  stream.getVideoTracks()[0].addEventListener("ended", () => {
    video.srcObject = null;
  
    document.getElementById("capture-btn")?.setAttribute("disabled", "true");
    document.getElementById("select-region-btn")?.setAttribute("disabled", "true");
    document.getElementById("clear-region-btn")?.setAttribute("disabled", "true");
  
    document.getElementById("capture-btn")?.classList.add("opacity-50", "cursor-not-allowed");
    document.getElementById("select-region-btn")?.classList.add("opacity-50", "cursor-not-allowed");
    document.getElementById("clear-region-btn")?.classList.add("opacity-50", "cursor-not-allowed");
  });

  // Enable buttons after capture starts
  document.getElementById("capture-btn")?.removeAttribute("disabled");
  document.getElementById("select-region-btn")?.removeAttribute("disabled");
  document.getElementById("clear-region-btn")?.removeAttribute("disabled");
  document.getElementById("capture-btn")?.removeAttribute("disabled");
  document.getElementById("capture-btn")?.classList.remove("opacity-50", "cursor-not-allowed");

  document.getElementById("capture-btn")?.classList.remove("opacity-50", "cursor-not-allowed");
  document.getElementById("select-region-btn")?.classList.remove("opacity-50", "cursor-not-allowed");
  document.getElementById("clear-region-btn")?.classList.remove("opacity-50", "cursor-not-allowed");
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
  
  if (selectedRegion) {
    const sx = selectedRegion.x;
    const sy = selectedRegion.y;
    const sw = selectedRegion.width;
    const sh = selectedRegion.height;
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);
  } else {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  
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

/**
 * Initializes the region selection functionality for a video element.
 * 
 * This function sets up event listeners for selecting a region on a video element
 * by clicking and dragging the mouse. The selected region is represented by a 
 * dashed red overlay. The coordinates and dimensions of the selected region are 
 * calculated relative to the video element and stored in the `selectedRegion` variable.
 * 
 * The function also sets up a button to clear the selected region.
 * 
 * @function
 */
function initRegionSelection() {
  const video = document.getElementById("video");
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.border = "2px dashed red";
  overlay.style.pointerEvents = "none";
  overlay.style.display = "none";
  overlay.style.zIndex = "1000";
  document.body.appendChild(overlay);

  let startX, startY;

  document.getElementById("select-region-btn")?.addEventListener("click", () => {
    selectedRegion = null;
    overlay.style.display = "none";
    const rect = video.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;
    let selecting = false;

    function onMouseDown(e) {
      const clickX = e.pageX;
      const clickY = e.pageY;
      if (
        clickX < rect.left + scrollLeft || clickX > rect.right + scrollLeft ||
        clickY < rect.top + scrollTop || clickY > rect.bottom + scrollTop
      ) return;

      selecting = true;
      startX = clickX;
      startY = clickY;
      overlay.style.left = `${startX}px`;
      overlay.style.top = `${startY}px`;
      overlay.style.width = "0px";
      overlay.style.height = "0px";
      overlay.style.display = "block";
    }

    function onMouseMove(e) {
      if (!selecting) return;
      let currentX = Math.max(rect.left + scrollLeft, Math.min(e.pageX, rect.right + scrollLeft));
      let currentY = Math.max(rect.top + scrollTop, Math.min(e.pageY, rect.bottom + scrollTop));
      const x = Math.min(startX, currentX);
      const y = Math.min(startY, currentY);
      const width = Math.abs(currentX - startX);
      const height = Math.abs(currentY - startY);
      overlay.style.left = `${x}px`;
      overlay.style.top = `${y}px`;
      overlay.style.width = `${width}px`;
      overlay.style.height = `${height}px`;
    }

    function onMouseUp(e) {
      if (!selecting) return;
      selecting = false;

      const x = Math.min(startX, e.pageX);
      const y = Math.min(startY, e.pageY);
      const width = Math.abs(e.pageX - startX);
      const height = Math.abs(e.pageY - startY);

      const scaleX = video.videoWidth / rect.width;
      const scaleY = video.videoHeight / rect.height;

      selectedRegion = {
        x: (x - rect.left - scrollLeft) * scaleX,
        y: (y - rect.top - scrollTop) * scaleY,
        width: width * scaleX,
        height: height * scaleY
      };

      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  document.getElementById("clear-region-btn")?.addEventListener("click", () => {
    selectedRegion = null;
    overlay.style.display = "none";
  });
}
