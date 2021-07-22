/**
 * @module photographer-pages
 */
// test
import { Photographers } from "./Photographers.js";
import { MediumList } from "./MediumList.js";
import { Medium } from "./Medium.js";
import { displayFilterMenu } from "./dropdown.js";
import { openModalForm } from "./modale.js";

// import { sortByDate, sortByPopularity, sortByTitle } from "./dropdownMenu.js";

/**
 * name linkToData
 * @type {string}
 * @description le liens vers les données Json Fisheye
 *
 */
const linkToData = "data/FishEyeDataFR.json";

const urlParams = new URLSearchParams(window.location.search);
/**
 * @name mediaList
 * @type {array}
 * @description un tableau contenant les objets media  du photographe courant et les methodes qui lui sont associées
 *
 */
const mediaList = new MediumList();
const main = document.querySelector(".main");
/**
 * @name mediaFactory
 * @type {object}
 * @description une instance de la classe mediums image ou videos
 */
let mediaFactory = new Medium();
/**
 * @name currentPhotographer
 * @type {object}
 * @description informations sur le photographe courant
 *
 */
let currentPhotographer;
/**
 * @name totalLikes
 * @type {Array<number>}
 * @description Nonbres de likes de chaque médias
 *
 */
let totalLikes = [];
/**
 * @name totalLikesPhotographer
 * @type {number}
 * @description Nonbres de likes total du photographe courant
 *
 */
let totalLikesPhotographer;

const loader = document.querySelector(".loader-container");

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

function createData(data) {
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

function displayBanner(currentPhotographer) {
  const urlParams = new URLSearchParams(window.location.search);

  /**
   * name LinkToPhoto
   * @type {string}
   * @description Chemin (path) vers la photo du photographe
   *
   */
  const linkToPhoto =
    "./sources/img/1_small/PhotographersID/" + currentPhotographer.portrait;

  //  création des elements html
  const banerBody = document.createElement("div");
  const banerTitle = document.createElement("h1");
  const banerLocation = document.createElement("p");
  const banerTagline = document.createElement("p");
  const containerTagsBanner = document.createElement("div");
  const containerImgBanner = document.createElement("div");
  const bannerImg = document.createElement("img");
  const btnModal = document.createElement("button");
  const banner = document.querySelector(".banner");

  // ajouts des classes et attributs html

  banerBody.classList.add("banner-body");
  btnModal.classList.add("banner-btn");
  containerImgBanner.classList.add("banner-img");
  banerTitle.classList.add("banner-body-title");
  banerLocation.classList.add("banner-body-location");
  banerTagline.classList.add("banner-body-tagline");
  banerTagline.classList.add("banner-body-tagline");
  bannerImg.src = linkToPhoto;
  banerTitle.setAttribute("lang", "en");
  bannerImg.setAttribute("alt", `${currentPhotographer.name}`);

  // ajout du contenu html
  banerTitle.textContent = currentPhotographer.name;
  banerLocation.textContent =
    currentPhotographer.city + " ," + currentPhotographer.country;
  banerTagline.textContent = currentPhotographer.tagline;
  btnModal.textContent = "Contacter-moi";

  // ajouts des tags
  currentPhotographer.tags.forEach((el) => {
    const tagsLink = document.createElement("a");
    const tagsSpan = document.createElement("span");
    containerTagsBanner.classList.add("banner-tags-container");
    tagsLink.classList.add("tags-link");
    tagsSpan.classList.add("tags");
    containerTagsBanner.appendChild(tagsLink);
    tagsLink.textContent = "#";
    tagsSpan.textContent = el;
    tagsLink.appendChild(tagsSpan);

    tagsLink.addEventListener("click", (e) => {
      e.preventDefault();
      tagsLink.classList.toggle("tag--selected");
      displayMediaList();
    });

    if (urlParams.get("tag") && urlParams.get("tag") === el) {
      tagsLink.classList.toggle("tag--selected");
    }
  });

  // ajout des elements dans le DOM
  banner.append(banerBody, btnModal, containerImgBanner);
  banerBody.append(
    banerTitle,
    banerLocation,
    banerTagline,
    containerTagsBanner
  );

  containerImgBanner.appendChild(bannerImg);
}
/** display mediaList
 * @property {function} displaymediaList  créer et affiche les cards medias filtrer selon le ou les tags sélèctioner par l'uttilisateur
 *
 * @returns  {filters}
 */
export function displayMediaList() {
  /**
   * @name displayMediaList
   * @type {Array<object>}
   * @description Liste des medias filtrer selon le ou les tags sélèctioner par l'uttilisateur
   *
   */
  let displayMediaList = [];
  /**
   * @name filters
   * @type {array}
   * @description tableau contenant les tags selectionne par l'uttilisateur
   *
   */
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
    const cardsMedia = document.createElement("article");
    const cardsMediaImg = document.createElement("a");
    const cardsMediaFooter = document.createElement("div");
    const cardsMediaTitle = document.createElement("p");
    const cardsMediaHeaderLike = document.createElement("div");

    // const playLogo = document.createElement("i");
    // playLogo.classList.add("fas");
    // playLogo.classList.add("fa-play-circle");
    // cardsMediaImg.textContent = `${media.title}`;

    const cardsMediaCompteurLike = document.createElement("p");
    const heartLink = document.createElement("a");
    const heart = document.createElement("i");
    cardsMediaCompteurLike.setAttribute("aria-label", `likes`);
    cardsMedia.setAttribute("role", "article");
    cardsMedia.classList.add("cards-media");
    cardsMediaImg.classList.add("cards-media-img");
    cardsMediaImg.setAttribute("title", "ouvrir la lightbox");

    cardsMediaFooter.classList.add("cards-media-footer");
    cardsMediaTitle.classList.add("cards-media-title");
    cardsMediaHeaderLike.classList.add("header-like");
    cardsMediaCompteurLike.classList.add("compteur");
    heartLink.classList.add("heart-link");
    heartLink.setAttribute("aria-label", "Liker la photo");
    heartLink.setAttribute("role", "button");
    heartLink.setAttribute("tabindex", "0");
    cardsMediaCompteurLike.setAttribute("tabindex", "0");

    cardsMediaCompteurLike.setAttribute(
      "aria-label",
      `Nombre de likes ${media.likes}`
    );

    heart.classList.add("heart");
    heart.classList.add("far");
    heart.classList.add("fa-heart");

    cardsMediaImg.href = "#";
    cardsMediaImg.setAttribute("title", media.title);
    cardsMediaImg.setAttribute("aria-describedby", "ouvrir le slider");

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
      cardsMediaCompteurLike.classList.add("compteur");

      heartLink.addEventListener("click", () => {
        if (heart.classList.contains("fas")) {
          media.likes--;
          heart.classList.remove("fas");
          heart.classList.add("far");
          cardsMediaCompteurLike.textContent = media.likes;
          heart.classList.remove("heart-anim");
          displayTotalLikes();
        } else {
          media.likes++;
          heart.classList.remove("far");
          heart.classList.add("fas");
          cardsMediaCompteurLike.textContent = media.likes;
          heart.classList.add("heart-anim");
          displayTotalLikes();
        }
      });
    }
    cardsMediaImg.addEventListener("click", (e) => e.preventDefault());
    cardsMediaImg.addEventListener("click", () =>
      displayLightbox(media, displayMediaList)
    );
    return filters;
  });
}

