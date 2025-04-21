const selectsurah = document.querySelector(".data__suwar");
export function getSuwar(lang) {
  const finalLng = lang === "en" ? "eng" : "ar";
  return fetch(`https://mp3quran.net/api/v3/suwar?language=${finalLng}`)
    .then((res) => res.json())
    .then((data) => {
      if (!selectsurah) return;
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
