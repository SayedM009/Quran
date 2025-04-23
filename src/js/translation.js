import { getSuwar } from "./getSuwar.js";
import { getReciter } from "./getReciter.js";
import { getChannels } from "./getChannels.js";
export { selectLanguage, logo, translation, changeLang };

const selectLanguage = document.querySelector(".form-select");
const logo = document.querySelector(".navbar-brand");
const translation = {
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
    translation[lang].dir
  );
  document.body.style.fontFamily = translation[lang].fontFamily;
  document.body.dir = translation[lang].dir;
  document.title = translation[lang].title;
  logo.textContent = translation[lang].logo;

  document.querySelectorAll("[data-id]").forEach((ele) => {
    ele.textContent = translation[lang][ele.dataset.id];
  });

  localStorage.setItem("lang", lang);
  getSuwar(lang);
  getReciter(lang);
  getChannels(lang);
}
