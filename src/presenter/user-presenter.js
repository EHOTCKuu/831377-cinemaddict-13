import {render, remove, replace} from '../util.js';
import UserIconView from '../view/user-icon';
import {ModelMethod} from '../const';

export default class UserPresenter {
  constructor(userModel) {
    this._userModel = userModel;
    this._onUserRaitingChange = this._onUserRaitingChange.bind(this);
    this._userModel.addObserver(ModelMethod.UPDATE_USER_RAITING, this._onUserRaitingChange);
  }

  init(container = this._container) {
    this._container = container;
    const prevUserView = this._userView;

    this._userView = new UserIconView(this._userModel.getRaiting());

    if (!prevUserView) {
      render(this._container, this._userView);
      return;
    }

    replace(this._userView, prevUserView);
    remove(prevUserView);
  }

  _getWatchedFilmsNumber(films) {
    return films.reduce((acc, currentFilm) => acc + currentFilm.isInHistory, 0);
  }

  _onUserRaitingChange() {
    this.init();
  }
}
