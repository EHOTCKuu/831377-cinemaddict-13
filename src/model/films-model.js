import Observer from './observer';
import {ModelMethod} from '../const';

export default class FilmModel extends Observer {
  constructor(api) {
    super();
    this._api = api;
    this._films = [];
    this._observers = {
      updateFilm: [],
      updateFilmWithRerender: [],
      setFilms: []
    };
  }

  setFilms(films) {
    this._films = films.slice();
    this.notify(ModelMethod.SET_FILMS, films);
  }

  getFilms() {
    return this._films;
  }

  replaceFilm(filmToUpdate, isNotificationNeeded = true) {
    const index = this._films.findIndex((element) => element.id === filmToUpdate.id);
    this._films.splice(index, 1, filmToUpdate);

    const modelMethod = isNotificationNeeded ? ModelMethod.UPDATE_FILM : ModelMethod.UPDATE_FILM_WITH_RERENDER;
    this.notify(modelMethod, filmToUpdate);
  }

  updateFilm(elementToUpdate, isNotificationNeeded = true) {
    return this._api.updateFilm(elementToUpdate).then((updatedFilm) => {
      this.replaceFilm(updatedFilm, isNotificationNeeded);
    });
  }
}
