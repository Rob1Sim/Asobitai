import { initOCR } from './ocr.js';
import { initGamepad } from './gamepad.js';
import { initKeyboardShortcut } from './keyboard.js';
import { loadSettingsFromCookie } from './cookie.js';

window.addEventListener('DOMContentLoaded', () => {
  initOCR();
  initGamepad();
  loadSettingsFromCookie();
  initKeyboardShortcut();


});