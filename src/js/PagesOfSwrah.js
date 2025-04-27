import axios from "axios";

const carouselPages = document.querySelector(".carousel-inner-pages");

async function getPages() {
  document.querySelector(".pages__loader").classList.remove("d-none");
  try {
    const response = await axios.get(
      "https://mp3quran.net/api/v3/ayat_timing?surah=2&read=1"
    );

    const data = response.data
      .map((ele) => ele.page)
      .filter((page) => page != null);

    const unurl = new Set(data);
    [...unurl].forEach((src, i) => {
      carouselPages.insertAdjacentHTML(
        "beforeend",
        `<div class="carousel-item  rounded-2 ${i === 0 ? "active" : ""}" >
            <img src="${src}">
          </div>`
      );
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    document.querySelector(".pages__loader").classList.add("d-none");
  }
}

export { getPages };
