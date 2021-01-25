import {UserAction, ModelMethod, Category, SiteState, RenderPosition} from "../const.js";
import {remove, render, replace} from '../util';

import SiteMenuView from '../view/site-menu';

export default class Filters {
  constructor(filmsModel, filterModel, changeSiteStateCb) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._changeSiteState = changeSiteStateCb;
    this._siteMenuView = null;
    this._currentFilter = Category.All;
    this._isShowingFilms = true;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._changeFilter = this._changeFilter.bind(this);
    this._onFilmChange = this._onFilmChange.bind(this);
    this._onStatsButtonClick = this._onStatsButtonClick.bind(this);

    this._filterModel.addObserver(ModelMethod.UPDATE_FILTER, this._changeFilter);
    this._filmsModel.addObserver(ModelMethod.UPDATE_FILM, this._onFilmChange);
    this._filmsModel.addObserver(ModelMethod.SET_FILMS, this._onFilmChange);
    this._filmsModel.addObserver(ModelMethod.UPDATE_FILM_WITH_RERENDER, this._onFilmChange);
  }

  init(container = this.container) {
    this.container = container;

    const prevFiltersView = this._siteMenuView;

    this._siteMenuView = new SiteMenuView(this._filmsModel.getFilms(), this._filterModel.getFilter());
    this._filtersButtons = Array.from(this._siteMenuView.getElement().querySelectorAll(`.main-navigation__item`));
    this._siteMenuView.setFilterChangeHandler(this._onFilterChange);
    this._siteMenuView.setStatsButtonClickHandler(this._onStatsButtonClick);

    if (!prevFiltersView) {
      render(this.container, this._siteMenuView, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._siteMenuView, prevFiltersView);
    remove(prevFiltersView);
  }

  _onViewAction(eventType, update) {
    switch (eventType) {
      case UserAction.UPDATE_FILTER:
        if (this._currentFilter === update && this._isShowingFilms) {
          return;
        }
        this._filterModel.updateFilter(update);
    }
  }

  _onFilmChange() {
    this.init();
  }

  _changeFilter(newFilter) {

    if (!this._isShowingFilms) {
      this._siteMenuView.getElement().querySelector(`.main-navigation__additional`).classList.remove(`main-navigation__additional--active`);

      this._isShowingFilms = true;

      this._changeSiteState(SiteState.TO_MOVIES);
    }

    this._filtersButtons.forEach((filterButton) => {
      if (filterButton.dataset.filterType === newFilter) {
        filterButton.classList.add(`main-navigation__item--active`);
        return;
      }
      filterButton.classList.remove(`main-navigation__item--active`);
    });

    this._currentFilter = newFilter;
  }

  _onFilterChange(filterType) {
    this._onViewAction(UserAction.UPDATE_FILTER, filterType);
  }

  _onStatsButtonClick() {
    if (!this._isShowingFilms) {
      return;
    }
    this._filtersButtons.forEach((filterButton) => {
      filterButton.classList.remove(`main-navigation__item--active`);
    });

    this._siteMenuView.getElement().querySelector(`.main-navigation__additional`).classList.add(`main-navigation__additional--active`);

    this._isShowingFilms = false;

    this._changeSiteState(SiteState.TO_STATS);
  }
}
