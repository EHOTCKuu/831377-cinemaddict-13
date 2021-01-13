import UserIconView from '../view/user-icon';
import SiteMenuView from '../view/site-menu';
import SiteSortView from '../view/site-sort';
import SiteCatalogView from '../view/films-catalog';
import ShowMoreButtonView from '../view/show-more-button';
import TopRaitedContainerView from '../view/top-raited-container';
import MostCommentedContainerView from '../view/most-commented-container';
import {render, remove, updateElement} from '../util.js';
import {SortType} from "../const.js";
import FilmCardPresenter from './film-card-presenter';

export default class Catalog {
  constructor() {
    this._siteSortView = new SiteSortView();
    this._showMoreButton = new ShowMoreButtonView();
    this._topRaitedContainerView = new TopRaitedContainerView();
    this._mostCommentedContainerView = new MostCommentedContainerView();
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
    this._onFilmChange = this._onFilmChange.bind(this);
    this._onUserPropertyChange = this._onUserPropertyChange.bind(this);
  }

  init(films, user, container) {
    this._films = films;
    this._user = user;
    this._siteMain = container;
    this._presenterGroupNames = Object.keys(this._filmCardPresenterGroups);
    this._userIconView = new UserIconView(this._user.avatar, this._user.raiting);
    this._siteMenuView = new SiteMenuView(this._films);
    this._sourcedFilms = films.slice();

    render(this._siteMain.parentElement.querySelector(`.header`), this._userIconView);

    render(this._siteMain, this._siteMenuView, `afterbegin`);

    this._renderCatalog();
  }

  _onFilmChange(filmToUpdate) {
    this._films = updateElement(this._films, filmToUpdate);
    this._updatePresenters(filmToUpdate);
  }

  _updatePresenters(film) {
    this._presenterGroupNames.forEach((presenterGroup) => {
      if (this._filmCardPresenterGroups[presenterGroup][film.id]) {
        this._filmCardPresenterGroups[presenterGroup][film.id].init(film);
      }
    });
  }

  _onUserPropertyChange(property, newPropertyArr, film) {
    this._user[property] = newPropertyArr;
    this._updatePresenters(film);
  }

  _closeAllPopups() {
    this._presenterGroupNames.forEach((presenterGroup) => {
      Object.values(this._filmCardPresenterGroups[presenterGroup]).forEach((presenter) => presenter.closePopup());
    });
  }

  _clearCatalog() {
    this._presenterGroupNames.forEach((presenterGroup) => {
      Object.values(this._filmCardPresenterGroups[presenterGroup]).forEach((presenter) => presenter.destroy());
      this._filmCardPresenterGroups[presenterGroup] = {};
    });
    this._renderedFilms = this._FILMS_CARDS_NUMBER;
    remove(this._showMoreButton);
  }

  _renderNoFilms() {
    render(this._siteMain, this._siteCatalog);
  }

  _renderSort() {
    render(this._siteMain, this._siteSortView);
    this._siteSortView.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderCard(container, film, block) {
    const filmPresenter = new FilmCardPresenter(this._onFilmChange, this._onUserPropertyChange, this._closeAllPopups);
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

  _changeSort(type) {
    switch (type) {
      case SortType.RAITING:
        this._films = this._filmsSortedByRaiting;
        break;
      case SortType.DEFAULT:
        this._films = this._sourcedFilms;
        break;
      case SortType.DATE:

        if (!this._filmsSortedByDate) {
          this._filmsSortedByDate = this._films.slice().sort((previous, current) => {
            return current.date - previous.date;
          });
        }
        this._films = this._filmsSortedByDate;
        break;
    }
    this._currentSortType = type;
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
    this._changeSort(type);
    this._clearCatalog();
    this._renderCatalog();
  }

  _renderFilmCards() {
    for (let i = 0; i < Math.min(this._FILMS_CARDS_NUMBER, this._films.length); i++) {
      this._renderCard(this._filmsListContainer, this._films[i]);
    }
  }

  _onShowMoreButtonClick() {
    this._films.slice(this._renderedFilms, this._renderedFilms + this._FILMS_STEP_LOAD).forEach((film) => this._renderCard(this._filmsListContainer, film));

    this._renderedFilms += this._FILMS_STEP_LOAD;

    if (this._renderedFilms >= this._films.length) {
      remove(this._showMoreButton);
    }
  }

  _renderShowMoreButton() {
    if (this._films.length > Math.max(this._FILMS_STEP_LOAD, this._FILMS_CARDS_NUMBER)) {

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
    this._filmsSortedByRaiting = this._films.slice().sort((previous, current) => {
      return current.raiting - previous.raiting;
    });
    for (let i = 0; i < Math.min(this._FILMS_TOP_RAITED_CARDS_NUMBER, this._filmsSortedByRaiting.length); i++) {
      this._renderCard(topRaitedFilmsContainer, this._filmsSortedByRaiting[i], `raited`);
    }
  }

  _renderMostCommentedFilms() {
    const mostCommentedFilmsContainer = this._siteCatalog.getElement().querySelector(`.films-list--commented .films-list__container`);
    const filmsSortedByComments = this._films.slice().sort((previous, current) => {
      return current.comments.length - previous.comments.length;
    });
    for (let i = 0; i < Math.min(this._FILMS_MOST_COMMENTED_CARDS_NUMBER, filmsSortedByComments.length); i++) {
      this._renderCard(mostCommentedFilmsContainer, filmsSortedByComments[i], `commented`);
    }
  }

  _renderCatalog() {
    if (!(this._siteCatalog)) {
      this._siteCatalog = new SiteCatalogView();
    }

    if (this._films.length < 1) {
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
