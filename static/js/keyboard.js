import { captureFrame } from './ocr.js';

export function initKeyboardShortcut() {
  window.addEventListener('keydown', (e) => {
    const input = document.getElementById('shortcut-input');
    const shortcut = input?.value?.trim().toLowerCase() || 'ctrl+shift+k';

    const isCtrl = shortcut.includes('ctrl');
    const isShift = shortcut.includes('shift');
    const isAlt = shortcut.includes('alt');

    const key = shortcut
      .replace('ctrl', '')
      .replace('shift', '')
      .replace('alt', '')
      .replace(/\++/g, '')
      .trim();

    if (
      (isCtrl ? e.ctrlKey : true) &&
      (isShift ? e.shiftKey : true) &&
      (isAlt ? e.altKey : true) &&
      e.key.toLowerCase() === key
    ) {
      e.preventDefault();
      captureFrame();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('shortcut-input');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    e.preventDefault();
    const parts = [];
    if (e.ctrlKey) parts.push('ctrl');
    if (e.shiftKey) parts.push('shift');
    if (e.altKey) parts.push('alt');

    const key = e.key.toLowerCase();
    if (!['control', 'shift', 'alt'].includes(key)) {
      parts.push(key);
    }

    input.value = parts.join('+');
  });
});
