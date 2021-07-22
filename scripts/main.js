/**
 * @module main
 */

import { Photographers } from "./Photographers.js";
import { PhotographerList } from "./photographerList.js";
/**
 * name photographerList
 * @type {array}
 * @description Tableau contenant les objets instancier avec la class phhotographer
 *
 */
const photographerList = new PhotographerList();

/**
 * name linkToData
 * @type {string}
 * @description le liens vers les données Json Fisheye
 *
 */

const linkToData = "./data/FishEyeDataFR.json";

const loader = document.querySelector(".loader-container");

window.addEventListener("load", () => {
  fetch(linkToData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(`Une erreur de type ${response.status}  est survenu ! `);
        setTimeout(function loaderAnim() {
          loader.className += " hidden";
        }, 2000);
      }
    })
    .then((data) => createPhotographerList(data))
    .then(displayPage);
  setTimeout(function loaderAnim() {
    loader.className += " hidden";
  }, 2000);
});

/**
 *créer un objet pour chaque photographe et les push dans un nouveaux tableau
 * @param {string} data linkToData
 * @returns {array}
 */
function createPhotographerList(data) {
  data.photographers.forEach((photographer) => {
    photographerList.addPhotographer(
      new Photographers(
        photographer.name,
        photographer.id,
        photographer.city,
        photographer.country,
        photographer.tags,
        photographer.tagline,
        photographer.price,
        photographer.portrait
      )
    );
  });
  return PhotographerList;
}

function displayPage() {
  displayTags();
  displayPhotographers();
  displayReturnMain();
}

// creation et affichages des tags (header) plus ajout toggle au cick
function displayTags() {
  const tagList = document.querySelector(".tag-list");

  photographerList.getAllTags().forEach((tag) => {
    const a = document.createElement("a");
    const span = document.createElement("span");

    span.id = `${tag}`;
    span.textContent = tag;
    a.textContent = "#";
    span.classList.add("tags");

    a.classList.add("tags-link");
    a.href = "#";
    a.setAttribute("aria-labelledby", `${tag}`);

    tagList.append(a);
    a.append(span);
    //ajoute la classe tag--selected si le tag est selectionner par l'uttilisateur
    a.addEventListener("click", (e) => {
      e.preventDefault();
      a.classList.toggle("tag--selected");
      displayPhotographers();
    });
  });
}

function displayPhotographers() {
  const main = document.querySelector("#main");
  /**
   * name filters
   * @type {array}
   * @description tableau contenant les tags selectionner
   *
   */
  const filters = [];

  main.innerHTML = "";
  document.querySelectorAll(".tag--selected").forEach((tagselected) => {
    filters.push(tagselected.textContent.replace("#", ""));
  });

  photographerList.getPhotographerList(...filters).forEach((photographer) => {
    const linkToPage = "photographerPage.html?id=" + photographer.id;
    const linkToPhoto =
      "./sources/img/1_small/PhotographersID/" + photographer.portrait;
    const cardPhotographer = document.createElement("section");
    const cardPhotographerHeader = document.createElement("header");
    const cardPhotographerFooter = document.createElement("footer");
    const cardLink = document.createElement("a");
    const cardImg = document.createElement("img");
    const cardTitle = document.createElement("h2");
    const cardBody = document.createElement("div");
    const cardLocation = document.createElement("h3");
    const cardTagline = document.createElement("p");
    const cardPrice = document.createElement("p");
    const cardTags = document.createElement("nav");
    const modalBg = document.createElement("form");

    photographer.tags.forEach((el) => {
      const tagsA = document.createElement("a");
      const tagsspan = document.createElement("span");
      cardTags.classList.add("cards-tags");
      cardTags.append(tagsA);
      tagsA.append(tagsspan);
      tagsspan.textContent = "#" + el;
      tagsA.classList.add("tags-link");
      tagsspan.classList.add("tags");

      tagsA.setAttribute("aria-labelledby", `${el}`);
      cardTags.setAttribute("role", "navigation");

      tagsA.href = linkToPage + "&tag=" + el;
    });

    cardPhotographer.classList.add("photographer-cards");
    cardImg.classList.add("cards-img");
    cardTitle.classList.add("cards-title");
    cardLocation.classList.add("cards-location");
    cardLink.classList.add("cards-photographer-link");
    cardTagline.classList.add("cards-tagline");
    cardPrice.classList.add("cards-price");
    modalBg.classList.add("modal");
    cardBody.classList.add("cards-body");

    cardLink.setAttribute("role", "link");
    cardLink.href = linkToPage;
    cardImg.src = linkToPhoto;
    cardImg.alt = "";

    cardTitle.textContent = photographer.name;
    cardLocation.textContent = photographer.city + ", " + photographer.country;
    cardTagline.textContent = photographer.tagline;
    cardPrice.textContent = photographer.price + "€/Jour";

    main.append(cardPhotographer);
    cardPhotographer.append(
      cardPhotographerHeader,
      cardBody,
      cardPhotographerFooter
    );
    cardPhotographerHeader.append(cardLink);
    cardPhotographerFooter.append(cardTags);
    cardLink.append(cardImg, cardTitle);

    cardBody.append(cardLocation, cardTagline, cardPrice);
  });
}

function displayReturnMain() {
  const returnMain = document.querySelector(".return-main ");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      returnMain.style.display = "block";
      returnMain.style.opacity = "1";
    } else {
      returnMain.style.display = "none";
      returnMain.style.opacity = "0";
    }
  });
}
