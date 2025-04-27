import { translations } from "./translations-data.js";

const selectLanguage = document.querySelector(".changeLang");
const logo = document.querySelector(".navbar-brand");

// Change Language Function
function changeLang(lang) {
  document.documentElement.style.setProperty(
    "--direction",
    translations[lang]?.dir
  );
  document.body.style.fontFamily = translations[lang].fontFamily;
  document.body.dir = translations[lang].dir;
  document.title = translations[lang].title;
  logo.textContent = translations[lang].logo;

  // Get all elements to translate them based on the current language
  document.querySelectorAll("[data-id]").forEach((ele) => {
    ele.textContent = translations[lang][ele.dataset.id];
  });

  localStorage.setItem("lang", lang);

  // We'll update content based on language in a non-circular way
  updateContentBasedOnLanguage(lang);
}

// Separate function to update content based on language
function updateContentBasedOnLanguage(lang) {
  // Import these functions dynamically to avoid circular dependencies
  import("./getSuwar.js").then((module) => {
    const getSuwar = module.getSuwar;
    document.querySelectorAll(".tab").forEach((tab) => {
      if (
        tab.getAttribute("data-class") == "data__reciters" &&
        tab.classList.contains("active")
      ) {
        getSuwar(lang);
      }
    });
  });

  import("./PagesOfSwrah.js").then((module) => {
    const getPages = module.getPages;
    document.querySelectorAll(".tab").forEach((tab) => {
      if (
        tab.getAttribute("data-class") == "data__reciters" &&
        tab.classList.contains("active")
      ) {
        getPages();
      }
    });
  });

  import("./getReciter.js").then((module) => {
    const getReciter = module.getReciter;
    document.querySelectorAll(".tab").forEach((tab) => {
      if (
        tab.getAttribute("data-class") == "data__reciters" &&
        tab.classList.contains("active")
      ) {
        getReciter(lang);
      }
    });
  });

  import("./getChannels.js").then((module) => {
    const { getChannels, selectChannel, carouselChannels } = module;
    document.querySelectorAll(".tab").forEach((tab) => {
      if (
        tab.getAttribute("data-class") == "data__radio" &&
        tab.classList.contains("active")
      ) {
        getChannels(lang, selectChannel, carouselChannels);
      }
    });
  });
}

// Switch the Language Event
selectLanguage.addEventListener("change", () =>
  changeLang(selectLanguage.value)
);

export { changeLang, selectLanguage };
