/**
 * @module modale
 */

function openModalForm(currentPhotographer) {
  const modalTitle = document.querySelector(".modal-title");
  const btnModalMobile = document.querySelector(".btn-modal-mobile");
  const bannerBtnTablet = document.querySelector(".banner-btn");
  const contactModal = document.querySelector(".contact-modal");
  const formFirstNameInp = document.querySelector(".firstName-inp");
  const formLastNameInp = document.querySelector(".lastName-inp");
  const formEmailInp = document.querySelector(".email-inp");
  const formMsgInp = document.querySelector(".msg-inp");
  const errorMessage = document.querySelectorAll(".message-alert");
  const modalClose = document.querySelector(".modal-close");

  let verifFirst;
  let verifLast;
  let verifMail;
  let verifMsg;

  modalTitle.innerHTML = `Contactez-Moi ${currentPhotographer.name} `;

  //open modal
  btnModalMobile.addEventListener("click", () => {
    const body = document.getElementById("body");
    body.setAttribute("aria-hiden", "true");
    contactModal.style.display = "flex";
    contactModal.setAttribute("aria-hidden", "false");

    modalClose.focus();
  });
  bannerBtnTablet.addEventListener("click", () => {
    contactModal.style.display = "flex";
    contactModal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scrool");
    modalClose.focus();
  });
  formFirstNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[0].style.display = "inline";
      formFirstNameInp.classList.add("echec");
      formFirstNameInp.classList.add("border");

      setTimeout(() => {
        formFirstNameInp.classList.remove("echec");
        formFirstNameInp.classList.remove("border");
      }, 500);
      verifFirst = false;
    } else {
      errorMessage[0].style.display = "none";
      verifFirst = true;
    }
  });
  formLastNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[1].style.display = "inline";
      formLastNameInp.classList.add("echec");
      formLastNameInp.classList.add("border");

      setTimeout(() => {
        formLastNameInp.classList.remove("echec");
        formLastNameInp.classList.remove("border");
      }, 500);
      verifLast = false;
    } else {
      errorMessage[1].style.display = "none";
      verifLast = true;
    }
  });
  formEmailInp.addEventListener("input", (e) => {
    const regexMail = /\S+@\S+\.\S+/;
    if (e.target.value.search(regexMail) === 0) {
      errorMessage[2].style.display = "none";
      verifMail = true;
    } else if (e.target.value.search(regexMail) === -1) {
      errorMessage[2].style.display = "inline";
      formEmailInp.classList.add("echec");
      formEmailInp.classList.add("border");

      setTimeout(() => {
        formEmailInp.classList.remove("echec");
        formEmailInp.classList.remove("border");
      }, 500);
      verifMail = false;
    }
  });

  formMsgInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[3].style.display = "inline";
      formMsgInp.classList.add("echec");
      formMsgInp.classList.add("border");

      setTimeout(() => {
        formMsgInp.classList.remove("echec");
        formMsgInp.classList.remove("border");
      }, 500);
      verifMsg = false;
    } else {
      errorMessage[3].style.display = "none";
      verifMsg = true;
    }
  });

  // submit form
  document.getElementById("contact").addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      verifFirst === true &&
      verifLast === true &&
      verifMail === true &&
      verifMsg === true
    ) {
      const modalValidationMsg = document.createElement("div");
      const validationTxt = document.createElement("div");
      const contactModal = document.querySelector(".modal-content");
      const modalTitle = document.querySelector(".modal-title");
      validationTxt.classList.add("validation-txt");
      const bannerModal = document.querySelector("form");
      bannerModal.style.display = "none";
      modalTitle.style.display = "none";
      modalValidationMsg.classList.add("modal-validation-msg");
      modalValidationMsg.style.display = "flex";
      contactModal.append(modalValidationMsg);
      modalValidationMsg.append(validationTxt);
      validationTxt.innerHTML = `Votre message a bien été envoyé à <br> ${currentPhotographer.name} `;

      let datas = new FormData(bannerModal);
      for (let i of datas.entries()) {
        console.log(i[0], ":", i[1]);
      }
    }
  });

  function closeModal() {
    const contactModal = document.querySelector(".contact-modal");
    contactModal.style.display = "none";
    contactModal.setAttribute("aria-hidden", "true");
    body.setAttribute("aria-hiden", "true");
  }

  modalClose.addEventListener("click", () => {
    closeModal();
  });
  contactModal.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(e);
    }
  });
}

export { openModalForm };
