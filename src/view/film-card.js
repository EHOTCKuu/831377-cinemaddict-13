import AbstractView from './abstract-view';

import {getDuration} from '../util';

const createFilmCard = (film) => {

  const getActiveClass = (property) => {
    return (film[property] === true) ? ` film-card__controls-item--active` : ``;
  };

  const {title, raiting, date, duration, genre, poster, description, comments} = film;
  const clippedDescription = (description.length > 140) ? `${description.slice(0, 139)}...` : description;

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${raiting}</p>
  <p class="film-card__info">
    <span class="film-card__year">${new Date(date).getFullYear()}</span>
    <span class="film-card__duration">${getDuration(duration)}</span>
    <span class="film-card__genre">${genre.join(` `)}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${clippedDescription}</p>
  <a class="film-card__comments">${comments.length} ${comments.length === 1 ? `comment` : `comments`}</a>
  <div class="film-card__controls">
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${getActiveClass(`isInWatchlist`)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${getActiveClass(`isInHistory`)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite${getActiveClass(`isFavourite`)}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._onPosterClick = this._onPosterClick.bind(this);
    this._onTitleClick = this._onTitleClick.bind(this);
    this._onCommentsClick = this._onCommentsClick.bind(this);
    this._onToWatchListButtonClick = this._onToWatchListButtonClick.bind(this);
    this._onToFavouritesButtonClick = this._onToFavouritesButtonClick.bind(this);
    this._onWatchedButtonClick = this._onWatchedButtonClick.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _onPosterClick(evt) {
    evt.preventDefault();
    this._callback.posterClick(evt);
  }

  setPosterClickHandler(cb) {
    this._callback.posterClick = cb;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._onPosterClick);
  }

  _onTitleClick(evt) {
    evt.preventDefault();
    this._callback.titleClick(evt);
  }

  setTitleClickHandler(cb) {
    this._callback.titleClick = cb;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._onTitleClick);
  }

  _onCommentsClick(evt) {
    evt.preventDefault();
    this._callback.commentsClick(evt);
  }


  _onToWatchListButtonClick(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setToWatchListButtonClickHandler(cb) {
    this._callback.watchListClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onToWatchListButtonClick);
  }

  _onToFavouritesButtonClick(evt) {
    evt.preventDefault();
    this._callback.favouritesClick();
  }

  setToFavouritesButtonClickHandler(cb) {
    this._callback.favouritesClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onToFavouritesButtonClick);
  }

  _onWatchedButtonClick(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedButtonClickHandler(cb) {
    this._callback.watchedClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onWatchedButtonClick);
  }

  setCommentsClickHandler(cb) {
    this._callback.commentsClick = cb;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsClick);
  }
}
