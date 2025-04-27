import { translations } from "./translations-data";

export function errorModal(errTitle = "Error", errBody = "Error") {
  const lang = localStorage.getItem("lang") || "en";
  const oldModal = document.querySelector(".dynamic-modal");
  if (oldModal) oldModal.remove();

  const modalHTML = `
    <div class="modal fade dynamic-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${errTitle}</h5>
          </div>
          <div class="modal-body">
            <p>${errBody}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="background: #c6ff00; color:#0d2913"}>${translations[lang].close}</button>
          </div>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modalElement = document.querySelector(".dynamic-modal");
  const modalInstance = new bootstrap.Modal(modalElement);

  modalInstance.show();

  // بعد ما يتقفل المودال، نحذفه من الصفحة
  modalElement.addEventListener("hidden.bs.modal", () => {
    modalElement.remove();
  });
}
