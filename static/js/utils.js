import { saveSettingsToCookie } from "./cookie.js";

/**
 * Copies the provided text to the clipboard and optionally updates the button text to indicate success.
 *
 * @param {string} text - The text to be copied to the clipboard.
 * @param {HTMLElement} [button] - The button element whose text content will be temporarily changed to "Copied!" upon success.
 * @returns {void}
 */
export function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      if (button) {
        const original = button.textContent;
        button.textContent = "Copied!";
        setTimeout(() => {
          button.textContent = original;
        }, 1000);
      }
    }).catch(err => {
      console.error("Copy failed:", err);
    });
  }

/**
* Adds the given text to the history.
* 
* @param {string} text - The text to be added to history.
*/
export function addToHistory(text) {
 const history = document.getElementById('ocr-history');
 const historyItem = document.createElement('div');
 historyItem.className = "bg-gray-100 dark:bg-gray-700 text-sm p-2 rounded shadow-inner relative flex justify-between items-start gap-2";

 const textBlock = document.createElement('div');
 textBlock.className = "flex-1 whitespace-pre-wrap break-words";
 textBlock.textContent = text;

 const btnGroup = document.createElement('div');
 btnGroup.className = "flex flex-col gap-1";

 const copyBtn = document.createElement('button');
 const copyIcon = document.createElement('span');
 copyIcon.className = "material-symbols-outlined";
 copyIcon.textContent = "content_copy";
 copyBtn.appendChild(copyIcon);
 copyBtn.className = "text-xs text-white bg-green-500 hover:bg-green-600 rounded px-2 py-1";
 copyBtn.addEventListener('click', () => copyToClipboard(text,null));

 const deleteBtn = document.createElement('button');
 const trashIcon = document.createElement('span');
 trashIcon.className = "material-symbols-outlined";
 trashIcon.textContent = "delete";
 deleteBtn.appendChild(trashIcon);
 deleteBtn.className = "text-xs text-white bg-red-500 hover:bg-red-600 rounded px-2 py-1 ";
 deleteBtn.addEventListener('click', () =>{
    historyItem.remove();
    saveSettingsToCookie();
 });

 btnGroup.appendChild(copyBtn);
 btnGroup.appendChild(deleteBtn);

 historyItem.appendChild(textBlock);
 historyItem.appendChild(btnGroup);

 history?.prepend(historyItem);
}