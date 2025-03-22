import { captureFrame } from './ocr.js';

export function initGamepad() {
  window.addEventListener("gamepadconnected", (e) => {
    console.log("🎮 Gamepad connected:", e.gamepad.id);
    pollGamepad(e.gamepad.index);
  });
}

/**
 * Continuously polls the specified gamepad for button presses and captures a frame if the first button is pressed.
 *
 * @param {number} index - The index of the gamepad to poll.
 */
function pollGamepad(index) {
  const gamepad = navigator.getGamepads()[index];
  if (gamepad && gamepad.buttons[0].pressed) {
    captureFrame();
  }
  requestAnimationFrame(() => pollGamepad(index));
}
