import AbstractView from './abstract-view';

const createSiteMenu = (films) => {
  let inWatchlist = 0;
  let inHistory = 0;
  let favourites = 0;
  films.forEach((film) => {
    if (film.isInWatchlist) {
      inWatchlist++;
    }
    if (film.isInHistory) {
      inHistory++;
    }
    if (film.isFavourite) {
      favourites++;
    }
  });
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${inWatchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${inHistory}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favourites}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createSiteMenu(this._films);
  }
}
