import Observer from './observer';
import {ModelMethod} from '../const';

export default class FilmModel extends Observer {
  constructor(api) {
    super();
    this._api = api;
    this._films = [];
    this._observers = {
      updateFilm: [],
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

  updateFilm(elementToUpdate) {
    this._api.updateFilm(elementToUpdate).then((updatedFilm) => {
      const index = this._films.findIndex((element) => element.id === updatedFilm.id);
      this._films.splice(index, 1, updatedFilm);

      this.notify(ModelMethod.UPDATE_FILM, updatedFilm);
    });
  }
}
