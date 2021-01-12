import {render, isKeyPressed} from '../util.js';
import FilmPopupView from '../view/film-popup';
import {remove, updateUserPropertyArray} from '../util.js';

export default class AbstractFilmCardPresenter {
  constructor(filmChangeCb, userChangeCb, closePopupsCb) {
    if (new.target === AbstractFilmCardPresenter) {
      throw new Error(`Can't create Abstract class`);
    }

    this._card = null;
    this._filmChange = filmChangeCb;
    this._userChange = userChangeCb;
    this._closePopups = closePopupsCb;
    this._pageBody = document.querySelector(`body`);
    this._popup = null;

    this.closePopup = this.closePopup.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._onCardPosterClick = this._onCardPosterClick.bind(this);
    this._onCardTitleClick = this._onCardTitleClick.bind(this);
    this._onCardCommentsClick = this._onCardCommentsClick.bind(this);
    this._onPopupEscPress = this._onPopupEscPress.bind(this);
    this._onPopupCrossClick = this._onPopupCrossClick.bind(this);
    this._onCardWatchlistClick = this._onCardWatchlistClick.bind(this);
    this._onCardToHistoryClick = this._onCardToHistoryClick.bind(this);
    this._onCardFavouritesClick = this._onCardFavouritesClick.bind(this);
  }

  destroy() {
    remove(this._card);
  }

  closePopup() {
    if (this._popup) {
      remove(this._popup);
      document.removeEventListener(`keyup`, this._onPopupEscPress);
      this._pageBody.classList.remove(`hide-overflow`);
    }
  }

  _openPopup(evt) {
    evt.preventDefault();
    this._closePopups();
    this._popup = new FilmPopupView(this._film);
    render(this._pageBody, this._popup);
    this._popup.setCrossClickHandler(this._onPopupCrossClick);
    document.addEventListener(`keyup`, this._onPopupEscPress);
    this._pageBody.classList.add(`hide-overflow`);
  }

  _setEventListeners() {
    this._card.setPosterClickHandler(this._onCardPosterClick);
    this._card.setTitleClickHandler(this._onCardTitleClick);
    this._card.setCommentsClickHandler(this._onCardCommentsClick);
    this._card.setToWatchListButtonClickHandler(this._onCardWatchlistClick);
    this._card.setWatchedButtonClickHandler(this._onCardToHistoryClick);
    this._card.setToFavouritesButtonClickHandler(this._onCardFavouritesClick);
  }

  _onCardWatchlistClick() {
    this._userChange(`watchlist`, updateUserPropertyArray(this._user.watchlist, this._film.id), this._film);
  }

  _onCardFavouritesClick() {
    this._userChange(`favourites`, updateUserPropertyArray(this._user.favourites, this._film.id), this._film);
  }

  _onCardToHistoryClick() {
    this._userChange(`history`, updateUserPropertyArray(this._user.history, this._film.id), this._film);
  }

  _onCardPosterClick(evt) {
    this._openPopup(evt);
  }

  _onCardTitleClick(evt) {
    this._openPopup(evt);
  }

  _onCardCommentsClick(evt) {
    this._openPopup(evt);
  }

  _onPopupEscPress(evt) {
    isKeyPressed(evt, this.closePopup, `Esc`);
  }

  _onPopupCrossClick() {
    this.closePopup();
  }
}
