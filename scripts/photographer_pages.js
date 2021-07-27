import { Photographers } from "./Photographers.js";
import { Medium } from "./Medium.js";
import { MediumList } from "./MediumList.js";
import { displayFilterMenu } from "./dropdown.js";
import { displayBanner } from "./banner.js";
import { displayLightbox } from "./lightbox.js";
import { openDialog, closeDialog, verifModal } from "./modale.js";

const linkToData = "data/FishEyeDataFR.json";
const loader = document.querySelector(".loader-container");
const urlParams = new URLSearchParams(window.location.search);
const mediaList = new MediumList();
const main = document.querySelector(".main");

let mediaFactory = new Medium();
let currentPhotographer;
let totalLikes = [];
let totalLikesPhotographer;

window.addEventListener("load", () => {
  fetch(linkToData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        setTimeout(function loaderAnim() {
          console.log(
            `Une erreur est survenue type d'erreur : ${response.status} `
          );
          loader.className += " hidden";
        }, 2000);
      }
    })
    .then((data) => createData(data))
    .then(displayPage);
  setTimeout(function loaderAnim() {
    loader.className += " hidden";
  }, 2000);
});
// création des données a afficher sur la page
function createData(data) {
  // créer un objet photographe si l'id est egale a l'id de l'adresse
  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      currentPhotographer = new Photographers(
        photographer.name,
        photographer.id,
        photographer.city,
        photographer.country,
        photographer.tags,
        photographer.tagline,
        photographer.price,
        photographer.portrait
      );
    }
  });
  // recupere les medias du phototographe courant
  data.media.forEach((media) => {
    if (media.photographerId === currentPhotographer.id) {
      media.getLikes;

      mediaList.addMedia(
        mediaFactory.createMedia(
          media.image?.split(".").pop() || media.video?.split(".").pop(),
          media.alt,
          media.date,
          media.id,
          media.image || media.video,
          media.likes,
          media.photographerId,
          media.tags,
          media.title,
          currentPhotographer.name.toLowerCase().replace(" ", "") + "/"
        )
      );
    }
  });
}

export function displayMediaList() {
  let displayMediaList = [];

  const filters = [];
  const cardsMediaContainer = document.querySelector(".cards-media-container");
  const sort = document
    .querySelector(".filter-option.selected")
    ?.getAttribute("data-value");

  cardsMediaContainer.innerHTML = "";
  document.querySelectorAll(".tag--selected").forEach((tagSelected) => {
    filters.push(tagSelected.textContent.replace("#", ""));
  });

  displayMediaList = mediaList.getMediaList(sort, ...filters);

  displayMediaList.forEach((media) => {
    const mediaElement = media.createImg(currentPhotographer.getFolderName());
    const cardsMedia = document.createElement("section");
    const cardsMediaImg = document.createElement("a");
    const cardsMediaFooter = document.createElement("div");
    const cardsMediaTitle = document.createElement("p");
    const cardsMediaHeaderLike = document.createElement("div");

    const cardsMediaCompteurLike = document.createElement("p");
    const heartLink = document.createElement("button");
    const heart = document.createElement("i");

    cardsMedia.classList.add("cards-media");
    cardsMediaImg.classList.add("cards-media-img");
    cardsMediaFooter.classList.add("cards-media-footer");
    cardsMediaTitle.classList.add("cards-media-title");
    cardsMediaHeaderLike.classList.add("header-like");
    cardsMediaCompteurLike.classList.add("compteur");
    heartLink.classList.add("heart-link");
    heart.classList.add("heart");
    heart.classList.add("far");
    heart.classList.add("fa-heart");

    cardsMediaCompteurLike.setAttribute("aria-label", `likes`);
    heartLink.setAttribute("aria-label", "aimer cette photo");
    heartLink.setAttribute("role", "button");
    cardsMediaImg.setAttribute("role", "button");
    cardsMediaImg.setAttribute("title", media.alt);
    cardsMediaImg.setAttribute("aria-describedby", "ouvrir le slider");
    cardsMediaImg.href = "#";
    heartLink.setAttribute("tabindex", "0");
    cardsMediaCompteurLike.setAttribute("tabindex", "0");
    cardsMediaCompteurLike.setAttribute(
      "aria-label",
      `Nombre de likes ${media.likes}`
    );

    cardsMediaTitle.textContent = `${media.title}`;
    cardsMediaCompteurLike.textContent = `${media.likes}`;

    cardsMediaContainer.append(cardsMedia);
    cardsMedia.append(cardsMediaImg, cardsMediaFooter);
    cardsMediaImg.append(mediaElement);
    cardsMediaFooter.append(cardsMediaTitle, cardsMediaHeaderLike);
    cardsMediaHeaderLike.append(cardsMediaCompteurLike, heartLink);
    heartLink.append(heart);
    compteurLikes(totalLikes);

    // compteur de likes
    function compteurLikes() {
      heartLink.addEventListener("click", () => {
        if (heart.classList.contains("fas")) {
          media.likes--;
          heart.classList.remove("fas");
          heart.classList.add("far");
          cardsMediaCompteurLike.textContent = media.likes;
          heart.classList.remove("heart-anim");
          displayInfo();
        } else {
          media.likes++;
          heart.classList.remove("far");
          heart.classList.add("fas");
          cardsMediaCompteurLike.textContent = media.likes;
          heart.classList.add("heart-anim");
          displayInfo();
        }
      });
    }

    cardsMediaImg.addEventListener("click", (e) => e.preventDefault());

    cardsMediaImg.addEventListener("click", () =>
      displayLightbox(media, displayMediaList, currentPhotographer)
    );
    cardsMediaImg.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        displayLightbox(media, displayMediaList, currentPhotographer);
        console.log(e);
      }
    });
  });
}

function displayPage() {
  const dialogTile = document.querySelector(".modal-title");
  const btnContact = document.querySelector(".contact-btn");
  const closeBtn = document.querySelector(".close-btn");

  document.title += " - " + currentPhotographer.name;
  dialogTile.textContent = `Contacter moi ${currentPhotographer.name}`;

  closeBtn.addEventListener("click", () => closeDialog());

  btnContact.addEventListener("click", () => openDialog());
  closeBtn.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeDialog();
    }
  });

  displayBanner(currentPhotographer, displayMediaList);
  verifModal();
  displayFilterMenu(displayMediaList);
  displayInfo(displayMediaList);
  displayMediaList();
}

function displayInfo() {
  const totalLikesContainer = document.createElement("div");
  const priceContainer = document.createElement("div");
  const price = document.createElement("p");

  const totalLikesNb = document.createElement("div");
  const heart = document.createElement("i");

  heart.classList.add(`fas`);
  heart.classList.add(`fa-heart`);
  heart.classList.add(`heart`);
  heart.classList.add(`heart-global`);

  priceContainer.classList.add("price-container");
  price.classList.add("price");
  totalLikesContainer.classList.add("total-likes-container");
  totalLikesNb.classList.add("total-likes");
  totalLikesNb.textContent = `${mediaList.getLikes()}`;
  price.textContent = `${currentPhotographer.price}€/ jour`;

  main.append(totalLikesContainer);
  totalLikesNb.append(heart);
  priceContainer.append(price);
  totalLikesContainer.append(totalLikesNb, priceContainer);
}
