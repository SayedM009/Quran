const selectreciter = document.querySelector(".data__reciters--list--x");

export function getReciter(lang) {
  const finalLng = lang === "en" ? "eng" : "ar";
  fetch(`https://mp3quran.net/api/v3/radios?language=${finalLng}`)
    .then((res) => res.json())
    .then((data) => {
      if (!selectreciter) return;
      selectreciter.innerHTML = "";
      data.radios.forEach((swrah) => {
        selectreciter.insertAdjacentHTML(
          "beforeend",
          `<option class="fw-bold" value="${swrah.name}">${swrah.name}</option>`
        );
      });
    });
}
