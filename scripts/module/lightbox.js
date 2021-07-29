function displayLightbox(media, displayMediaList, currentPhotographer) {
  let currentMedia = media;
  const lightboxModal = document.querySelector(".lightbox");
  const slideContainer = document.querySelector(".container-slides");
  const closeBtn = document.querySelector(".close");
  const next = document.querySelector(".right");
  const previous = document.querySelector(".left");
  const titleMedia = document.querySelector(".titre-media-lightbox");
  const mediaImg = document.createElement("img");
  const mediaVid = document.createElement("video");

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

  function nextSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(currentMedia) + 1 >= displayMediaList.length) {
      currentMedia = displayMediaList[0];
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) + 1];
    }
    displayContent();
  }

  function previousSlide(e) {
    e.preventDefault;
    if (displayMediaList.indexOf(currentMedia) <= +0) {
      currentMedia = displayMediaList[displayMediaList.length - 1];
      displayContent(currentMedia);
    } else {
      currentMedia =
        displayMediaList[displayMediaList.indexOf(currentMedia) - 1];
      displayContent(currentMedia);
    }
  }

  function closelightbox() {
    const lightboxModal = document.querySelector(".lightbox");
    const main = document.querySelector(".main");
    lightboxModal.style.display = "none";
    main.classList.remove("anti-scroll");
    main.style.display = "block";
  }

  displayContent(currentMedia);
  function displayContent() {
    if (currentMedia.type === "jpg") {
      mediaVid.replaceWith(mediaImg);
      mediaImg.src = `sources/img/2_medium/${currentPhotographer.getFolderName()}/${
        currentMedia.link
      }`;
      titleMedia.textContent = `${currentMedia.title}`;
      mediaImg.alt = currentMedia.alt;
      slideContainer.appendChild(mediaImg);
    } else if (currentMedia.type === "mp4") {
      mediaVid.src = `sources/img/2_medium/${currentPhotographer.getFolderName()}/${
        currentMedia.link
      }`;
      titleMedia.textContent = `${currentMedia.title}`;

      mediaImg.replaceWith(mediaVid);
      mediaVid.setAttribute("alt", currentMedia.alt);
      mediaVid.autoplay = true;
      mediaVid.loop = true;
      slideContainer.appendChild(mediaVid);
    }
  }
}
function openLightbox() {
  const main = document.querySelector(".main");
  const close = document.querySelector(".close");
  const lightboxModal = document.querySelector(".lightbox");
  lightboxModal.style.display = "flex";
  main.classList.add("anti-scroll");
  close.focus();
  main.style.display = "none";
}
export { displayLightbox, openLightbox };
