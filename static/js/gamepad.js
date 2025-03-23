import { captureFrame } from './ocr.js';
import { saveSettingsToCookie } from './cookie.js';

export function initGamepad() {
  window.addEventListener("gamepadconnected", (e) => {
    console.log("🎮 Gamepad connected:", e.gamepad.id);
    pollGamepad(e.gamepad.index);
    saveSettingsToCookie();
  });
}

/**
 * Continuously polls the specified gamepad for button presses and captures a frame if the selected button is pressed.
 *
 * @param {number} index - The index of the gamepad to poll.
 */
function pollGamepad(index) {
  const gamepad = navigator.getGamepads()[index];
  const select = document.getElementById("gamepad-button");
  const selected = select?.value || "A";

  const buttonMap = {
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    L1: 4,
    R1: 5,
    Select: 8,
    Start: 9
  };

  const buttonIndex = buttonMap[selected] ?? 0;

  if (gamepad && gamepad.buttons[buttonIndex]?.pressed) {
    captureFrame();
  }

  requestAnimationFrame(() => pollGamepad(index));
}
