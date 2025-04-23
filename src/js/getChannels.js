const selectChannel = document.querySelector(".data__channel--list");
const carouselChannels = document.querySelector(".carousel-inner");
const myCarousel = document.getElementById("carouselExample");

export function getChannels(lang) {
  const finalLng = lang === "en" ? "eng" : "ar";
  return fetch(`https://mp3quran.net/api/v3/radios?language=${finalLng}`)
    .then((res) => res.json())
    .then((data) => {
      if (!selectChannel) return;
      selectChannel.innerHTML = "";
      carouselChannels.innerHTML = "";
      data.radios.forEach((channel, i) => {
        selectChannel.insertAdjacentHTML(
          "beforeend",
          `<option class="fw-bold" value="${channel.name}">${channel.name}</option>`
        );
        carouselChannels.insertAdjacentHTML(
          "beforeend",
          `<div class="carousel-item px-4 mb-0 ${
            i === 0 ? "active" : ""
          }" data-channel="${channel.name}">
            <h6 class="text-center mb-0" style="font-size:10px;">${
              channel.name
            }</h6>
          </div>`
        );
      });
      return data;
    });
}

myCarousel.addEventListener("slide.bs.carousel", (event) => {
  const channelName = event.relatedTarget.children[0].textContent;
  // Set the select element value to channel name
  selectChannel.value = channelName;
  // Set the showen selected element to channel name
  document.querySelector(
    ".data__channel--list + span .select2-selection__rendered"
  ).innerHTML = channelName;
});
