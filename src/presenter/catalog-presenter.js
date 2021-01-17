import {render, remove, filter} from '../util.js';
import {SortType, UserAction, ModelMethod} from "../const.js";

import UserIconView from '../view/user-icon';
import SiteMenuView from '../view/site-menu';
import SiteSortView from '../view/site-sort';
import SiteCatalogView from '../view/films-catalog';
import ShowMoreButtonView from '../view/show-more-button';
import TopRaitedContainerView from '../view/top-raited-container';
import MostCommentedContainerView from '../view/most-commented-container';
import NoFilmsView from '../view/no-film';

import FilmCardPresenter from './film-card-presenter';

export default class Catalog {
  constructor(filmsmodel, filterModel, commentsModel) {
    this._filmsModel = filmsmodel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._showMoreButton = new ShowMoreButtonView();
    this._topRaitedContainerView = new TopRaitedContainerView();
    this._mostCommentedContainerView = new MostCommentedContainerView();
    this._onViewAction = this._onViewAction.bind(this);
    this._onfilmUpdate = this._onfilmUpdate.bind(this);
    this._onFilterUpdate = this._onFilterUpdate.bind(this);
    this._filmsModel.addObserver(ModelMethod.UPDATE_FILM, this._onfilmUpdate);
    this._filterModel.addObserver(ModelMethod.UPDATE_FILTER, this._onFilterUpdate);
    this._siteSortView = null;
    this._noFilmsView = null;
    this._userIconView = null;
    this._siteMenuView = null;
    this._currentSortType = SortType.DEFAULT;
    this._siteCatalog = null;
    this._filmCardPresenterGroups = {
      catalog: {},
      raited: {},
      commented: {}
    };
    this._closeAllPopups = this._closeAllPopups.bind(this);
    this._FILMS_CARDS_NUMBER = 5;
    this._FILMS_STEP_LOAD = 5;
    this._FILMS_TOP_RAITED_CARDS_NUMBER = 2;
    this._FILMS_MOST_COMMENTED_CARDS_NUMBER = 2;
    this._renderedFilms = this._FILMS_CARDS_NUMBER;
    this._filmsSortedByDate = null;

    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  init(user, container) {
    this._user = user;
    this._siteMain = container;
    this._presenterGroupNames = Object.keys(this._filmCardPresenterGroups);
    this._userIconView = new UserIconView(this._user.avatar, this._user.raiting);
    this._siteMenuView = new SiteMenuView(this._getFilms());

    render(this._siteMain.parentElement.querySelector(`.header`), this._userIconView);

    this._renderCatalog();
  }

  _updatePresenters(film) {
    this._presenterGroupNames.forEach((presenterGroup) => {
      if (this._filmCardPresenterGroups[presenterGroup][film.id]) {
        this._filmCardPresenterGroups[presenterGroup][film.id].init(film);
      }
    });
  }

  _onFilterUpdate() {
    this._clearCatalog({resetRenderedFilms: true, resetSort: true});
    this._renderCatalog();
  }

  _closeAllPopups() {
    this._presenterGroupNames.forEach((presenterGroup) => {
      Object.values(this._filmCardPresenterGroups[presenterGroup]).forEach((presenter) => presenter.closePopup());
    });
  }

  _clearCatalog({resetRenderedFilms = false, resetSort = false} = {}) {
    this._presenterGroupNames.forEach((presenterGroup) => {
      Object.values(this._filmCardPresenterGroups[presenterGroup]).forEach((presenter) => presenter.destroy());
      this._filmCardPresenterGroups[presenterGroup] = {};
    });
    remove(this._showMoreButton);
    remove(this._siteSortView);
    remove(this._noFilmsView);
    remove(this._showMoreButton);

    if (resetRenderedFilms) {
      this._renderedFilms = this._FILMS_CARDS_NUMBER;
    } else {
      this._renderedFilms = Math.min(this._renderedFilms, this._getFilms().length);
    }

    if (resetSort) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderNoFilms() {
    this._noFilmsView = new NoFilmsView();
    render(this._siteMain, this._noFilmsView);
  }

  _getFilms(sortType) {
    const chosenFilter = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[chosenFilter](films);

    const chosenSortType = sortType || this._currentSortType;
    switch (chosenSortType) {
      case SortType.DATE:
        return filteredFilms.sort((previous, current) => {
          return current.date - previous.date;
        });
      case SortType.RAITING:
        return filteredFilms.sort((previous, current) => {
          return current.raiting - previous.raiting;
        });
      case SortType.COMMENTS:
        return filteredFilms.sort((previous, current) => {
          return current.comments.length - previous.comments.length;
        });
      default:
        return filteredFilms;
    }
  }

  _onViewAction(eventType, update) {
    switch (eventType) {
      case UserAction.UPDATE_FILM_CATEGORY:
        this._filmsModel.updateFilm(update);
        break;
    }
  }

  _onfilmUpdate(updatedFilm) {
    this._updatePresenters(updatedFilm);
  }

  _renderSort() {
    if (this._siteSortView !== null) {
      this._siteSortView = null;
    }
    this._siteSortView = new SiteSortView(this._currentSortType);
    render(this._siteMain, this._siteSortView);
    this._siteSortView.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderCard(container, film, block) {
    const filmPresenter = new FilmCardPresenter(this._commentsModel, this._onViewAction, this._closeAllPopups);
    filmPresenter.init(film, container);
    switch (block) {
      case `raited`:
        this._filmCardPresenterGroups.raited[film.id] = filmPresenter;
        break;
      case `commented`:
        this._filmCardPresenterGroups.commented[film.id] = filmPresenter;
        break;
      default:
        this._filmCardPresenterGroups.catalog[film.id] = filmPresenter;
    }
  }

  _onSortTypeChange(type) {
    if (this._currentSortType === type) {
      return;
    }
    if (!this._sortButtons) {
      this._sortButtons = Array.from(this._siteSortView.getElement().querySelectorAll(`.sort__button`));
    }
    this._sortButtons.forEach((sortButton) => {
      if (sortButton.dataset.sortType === type) {
        sortButton.classList.add(`sort__button--active`);
        return;
      }
      sortButton.classList.remove(`sort__button--active`);
    });
    this._currentSortType = type;
    this._clearCatalog({resetRenderedFilms: true});
    this._renderCatalog();
  }

  _renderFilmCards() {
    const films = this._getFilms();
    for (let i = 0; i < Math.min(this._renderedFilms, films.length); i++) {
      this._renderCard(this._filmsListContainer, films[i]);
    }
  }

  _onShowMoreButtonClick() {
    this._getFilms().slice(this._renderedFilms, this._renderedFilms + this._FILMS_STEP_LOAD).forEach((film) => this._renderCard(this._filmsListContainer, film));

    this._renderedFilms += this._FILMS_STEP_LOAD;

    if (this._renderedFilms >= this._getFilms().length) {
      remove(this._showMoreButton);
    }
  }

  _renderShowMoreButton() {
    if (this._getFilms().length > Math.max(this._FILMS_STEP_LOAD, this._FILMS_CARDS_NUMBER)) {

      render(this._siteCatalog.getElement().querySelector(`.films-list`), this._showMoreButton);

      this._showMoreButton.setClickHandler(this._onShowMoreButtonClick);
    }
  }

  _renderTopRaitedContainer() {
    render(this._siteCatalog, this._topRaitedContainerView);
  }

  _renderMostCommentedContainer() {
    render(this._siteCatalog, this._mostCommentedContainerView);
  }

  _renderTopRaitedFilms() {
    const topRaitedFilmsContainer = this._siteCatalog.getElement().querySelector(`.films-list--extra .films-list__container`);
    for (let i = 0; i < Math.min(this._FILMS_TOP_RAITED_CARDS_NUMBER, this._getFilms(SortType.RAITING).length); i++) {
      this._renderCard(topRaitedFilmsContainer, this._getFilms(SortType.RAITING)[i], `raited`);
    }
  }

  _renderMostCommentedFilms() {
    const mostCommentedFilmsContainer = this._siteCatalog.getElement().querySelector(`.films-list--commented .films-list__container`);
    for (let i = 0; i < Math.min(this._FILMS_MOST_COMMENTED_CARDS_NUMBER, this._getFilms(SortType.COMMENTS).length); i++) {
      this._renderCard(mostCommentedFilmsContainer, this._getFilms(SortType.COMMENTS)[i], `commented`);
    }
  }

  _renderCatalog() {
    if (!(this._siteCatalog)) {
      this._siteCatalog = new SiteCatalogView();
    }

    if (this._getFilms().length < 1) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    render(this._siteMain, this._siteCatalog);

    this._filmsListContainer = this._siteCatalog.getElement().querySelector(`.films-list__container`);
    this._renderFilmCards();

    this._renderShowMoreButton();

    this._renderTopRaitedContainer();
    this._renderMostCommentedContainer();
    this._renderTopRaitedFilms();
    this._renderMostCommentedFilms();
  }
}
