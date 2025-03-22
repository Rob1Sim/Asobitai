import { initOCR } from './ocr.js';
import { initGamepad } from './gamepad.js';

window.addEventListener('DOMContentLoaded', () => {
  initOCR();
  initGamepad();
});