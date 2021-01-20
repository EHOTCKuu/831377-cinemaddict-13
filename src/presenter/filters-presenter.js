import {UserAction, ModelMethod, CATEGORIES} from "../const.js";
import {remove, render, replace} from '../util';

import SiteMenuView from '../view/site-menu';

export default class Filters {
  constructor(filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._siteMenuView = null;
    this._currentFilter = CATEGORIES.All;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._changeFilter = this._changeFilter.bind(this);
    this._onFilmChange = this._onFilmChange.bind(this);

    this._filterModel.addObserver(ModelMethod.UPDATE_FILTER, this._changeFilter);
    this._filmsModel.addObserver(ModelMethod.UPDATE_FILM, this._onFilmChange);
    this._filmsModel.addObserver(ModelMethod.SET_FILMS, this._onFilmChange);
    this._filmsModel.addObserver(ModelMethod.UPDATE_FILM_WITH_RERENDER, this._onFilmChange);
  }

  init(container = this.container) {
    this.container = container;

    const prevFiltersView = this._siteMenuView;

    this._siteMenuView = new SiteMenuView(this._filmsModel.getFilms(), this._filterModel.getFilter());
    this._siteMenuView.setFilterChangeHandler(this._onFilterChange);

    if (!prevFiltersView) {
      render(this.container, this._siteMenuView, `afterbegin`);
      return;
    }

    replace(this._siteMenuView, prevFiltersView);
    remove(prevFiltersView);
  }

  _onViewAction(eventType, update) {
    switch (eventType) {
      case UserAction.UPDATE_FILTER:
        if (this._currentFilter === update) {
          return;
        }
        this._filterModel.updateFilter(update);
    }
  }

  _onFilmChange() {
    this.init();
    this._filtersButtons = null;
  }

  _changeFilter(newFilter) {

    if (!this._filtersButtons) {
      this._filtersButtons = Array.from(this._siteMenuView.getElement().querySelectorAll(`.main-navigation__item`));
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
}
