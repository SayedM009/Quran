import { getSuwar } from "./getSuwar.js";
import { getReciter } from "./getReciter.js";
import { getChannels } from "./getChannels.js";

const selectLanguage = document.querySelector(".changeLang");
const logo = document.querySelector(".navbar-brand");

const translations = {
  en: {
    fontFamily: "Poppins",
    dir: "ltr",
    title: "Quran",
    logo: "Quran",
    reciters: "Reciters",
    radio: "Radio",
    user: "User",
    settings: "Settings",
    suwar: "Suwar",
    channel: "Channel",
  },

  ar: {
    fontFamily: "Tajawal",
    dir: "rtl",
    title: "قران كريم",
    logo: "قران كريم",
    reciters: "القراء",
    radio: "راديو",
    user: "مستخدم",
    settings: "الإعدادات",
    suwar: "السور",
    channel: "المحطة",
  },
};

// Swtich the Language Event
selectLanguage.addEventListener("change", () =>
  changeLang(selectLanguage.value)
);

// Change Lanuage Function
function changeLang(lang) {
  document.documentElement.style.setProperty(
    "--direction",
    translations[lang]?.dir
  );
  document.body.style.fontFamily = translations[lang].fontFamily;
  document.body.dir = translations[lang].dir;
  document.title = translations[lang].title;
  logo.textContent = translations[lang].logo;

  document.querySelectorAll("[data-id]").forEach((ele) => {
    ele.textContent = translations[lang][ele.dataset.id];
  });

  localStorage.setItem("lang", lang);
  getSuwar(lang);
  getReciter(lang);
  getChannels(lang);
}

export { translations, selectLanguage, logo, changeLang };
