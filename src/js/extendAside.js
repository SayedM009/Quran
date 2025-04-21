const aside = document.querySelector("aside");
const tabs = document.querySelectorAll(".tab");
const titles = document.querySelectorAll(".title");
const listen = document.querySelector(".data__section");

aside.addEventListener("click", function (e) {
  if (e.target.closest(".tab")) {
    // 1. Remove active class from all tabs
    tabs.forEach((tab) => tab.classList.remove("active"));
    // 2. Add active class to the clicked tab
    e.target.closest(".tab").classList.add("active");
    // 3. Add col-4 class to extend the aside size
    aside.classList.add("col-4");
    // 4. Waiting a while to show the tiltes
    setTimeout(() => {
      titles.forEach((title) => title.classList.remove("hide"));
    }, 0.2 * 1000);
    // 5. Adding display none to all section
    document
      .querySelectorAll(".data")
      .forEach((ele) => ele.classList.add("d-none"));
    // 6. Removing display none from the target element
    document
      .querySelector(`.${e.target.closest(".tab").dataset.class}`)
      .classList.remove("d-none");
  }
});

listen.addEventListener("click", function () {
  // 1. Remove col-4 from aside to get it back to the actual size
  aside.classList.remove("col-4");
  // 2. Add hide class to all titles to hide them
  titles.forEach((title) => title.classList.add("hide"));
});
