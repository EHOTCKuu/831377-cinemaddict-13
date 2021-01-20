import {render, remove, replace} from '../util.js';
import UserIconView from '../view/user-icon';
import {UserRaiting, ModelMethod} from '../const';

export default class UserPresenter {
  constructor(filmsModel) {
    this._filmsModel = filmsModel;

    this._onFilmsChange = this._onFilmsChange.bind(this);

    this._filmsModel.addObserver(ModelMethod.SET_FILMS, this._onFilmsChange);
    this._filmsModel.addObserver(ModelMethod.UPDATE_FILM, this._onFilmsChange);
    this._filmsModel.addObserver(ModelMethod.UPDATE_FILM_WITH_RERENDER, this._onFilmsChange);
  }

  init(container = this._container) {
    this._container = container;
    const prevUserView = this._userView;

    const watchedFilms = this._getWatchedFilmsNumber(this._filmsModel.getFilms());
    const userRaiting = this._getUserRaiting(watchedFilms);

    if (this._userRaiting === userRaiting) {
      return;
    }

    this._userRaiting = userRaiting;

    this._userView = new UserIconView(this._userRaiting);

    if (!prevUserView) {
      render(this._container, this._userView);
      return;
    }

    replace(this._userView, prevUserView);
    remove(prevUserView);
  }

  _getWatchedFilmsNumber(films) {
    let watched = 0;
    films.forEach((film) => {
      if (film.isInHistory) {
        watched++;
      }
    });
    return watched;
  }

  _getUserRaiting(watchedFilms) {
    if (watchedFilms > 20) {
      return UserRaiting.MOVIE_BUFF;
    } else if (watchedFilms > 10 && watchedFilms <= 20) {
      return UserRaiting.FAN;
    } else {
      return UserRaiting.NOVICE;
    }
  }

  _onFilmsChange() {
    this.init();
  }
}
