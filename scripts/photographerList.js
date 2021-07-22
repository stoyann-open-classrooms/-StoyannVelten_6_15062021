/**
 * Photographer class module
 * @module Photographer-List
 */

/**
 *  Class pour créer un nouveaux photographe
 */
export class PhotographerList {
  /**
   *
   * creation du tableau photographer list
   * @returns {Array}
   */
  constructor() {
    /**
     * @property {Array} name photographer List
     */
    this.photographerList = [];
  }
  /**
   *
   * @property {function} addPhotographer ajoute l'objet creer avec la classe Photographer dans le tableau photographerList
   * @returns {Array}
   
   */
  addPhotographer(photographer) {
    this.photographerList.push(photographer);
  }

  /**
   * @property {function} getPhotographerList  retourne un nouveaux tableau  avec les photographes triés selon le tag selectionner par l'uttilisateur
   }}
   * @param  {...tags} tags 
   * @returns {Array}
   */
  getPhotographerList(...tags) {
    let returnedList = [];

    if (tags.length !== 0) {
      this.photographerList.forEach((photograph) => {
        photograph.tags.forEach((tag) => {
          if (tags.includes(tag) && !returnedList.includes(photograph)) {
            returnedList.push(photograph);
          }
        });
      });
    } else {
      returnedList = this.photographerList.slice();
    }

    return returnedList;
  }

  // retourne un tableau qui contient tous les tags
  getAllTags() {
    const tags = [];

    this.photographerList.forEach((photographer) => {
      photographer.tags.forEach((tag) => {
        tags.push(tag);
      });
    });

    return new Set(tags);
  }
  // retourne un photographe depuis son ID
  getPhotographerById(id) {
    for (const photographer of this.photographerList) {
      if (photographer.id === id) {
      }
    }
  }
}
