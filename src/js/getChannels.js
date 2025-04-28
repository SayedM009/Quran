import axios from "axios";
const selectChannel = document.querySelector(".data__channel--list");
const carouselChannels = document.querySelector(".carousel-inner");
const carouselPages = document.querySelector(".carousel-inner-pages");

const myCarousel = document.getElementById("channel__carousel");

// async function getChannels(language, selecteElement, carouselContainer) {
//   try {
//     // 1. Check if the channels select element is exists
//     if (!selecteElement || !carouselContainer)
//       throw new Error("One or more elements are not exists please check it.");
//     const finalLng = language === "en" ? "eng" : "ar";

//     // 2. Fetch radio channels from API
//     const response = await fetch(
//       `https://mp3quran.net/api/v3/radios?language=${finalLng}`
//     );
//     const data = await response.json();
//     // 3. Make sure the select element and carousel are empty
//     selecteElement.innerHTML = "";
//     carouselContainer.innerHTML = "";
//     // 4. Get the target object's key automatically
//     const radioKey = Object.keys(data)[0];
//     const radioChannels = data[radioKey];
//     // 5. Loop over radio channels to inject it into select channel element.
//     radioChannels.forEach((channel, i) => {
//       selecteElement.insertAdjacentHTML(
//         "beforeend",
//         `<option class="fw-bold" value="${
//           channel.name
//         }">${channel.name.substring(0, 20)}</option>`
//       );
//       // 6.inject radio channels into carousel body.
//       carouselContainer.insertAdjacentHTML(
//         "beforeend",
//         `<div class="carousel-item px-4 mb-0 ${
//           i === 0 ? "active" : ""
//         }" data-channelName="${channel.name}" data-channelURL="${channel.url}">
//           <h6 class="text-center mb-0" style="font-size:10px;">${
//             channel.name
//           }</h6>
//         </div>`
//       );
//     });
//   } catch (error) {
//     alert(error.message);
//   }
// }

async function getChannels(language, selecteElement, carouselContainer) {
  try {
    // 1. Check if the channels select element is exists
    if (!selecteElement || !carouselContainer)
      throw new Error("One or more elements are not exists please check it.");
    const finalLng = language === "en" ? "eng" : "ar";

    // 2. Fetch radio channels from API
    const response = axios.get(
      `https://mp3quran.net/api/v3/radios?language=${finalLng}`
    );

    const { data } = await response;

    // // 3. Make sure the select element and carousel are empty
    selecteElement.innerHTML = "";
    carouselContainer.innerHTML = "";
    // // 4. Get the target object's key automatically
    const radioKey = Object.keys(data)[0];
    const radioChannels = data[radioKey];
    // // 5. Loop over radio channels to inject it into select channel element.
    radioChannels.forEach((channel, i) => {
      selecteElement.insertAdjacentHTML(
        "beforeend",
        `<option class="fw-bold" value="${
          channel.name
        }">${channel.name.substring(0, 20)}</option>`
      );
      // 6.inject radio channels into carousel body.
      carouselContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="carousel-item carousel-item-channel px-4 mb-0 ${
          i === 0 ? "active" : ""
        }" data-channelName="${channel.name}" data-channelURL="${channel.url}">
          <h6 class="text-center mb-0" style="font-size:10px;">${
            channel.name
          }</h6>
        </div>`
      );
    });
  } catch (error) {
    if (import("./ErrorModal")) {
      import("./ErrorModal").then((modal) => {
        const { errorModal } = modal;
        errorModal(error.message, "Someting went wrong!");
      });
    }
  }
}

myCarousel.addEventListener("slide.bs.carousel", (event) => {
  const channelName = event.relatedTarget.children[0].textContent.substring(
    0,
    30
  );
  // Set the select element value to channel name
  selectChannel.value = channelName;
  // Set the showen selected element to channel name
  document.querySelector(
    ".data__channel--list + span .select2-selection__rendered"
  ).innerHTML = channelName;
});

export { getChannels, selectChannel, carouselChannels };