function displayPage() {
  document.title += " - " + currentPhotographer.name;
  // const cardMediaImg = document.querySelector(".cards-media-img");
  displayBanner(currentPhotographer);
  openModalForm(currentPhotographer);
  displayFilterMenu(displayMediaList);
  displayTotalLikes(displayMediaList);
  displayMediaList();
}
/**
 * @name getLikes
 * ajoute les likes des médias dans un tableau
 * @param {number} likes
 * @returns {array}
 */

/**
 * @name getTotalLikes
 * Calcul le nombres total de likes du photographe courant
 *
 *
 */

/**
 * @name displayTotalLikes
 * creer et affiche le nombre total de likes du photographe sur la page
 * @param {number} totalLikesPhotographer nombre total de likes du photographe
 */
function displayTotalLikes() {
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

/**
 * @name displayLightbox
 * fonctions permettant d'ouvrir /fermer la lightbox et de naviguer entre les médias
 * @param {object} media le media courant
 * @param {array} displayMediaList liste des medias trier
 */

function displayLightbox(media, displayMediaList) {
  let currentMedia = media;
  const lightboxModal = document.querySelector(".lightbox-modal");
  const slideContainer = document.querySelector(".container-slides");
  const closeBtn = document.querySelector(".close-lightbox-media");
  const next = document.querySelector(".right");
  const previous = document.querySelector(".left");
  const titleMedia = document.querySelector(".titre-media-lightbox");
  const mediaImg = document.createElement("img");
  const mediaVid = document.createElement("video");
  const lightboxLink = document.querySelectorAll(".media-img");

  lightboxLink.forEach((link) => link.addEventListener("click", openLightbox));
  next.addEventListener("click", nextSlide);
  previous.addEventListener("click", previousSlide);
  closeBtn.addEventListener("click", closelightbox);

  lightboxModal.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closelightbox(e, media);
    }
    if (e.code === "ArrowRight") {
      nextSlide(e);
    }
    if (e.code === "ArrowLeft") {
      previousSlide(e);
    }
  });

  titleMedia.textContent = `${currentMedia.title}`;
  function nextSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(currentMedia) + 1 >= displayMediaList.length) {
      currentMedia = displayMediaList[0];
      titleMedia.textContent = `${currentMedia.title}`;
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) + 1];
      titleMedia.textContent = `${currentMedia.title}`;
    }
    displayContent();
  }

  function previousSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(currentMedia) < +0) {
      currentMedia = displayMediaList[displayMediaList.length - 1];
      titleMedia.textContent = `${currentMedia.title}`;
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) - 1];
      titleMedia.textContent = `${currentMedia.title}`;
    }
    displayContent();
  }

  // /**
  //  * @name openLightbox
  //  * fonctions permettant d'ouvrir la lightbox
  //  */
  function openLightbox() {
    lightboxModal.style.display = "flex";
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.setAttribute("aria-hidden", "true");
  }
  // /**
  //  * @name closeLightbox
  //  * fonctions permettant de fermer la lightbox
  //  */
  function closelightbox() {
    lightboxModal.style.display = "none";
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.setAttribute("aria-hidden", "false");
  }

  displayContent();
  function displayContent() {
    if (currentMedia.type === "jpg") {
      mediaVid.replaceWith(mediaImg);
      mediaImg.src = `sources/img/2_medium/${currentPhotographer.getFolderName()}/${
        currentMedia.link
      }`;
      mediaImg.alt = currentMedia.alt;
      slideContainer.appendChild(mediaImg);
    } else if (currentMedia.type === "mp4") {
      mediaVid.src = `sources/img/2_medium/${currentPhotographer.getFolderName()}/${
        currentMedia.link
      }`;
      mediaImg.replaceWith(mediaVid);
      mediaVid.setAttribute("alt", currentMedia.alt);
      mediaVid.autoplay = true;
      mediaVid.loop = true;
      slideContainer.appendChild(mediaVid);
    }
  }
}
