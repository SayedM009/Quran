import { getChannels, selectChannel, carouselChannels } from "./getChannels.js";

const aside = document.querySelector("aside");
const tabs = document.querySelectorAll(".tab");
const titles = document.querySelectorAll(".title");
const dataSection = document.querySelector(".data__section");

aside.addEventListener("click", function (e) {
  const targetTab = e.target.closest(".tab");

  if (targetTab) {
    // 1. Take control of UI for target tab and it's section
    tabsAndSectionUIControl(targetTab);
    // 2. Get all radio channels if the radio tab is active
    if (targetTab.dataset.class === "data__radio")
      getChannels(
        localStorage.getItem("lang") || "en",
        selectChannel,
        carouselChannels
      );

    // 8. Get all remaining services  if it's tab is active : such as 7.
  }
});

dataSection.addEventListener("click", function () {
  // 1. Remove col-4 from aside to get it back to the actual size
  aside.classList.remove("col-4");
  // 2. Add hide class to all titles to hide them
  titles.forEach((title) => title.classList.add("d-none"));
});

function tabsAndSectionUIControl(tab) {
  // 1. Remove active class from all tabs
  tabs.forEach((tab) => tab.classList.remove("active"));
  // 2. Add active class to the clicked tab
  tab.classList.add("active");
  // 3. Add col-4 class to extend the aside size if in mobile
  if (window.matchMedia("(max-width: 768px)").matches)
    aside.classList.add("col-4");

  // 4. Waiting a while to show the tiltes
  setTimeout(() => {
    titles.forEach((title) => title.classList.remove("d-none"));
  }, 0.2 * 1000);
  // 5. Adding display none to all section
  document
    .querySelectorAll(".data")
    .forEach((ele) => ele.classList.add("d-none"));
  // 6. Removing display none from the target element
  document.querySelector(`.${tab.dataset.class}`).classList.remove("d-none");
}
