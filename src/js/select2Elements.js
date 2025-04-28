$(document).ready(function () {
  $(".select2").select2({
    width: "100%",
  });

  let swurahNumber = 1;
  // Select element for swuar
  $(".select2.data__suwar").on("change", function (e) {
    swurahNumber = +e.target.value.split(" ").at(-1);
    if (import("./PagesOfSwrah.js")) {
      import("./PagesOfSwrah.js").then((result) => {
        const { getPages } = result;
        getPages(swurahNumber);
      });
    }
  });

  // Select element for reciter
  $(".data__reciters--list--x").on("change", function (e) {
    console.log(swurahNumber);
    const targetValue = e.target.value;
    const swurahOfReciter = `${targetValue.slice(
      targetValue.indexOf("http")
    )}${String(swurahNumber).padStart(3, 0)}.mp3`;
    console.log(swurahOfReciter);
  });

  // Select element for radio channels
  $(".select2.data__channel--list").on("change", function (e) {
    // 1.Removing active class from all carousel items
    document
      .querySelectorAll(".carousel-item.carousel-item-channel")
      .forEach((ele) => {
        ele.classList.remove("active");
      });

    // 2. Set the current value of the select element to the target ccarousel item
    if (!document.querySelector(`[data-channelName="${e.target.value}"]`))
      return;
    document
      .querySelector(`[data-channelName="${e.target.value}"]`)
      .classList.add("active");
  });
});
