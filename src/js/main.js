import { getSuwar } from "./getSuwar.js";
import { getReciter } from "./getReciter.js";
import { changeLang, selectLanguage } from "./translation.js";
import { getChannels } from "./getChannels.js";
// Get the Save Language from Local Storage and Set it
document.addEventListener("DOMContentLoaded", function () {
  const lang = localStorage.getItem("lang") || "en";
  // 1. Check if there is not lang will return without any action
  if (!lang) return;
  // 2. Calling changeLang function to reset the page to be suitable for any languge
  changeLang(lang);
  // 3. Fetching the Suwar depends on the saved language in local storage
  getSuwar(lang);
  // 4. Fetching the Reciter depends on the saved language in local storage
  getReciter(lang);
  // 5. Set the saved language as the selected language in selecte language element
  selectLanguage.value = lang;
  // 6. Get all suwar from the API
  getSuwar(lang);
  // 7. Get all  reciters from the API
  getReciter(lang);
  // 8. Get all radio channels
  getChannels(lang);
});
console.log();
const x = parseFloat(
  getComputedStyle(document.querySelector(".navbar")).height
);
const y = parseFloat(
  getComputedStyle(document.querySelector(".app__footer")).height
);

const z = x + y;

console.log(z);
document.querySelector(".app__body").style.height = `calc(100vh - ${z}px)`;
