import {getRandomInteger} from '../util.js';

export default class User {
  constructor() {
    this._raiting = `Movie Buff`;
    this._avatar = `./images/bitmap@2x.png`;
    this._favourites = new Array(getRandomInteger(0, 15));
    this._watchlist = new Array(getRandomInteger(0, 15));
    this._history = new Array(getRandomInteger(0, 15));
  }

  get userStats() {
    return {
      raiting: this._raiting,
      avatar: this._avatar,
      favourites: this._favourites,
      watchlist: this._watchlist,
      history: this._history
    };
  }
}
