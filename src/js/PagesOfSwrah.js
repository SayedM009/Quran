import axios from "axios";

const carouselPages = document.querySelector(".carousel-inner-pages");
const carouselElement = document.querySelector("#carouselExample");

const prevButton = carouselElement.querySelector(".carousel-control-next"); // الزر اللي بقى "سابق"
const nextButton = carouselElement.querySelector(".carousel-control-prev"); // الزر اللي بقى "التالي"

const pageLoader = `<div class="pages__loader">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>`;

let carouselInstance;

async function getPages(num = 1) {
  carouselPages.insertAdjacentHTML("afterbegin", pageLoader);
  try {
    const response = await axios.get(
      `https://mp3quran.net/api/v3/ayat_timing?surah=${num}&read=1`
    );

    const data = response.data
      .map((ele) => ele.page)
      .filter((page) => page != null);

    carouselPages.innerHTML = "";
    const unurl = new Set(data);
    [...unurl].reverse().forEach((src, i, arr) => {
      carouselPages.insertAdjacentHTML(
        "beforeend",
        `
          <div class="carousel-item rounded-2 ${
            i === [...unurl].length - 1 ? "active" : ""
          } text-center">
            <img src="${src}" style="max-width:480px" loading="lazy">
          </div>`
      );
    });

    setupCarouselControl();
  } catch (error) {
    console.error(error.message);
  }
}

function setupCarouselControl() {
  if (!window.bootstrap) {
    console.error("Bootstrap not found!");
    return;
  }

  // إنشاء نسخة من الكاروسيل
  carouselInstance = new bootstrap.Carousel(carouselElement, {
    interval: false, // وقف التحريك التلقائي
    touch: true, // خليه شغال باللمس كمان
    ride: false,
  });

  // أول تحديث لحالة الزرار
  updateButtons();

  carouselElement.addEventListener("slid.bs.carousel", updateButtons);
}

function updateButtons() {
  const items = carouselPages.querySelectorAll(".carousel-item");
  const activeIndex = [...items].findIndex((item) =>
    item.classList.contains("active")
  );

  // لو على أول صفحة، عطل زر "السابق"
  if (activeIndex === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  // لو على آخر صفحة، عطل زر "التالي"
  if (activeIndex === items.length - 1) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

export { getPages };
