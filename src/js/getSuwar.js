const selectsurah = document.querySelector(".data__suwar");

// export function getSuwar(lang) {
//   const finalLng = lang === "en" ? "eng" : "ar";
//   return fetch(`https://mp3quran.net/api/v3/suwar?language=${finalLng}`)
//     .then((res) => res.json())
//     .then((data) => {
//       if (!selectsurah) return;
//       selectsurah.innerHTML = "";
//       data.suwar.forEach((swrah) => {
//         selectsurah.insertAdjacentHTML(
//           "beforeend",
//           `<option class="fw-bold" value="${swrah.name}">${swrah.name}</option>`
//         );
//       });
//       return data;
//     });
// }

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
      `<option class="fw-bold" value="${swrah.name}">${swrah.name}</option>`
    );
  });
}
