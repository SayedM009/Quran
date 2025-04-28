const selectsurah = document.querySelector(".data__suwar");

export async function getSuwar(lang) {
  const finalLng = lang === "en" ? "eng" : "ar";
  const response = await fetch(
    `https://mp3quran.net/api/v3/suwar?language=${finalLng}`
  );
  const data = await response.json();

  // 1.
  if (!data || !data.suwar) return;
  if (!selectsurah) return;
  selectsurah.innerHTML = "";

  // 3. Display Suwar in DOM
  data.suwar.forEach((swrah) => {
    selectsurah.insertAdjacentHTML(
      "beforeend",
      `<option class="fw-bold" value="${swrah.name} ${swrah.id}">${swrah.name} </option>`
    );
  });
}
