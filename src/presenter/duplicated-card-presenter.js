import {render} from '../util.js';
import FilmCardView from '../view/film-card';
import {replace, remove} from '../util.js';
import AbstractFilmCardPresenter from './abstract-card-presenter';


export default class DuplicatedCardPresenter extends AbstractFilmCardPresenter {
  constructor(filmChangeCb, userChangeCb, parentPresenter, closePopupsCb) {
    super(filmChangeCb, userChangeCb, closePopupsCb);
    this._parentPresenter = parentPresenter;
  }

  init(container = this._container) {
    this._container = container;
    this._user = this._parentPresenter._user;
    this._film = this._parentPresenter._film;

    this._prevFilmCardView = this._card;

    this._card = new FilmCardView(this._film, this._user);

    this._setEventListeners();

    if (this._prevFilmCardView === null) {
      render(this._container, this._card);
      return;
    }

    if (this._container.contains(this._prevFilmCardView.getElement())) {
      replace(this._card, this._prevFilmCardView);
    }

    remove(this._prevFilmCardView);
  }
}
