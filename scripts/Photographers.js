/**
 * Photographer class module
 * @module Photographer-class
 */

/**
 * Class pour créer un nouveaux photographe
 */
/**
 * Détails concernant le photographe
 * @param {string} name nom du photographe
 * @param {number} id   Id du photographe
 * @param {string} city  Ville du photographe
 * @param {string} country  Pays du photographe
 * @param {array} tags      Tags du photographe
 * @param {string} tagline Tagline du photographe
 * @param {number} price   Prix par impression du photographe
 * @param {string} portrait Lien vers la photo du photographe
 */

export class Photographers {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    /**
     * @property {string} name nom du photographe
     */
    this.name = name;
    /**
     * @property {number} id Id du photographe
     */
    this.id = id;
    /**
     * @property {string} city ville du Photographe
     */
    this.city = city;
    /**
     * @property {string} country Pays du photographe
     */
    this.country = country;
    /**
     * @property {Array} Tags tags du photographe
     */
    this.tags = tags;
    /**
     * @property {string} tagline Tagline du photographe
     */
    this.tagline = tagline;
    /**
     * @property {number} price Prix par impression du photographe
     */
    this.price = price;
    /**
     * @property {string} portrait lien vers la photo du photographe
     */
    this.portrait = portrait;
  }

  /**
   *@name getFolderName
   * @returns le nom du dossier pour les photos  chaque photographes
   */
  getFolderName() {
    return this.name.toLowerCase().replace(" ", "");
  }
}
