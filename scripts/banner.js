function displayBanner(currentPhotographer, displayMediaList) {
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
  const banerBody = document.createElement("section");
  const banerTitle = document.createElement("h1");
  const banerLocation = document.createElement("p");
  const banerTagline = document.createElement("p");
  const containerTagsBanner = document.createElement("nav");
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
  containerTagsBanner.setAttribute("role", "navigation");
  btnModal.setAttribute("role", "button");
  banner.setAttribute("role", "banner");

  containerTagsBanner.setAttribute("aria-label", "filtrer les medias par");
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
    tagsLink.setAttribute("role", "button");
    tagsLink.appendChild(tagsSpan);
    // tagsSpan.setAttribute("aria-labelledby", `${el}`);

    tagsLink.id = `${el}`;

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
  return btnModal;
}

export { displayBanner };
