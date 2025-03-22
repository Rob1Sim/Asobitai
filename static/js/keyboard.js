import { captureFrame } from './ocr.js';

export function initKeyboardShortcut() {
  window.addEventListener('keydown', (e) => {
    // Ctrl + Shift + K
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      captureFrame();
    }
  });
}
