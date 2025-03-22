import { initOCR } from './ocr.js';
import { initGamepad } from './gamepad.js';
import { initKeyboardShortcut } from './keyboard.js';

window.addEventListener('DOMContentLoaded', () => {
  initOCR();
  initGamepad();
  initKeyboardShortcut();
});