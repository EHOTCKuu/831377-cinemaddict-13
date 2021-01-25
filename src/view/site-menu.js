import {Category} from "../const.js";

import AbstractView from './abstract-view';

const createSiteMenu = (films, currentSort) => {
  const stats = films.reduce((acc, current) => {
    return {
      inWatchlist: acc.inWatchlist + current.isInWatchlist,
      inHistory: acc.inHistory + current.isInHistory,
      favourites: acc.favourites + current.isFavourite,
    };
  }, {
    inWatchlist: 0,
    inHistory: 0,
    favourites: 0
  });

  const getActiveHtmlClass = (elementFilterType) => {
    return (elementFilterType === currentSort) ? ` main-navigation__item--active` : ``;
  };

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item${getActiveHtmlClass(Category.All)}" data-filter-type="${Category.All}">All movies</a>
    <a href="#watchlist" class="main-navigation__item${getActiveHtmlClass(Category.WATCHLIST)}" data-filter-type="${Category.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${stats.inWatchlist}</span></a>
    <a href="#history" class="main-navigation__item${getActiveHtmlClass(Category.HISTORY)}" data-filter-type="${Category.HISTORY}">History <span class="main-navigation__item-count">${stats.inHistory}</span></a>
    <a href="#favorites" class="main-navigation__item${getActiveHtmlClass(Category.FAVOURITES)}" data-filter-type="${Category.FAVOURITES}">Favorites <span class="main-navigation__item-count">${stats.favourites}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(films, currentFilter) {
    super();
    this._films = films;
    this._currentFilter = currentFilter;
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onStatsButtonClick = this._onStatsButtonClick.bind(this);
  }

  _onFilterChange(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterChangeHandler(cb) {
    this._callback.filterTypeChange = cb;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._onFilterChange);
  }

  getTemplate() {
    return createSiteMenu(this._films, this._currentFilter);
  }

  _onStatsButtonClick(evt) {
    evt.preventDefault();
    this._callback.siteStateChange(evt);
  }

  setStatsButtonClickHandler(cb) {
    this._callback.siteStateChange = cb;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._onStatsButtonClick);
  }
}
