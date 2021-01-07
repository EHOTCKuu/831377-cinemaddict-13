import {createElement} from '../util.js';

const createFilmCard = (film) => {
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
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
