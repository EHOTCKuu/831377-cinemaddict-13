import AbstractView from './abstract-view';

const createFilmsCatalog = (isCatalogEmpty) => {
  return `<section class="films">
  <section class="films-list">
    ${isCatalogEmpty ?
    `<h2 class="films-list__title">There are no movies in our database</h2>` :
    `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>`}
  </section>`;
};

export default class SiteCatalog extends AbstractView {
  constructor(isEmpty) {
    super();
    this._isEmpty = isEmpty;
  }

  getTemplate() {
    return createFilmsCatalog(this._isEmpty);
  }
}
