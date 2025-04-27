import axios from "axios";

const selectreciter = document.querySelector(".data__reciters--list--x");

export async function getReciter(lang) {
  try {
    const finalLng = lang === "en" ? "eng" : "ar";

    // 1. Async function returns a promise with one or more fulfilled results
    async function cehckFullfilledResults(...all) {
      return Promise.allSettled(all.map((url) => axios.get(url))).then(
        (result) => result.filter((res) => res.status === "fulfilled")
      );
    }

    const response = await cehckFullfilledResults(
      `https://www.mp3quran.net/api/v3/reciters?language=${finalLng}&reciter=168`,
      `https://www.mp3quran.net/api/v3/recent_reads?language=${finalLng}`
    );

    // 2. If cehckFullfilledResults function returns 1 fulfilled result
    if (response.length <= 1) {
      const [
        {
          value: { data },
        },
      ] = response;

      const responseKey = Object.keys(data)[0];
      const responseValues = data[responseKey];
      injectValuestoRiciterSelectEle(responseValues);
    }

    // 2. If cehckFullfilledResults function returns 2 fulfilled result
    if (response.length >= 2) {
      const [
        {
          value: {
            data: { reciters },
          },
        },
        {
          value: {
            data: { reads },
          },
        },
      ] = response;
      const all = [...reciters, ...reads];
      injectValuestoRiciterSelectEle(all);
    }
  } catch (error) {
    if (import("./ErrorModal")) {
      import("./ErrorModal").then((modal) => {
        const { errorModal } = modal;
        errorModal("Could not fin reciters! ", "Someting went wrong!");
      });
    }
  }
}

function injectValuestoRiciterSelectEle(values) {
  if (!selectreciter) return;
  selectreciter.innerHTML = "";

  values.forEach((reciter) => {
    selectreciter.insertAdjacentHTML(
      "beforeend",
      `<option class="fw-bold" value="${reciter.name}">${reciter.name}</option>`
    );
  });
}
