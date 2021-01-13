import AbstractView from './abstract-view';

const createFilmCard = (film) => {

  const getActiveClass = (property) => {
    return (film[property] === true) ? ` film-card__controls-item--active` : ``;
  };

  const {title, raiting, date, duration, genre, poster, description, comments} = film;
  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${raiting}</p>
  <p class="film-card__info">
    <span class="film-card__year">${date.getFullYear()}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre.join(` `)}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
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
    this._toWatchListButtonClickHandler = this._toWatchListButtonClickHandler.bind(this);
    this._toFavouritesButtonClickHandler = this._toFavouritesButtonClickHandler.bind(this);
    this._watchedButtonClickHandler = this._watchedButtonClickHandler.bind(this);
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick(evt);
  }

  setPosterClickHandler(cb) {
    this._callback.posterClick = cb;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._posterClickHandler);
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick(evt);
  }

  setTitleClickHandler(cb) {
    this._callback.titleClick = cb;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._titleClickHandler);
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick(evt);
  }


  _toWatchListButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setToWatchListButtonClickHandler(cb) {
    this._callback.watchListClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._toWatchListButtonClickHandler);
  }

  _toFavouritesButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.favouritesClick();
  }

  setToFavouritesButtonClickHandler(cb) {
    this._callback.favouritesClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._toFavouritesButtonClickHandler);
  }

  _watchedButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedButtonClickHandler(cb) {
    this._callback.watchedClick = cb;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedButtonClickHandler);
  }

  setCommentsClickHandler(cb) {
    this._callback.commentsClick = cb;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._commentsClickHandler);
  }
}
