import {CATEGORIES} from "../const.js";

import AbstractView from './abstract-view';

const createSiteMenu = (films, currentSort) => {
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

  const getActiveHtmlClass = (elementFilterType) => {
    return (elementFilterType === currentSort) ? ` main-navigation__item--active` : ``;
  };

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
  <a href="#all" class="main-navigation__item${getActiveHtmlClass(CATEGORIES.All)}" data-filter-type="${CATEGORIES.All}">All movies</a>
  <a href="#watchlist" class="main-navigation__item${getActiveHtmlClass(CATEGORIES.WATCHLIST)}" data-filter-type="${CATEGORIES.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${inWatchlist}</span></a>
  <a href="#history" class="main-navigation__item${getActiveHtmlClass(CATEGORIES.HISTORY)}" data-filter-type="${CATEGORIES.HISTORY}">History <span class="main-navigation__item-count">${inHistory}</span></a>
  <a href="#favorites" class="main-navigation__item${getActiveHtmlClass(CATEGORIES.FAVOURITES)}" data-filter-type="${CATEGORIES.FAVOURITES}">Favorites <span class="main-navigation__item-count">${favourites}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(films, currentFilter) {
    super();
    this._currentFilter = currentFilter;
    this._FilterChangeHandler = this._FilterChangeHandler.bind(this);
    this._films = films;
  }

  _FilterChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterChangeHandler(cb) {
    this._callback.filterTypeChange = cb;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._FilterChangeHandler);
  }

  getTemplate() {
    return createSiteMenu(this._films, this._currentFilter);
  }
}
