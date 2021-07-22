/**
 * @module Medium-class
 */
/**
 * Class pour creer un nouveaux media video ou image
 */
export class Medium {
  /**
   * detais concernant le media
   * @param {string} type type de médias image ou vidéos
   * @param {string} alt  balise Alt
   * @param {date} date   date d'ajout du média
   * @param {number} id   ID du médias
   * @param {string} link Liens vers le média
   * @param {number} likes Nombre de likes du média
   * @param {number} photographerId ID du photographe liée au média
   * @param {string} tags tag associées au média
   * @param {string} title titre du média
   * @param {string} path Chemin vers le média
   * @returns {object}
   */
  createMedia(type, alt, date, id, link, likes, photographerId, tags, path) {
    if (type == "jpg") {
      const photo = new Photo();
      photo.type = type;
      photo.alt = alt;
      photo.date = new Date(date);
      photo.id = id;
      photo.link = link;
      photo.likes = likes;
      photo.photographerId = photographerId;
      photo.tags = tags;
      photo.title = link.replace(".jpg", "").replaceAll("_", " ");
      photo.path = path + link;

      return photo;
    } else if (type == "mp4") {
      const video = new Video();
      video.type = type;
      video.alt = alt;
      video.date = new Date(date);
      video.id = id;
      video.link = link;
      video.likes = likes;
      video.photographerId = photographerId;
      video.tags = tags;
      video.title = link.replace(".mp4", "").replaceAll("_", " ");
      return video;
    }
  }
}

export class Photo extends Medium {
  createImg(photographer) {
    const linkToSmalPhoto = `./sources/img/1_small/${photographer}/`;
    const cardsMediaImg = document.createElement("img");
    cardsMediaImg.src = linkToSmalPhoto + this.link;
    cardsMediaImg.alt = this.alt;
    cardsMediaImg.classList.add("media-img");

    return cardsMediaImg;
  }
}

export class Video extends Medium {
  createImg(photographer) {
    const linkToSmalPhoto = `./sources/img/1_small/${photographer}/`;
    const cardsMediaVideo = document.createElement("video");
    cardsMediaVideo.loop = true;
    cardsMediaVideo.muted = true;

    cardsMediaVideo.src = linkToSmalPhoto + this.link;
    cardsMediaVideo.alt = this.alt;
    cardsMediaVideo.classList.add("media-img");

    return cardsMediaVideo;
  }
}
