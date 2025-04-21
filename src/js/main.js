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
  },
};

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
});

// Swtich the Language Event
selectLanguage.addEventListener("change", () =>
  changeLang(selectLanguage.value)
);

// Change Lanuage Function
function changeLang(lang) {
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
}
// /////////////////////////////////////

const aside = document.querySelector("aside");
const tabs = document.querySelectorAll(".tab");
const titles = document.querySelectorAll(".title");
const listen = document.querySelector(".data__section");

aside.addEventListener("click", function (e) {
  if (e.target.closest(".tab")) {
    // 1. Remove active class from all tabs
    tabs.forEach((tab) => tab.classList.remove("active"));
    // 2. Add active class to the clicked tab
    e.target.closest(".tab").classList.add("active");
    // 3. Add col-4 class to extend the aside size
    aside.classList.add("col-4");
    // 4. Waiting a while to show the tiltes
    setTimeout(() => {
      titles.forEach((title) => title.classList.remove("hide"));
    }, 0.2 * 1000);
  }
});

listen.addEventListener("click", function () {
  // 1. Remove col-4 from aside to get it back to the actual size
  aside.classList.remove("col-4");
  // 2. Add hide class to all titles to hide them
  titles.forEach((title) => title.classList.add("hide"));
});

// ////////////////////////////////////
const selectsurah = document.querySelector(".data__suwar");
const selectreciter = document.querySelector(".data__reciters--list--x");

function getSuwar(lang) {
  const finalLng = lang === "en" ? "eng" : "ar";
  return fetch(`https://mp3quran.net/api/v3/suwar?language=${finalLng}`)
    .then((res) => res.json())
    .then((data) => {
      selectsurah.innerHTML = "";
      data.suwar.forEach((swrah) => {
        selectsurah.insertAdjacentHTML(
          "beforeend",
          `<option class="fw-bold" value="${swrah.name}">${swrah.name}</option>`
        );
      });
      return data;
    });
}

getSuwar(selectLanguage.value);

function getReciter(lang) {
  const finalLng = lang === "en" ? "eng" : "ar";
  fetch(`https://mp3quran.net/api/v3/radios?language=${finalLng}`)
    .then((res) => res.json())
    .then((data) => {
      selectreciter.innerHTML = "";
      data.radios.forEach((swrah) => {
        selectreciter.insertAdjacentHTML(
          "beforeend",
          `<option class="fw-bold" value="${swrah.name}">${swrah.name}</option>`
        );
      });
    });
}

getReciter(selectLanguage.value);
