// main.js or index.js
import { changeLang, selectLanguage } from "./translation.js";

// Get the Save Language from Local Storage and Set it
document.addEventListener("DOMContentLoaded", function () {
  const lang = localStorage.getItem("lang") || "en";
  // 1. Check if there is not lang will return without any action
  if (!lang) return;
  // 2. Calling changeLang function to reset the page to be suitable for any language
  changeLang(lang);
  // 3. Set the saved language as the selected language
  selectLanguage.value = lang;
});
