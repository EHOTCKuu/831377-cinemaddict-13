import FilmCardView from '../view/film-card';
import {replace, remove, render, isKeyPressed} from '../util.js';
import FilmPopupView from '../view/film-popup';

export default class CardPresenter {
  constructor(filmChangeCb, userChangeCb, closePopupsCb) {
    this._closePopups = closePopupsCb;

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

  init(film, container = this._container) {
    this._film = film;
    this._container = container;

    const prevFilmCardView = this._card;

    this._card = new FilmCardView(this._film);

    this._card.setPosterClickHandler(this._onCardPosterClick);
    this._card.setTitleClickHandler(this._onCardTitleClick);
    this._card.setCommentsClickHandler(this._onCardCommentsClick);
    this._card.setToWatchListButtonClickHandler(this._onCardWatchlistClick);
    this._card.setWatchedButtonClickHandler(this._onCardToHistoryClick);
    this._card.setToFavouritesButtonClickHandler(this._onCardFavouritesClick);

    if (prevFilmCardView === null) {
      render(this._container, this._card);
      return;
    }

    if (this._container.contains(prevFilmCardView.getElement())) {
      replace(this._card, prevFilmCardView);
    }

    remove(prevFilmCardView);
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

  _onCardWatchlistClick() {
    this._filmChange(Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist
        }
    ));
  }

  _onCardFavouritesClick() {
    this._filmChange(Object.assign(
        {},
        this._film,
        {
          isFavourite: !this._film.isFavourite
        }
    ));
  }

  _onCardToHistoryClick() {
    this._filmChange(Object.assign(
        {},
        this._film,
        {
          isInHistory: !this._film.isInHistory
        }
    ));
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
    isKeyPressed(evt, this.closePopup, `Escape`);
  }

  _onPopupCrossClick() {
    this.closePopup();
  }
}
