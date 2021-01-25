import dayjs from "dayjs";

import {EMOTIONS, Category} from '../const.js';
import {getDuration} from '../util';

import Smart from './smart-view';

const createFilmPopup = (data) => {
  const {title, originalTitle, raiting, date, duration, genre, poster, description, comments, director, writers, actors, country, age, userComment, chosenSmile, isInWatchlist, isInHistory, isFavourite} = data;

  const genres = genre.map((value, index) => {
    return `<span class="film-details__genre">${genre[index]}</span>`;
  }).join(``);

  const emojiRadio = EMOTIONS.map((value, index) => {
    const emotion = EMOTIONS[index];
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}"${(emotion === chosenSmile) ? ` checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`;
  }).join(``);

  const smileImg = chosenSmile ? `<img src="./images/emoji/${chosenSmile}.png" width="55" height="55" alt="emoji-${chosenSmile}">` : ``;

  const commentValue = userComment || ``;

  const getFilmStatusClass = (property) => {
    return property ? ` checked` : ``;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="${title}">
          <p class="film-details__age">${age}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${raiting}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(date).format(`DD MMMM YYYY`)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getDuration(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genres}</span></td>
            </tr>
          </table>
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${getFilmStatusClass(isInWatchlist)}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${getFilmStatusClass(isInHistory)}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${getFilmStatusClass(isFavourite)}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list"></ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${smileImg}
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentValue}</textarea>
          </label>
          <div class="film-details__emoji-list">
            ${emojiRadio}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

const SHAKE_DURATION = 500;

export default class FilmPopup extends Smart {
  constructor(film, onCardUpdate, renderCommentsCb) {
    super();
    this._onCardUpdate = onCardUpdate;
    this._renderComments = renderCommentsCb;
    this._data = this._parseFilmTodata(film);
    this._isCommentFormDisabled = false;
    this._isOnlineListening = false;
    this._onCrossClick = this._onCrossClick.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
    this._onEmojiInputClick = this._onEmojiInputClick.bind(this);
    this._onWatchlistButtonClick = this._onWatchlistButtonClick.bind(this);
    this._onHistoryButtonClick = this._onHistoryButtonClick.bind(this);
    this._onFavouritesButtonClick = this._onFavouritesButtonClick.bind(this);
    this.onCommentFormError = this.onCommentFormError.bind(this);
    this._setHandlers();
  }

  getTemplate() {
    return createFilmPopup(this._data);
  }

  _parseFilmTodata(film) {
    return Object.assign(
        {},
        film,
        {
          userComment: ``,
          chosenSmile: ``,
          scroll: null
        }
    );
  }

  _parseDataToFilm(data) {
    data = Object.assign({}, data);
    delete data.userComment;
    delete data.chosenSmile;
    delete data.scroll;
    return data;
  }

  _onCommentChange(evt) {
    if (evt.target.value.length && !this._isOnlineListening) {
      this._isOnlineListening = true;
      window.addEventListener(`offline`, this.onCommentFormError);
    }
    if (evt.target.value.length === 0 && this._isOnlineListening) {
      this._isOnlineListening = false;
      window.removeEventListener(`offline`, this.onCommentFormError);
    }
    evt.preventDefault();
    this.updateData({userComment: evt.target.value}, true);
  }

  _onEmojiInputClick(evt) {
    if (evt.target.tagName !== `INPUT` || evt.target.value === this._data.chosenSmile) {
      return;
    }
    this._getScroll();
    this.updateData({chosenSmile: evt.target.value});
    this._renderComments(true);
  }

  changeComment(sentComments) {
    this._getScroll();
    this.updateData({comments: sentComments});
  }

  _onWatchlistButtonClick() {
    this._onCardUpdate(Category.WATCHLIST);
    this._data.isInWatchlist = !this._data.isInWatchlist;
  }

  _onHistoryButtonClick() {
    this._onCardUpdate(Category.HISTORY);
    this._data.isInHistory = !this._data.isInHistory;
  }

  _onFavouritesButtonClick() {
    this._onCardUpdate(Category.FAVOURITES);
    this._data.isInFavourites = !this._data.isInFavourites;
  }

  _setHandlers() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._onCommentChange);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._onEmojiInputClick);
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, this._onWatchlistButtonClick);
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._onHistoryButtonClick);
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._onFavouritesButtonClick);
  }

  _restoreHandlers() {
    this._setHandlers();
    this.setCrossClickHandler(this._callback.crossClick);
  }

  getNewCommentData() {
    if (!this._data.chosenSmile || !this._data.userComment) {
      return null;
    }
    return {
      text: this._data.userComment,
      emotion: this._data.chosenSmile
    };
  }

  clearInput() {
    this._data.chosenSmile = null;
    this._data.userComment = null;
    this._isCommentFormDisabled = false;
  }

  scrollToY() {
    this.getElement().scroll(0, this._scroll);
  }

  _getScroll() {
    this._scroll = this.getElement().scrollTop;
  }

  _onCrossClick(evt) {
    evt.preventDefault();
    this._callback.crossClick(evt);
  }

  setCrossClickHandler(cb) {
    this._callback.crossClick = cb;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCrossClick);
  }

  disableCommentInputs() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = !this._isCommentFormDisabled;
    Array.from(this.getElement().querySelectorAll(`.film-details__emoji-item`)).forEach((input) => {
      input.disabled = !this._isCommentFormDisabled;
    });
    this._isCommentFormDisabled = !this._isCommentFormDisabled;
  }

  onCommentFormError() {
    const commentForm = this.getElement().querySelector(`.film-details__new-comment`);
    commentForm.style.animation = `shake ${SHAKE_DURATION / 1000}s`;
    setTimeout(() => {
      commentForm.style.animation = ``;
    }, SHAKE_DURATION);
  }
}
