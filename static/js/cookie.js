const COOKIE_NAME = "asobitai-settings";

/**
 * Save UI settings and history into a cookie.
 */
export function saveSettingsToCookie() {
  const fontSize = document.getElementById("ocr-text-size")?.value;
  const shortcut = document.getElementById("shortcut-input")?.value;
  const gamepad = document.getElementById("gamepad-button")?.value;

  const historyItems = Array.from(document.querySelectorAll("#ocr-history > div"));
  const historyTexts = historyItems.slice(0, 10).map(div => div.querySelector("div")?.textContent.trim());

  const data = {
    fontSize,
    shortcut,
    gamepad,
    history: historyTexts
  };

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(data))};path=/;max-age=31536000`;
}

/**
 * Restore settings from cookie and apply them to the UI.
 */
export function loadSettingsFromCookie() {
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return;

  try {
    const data = JSON.parse(decodeURIComponent(match[1]));

    if (data.fontSize && document.getElementById("ocr-text-size")) {
      document.getElementById("ocr-text-size").value = data.fontSize;
      document.getElementById("ocr-result").style.fontSize = `${data.fontSize}px`;
    }

    if (data.shortcut && document.getElementById("shortcut-input")) {
      document.getElementById("shortcut-input").value = data.shortcut;
    }

    if (data.gamepad && document.getElementById("gamepad-button")) {
      document.getElementById("gamepad-button").value = data.gamepad;
    }

    if (Array.isArray(data.history)) {
      import("./utils.js").then(({ addToHistory }) => {
        data.history.forEach(text => {
          if (text) addToHistory(text);
        });
      });
    }
  } catch (e) {
    console.error("Failed to load settings from cookie", e);
  }
}