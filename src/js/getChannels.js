const selectChannel = document.querySelector(".data__channel--list");
const text = document.querySelector(".carousel-inner");
export function getChannels(lang) {
  const finalLng = lang === "en" ? "eng" : "ar";
  return fetch(`https://mp3quran.net/api/v3/radios?language=${finalLng}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!selectChannel) return;
      selectChannel.innerHTML = "";
      data.radios.forEach((channel, i) => {
        console.log(i);
        selectChannel.insertAdjacentHTML(
          "beforeend",
          `<option class="fw-bold" value="${channel.name}">${channel.name}</option>`
        );
        text.insertAdjacentHTML(
          "beforeend",
          `<div class="carousel-item px-5 ${i === 0 ? "active" : ""}">
            <h6 style="font-size:14px; text-align:center; mb-0">${
              channel.name
            }</h6>
          </div>`
        );
      });
      return data;
    });
}
