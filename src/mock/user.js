export default class User {
  constructor() {
    this._raiting = `Movie Buff`;
    this._avatar = `./images/bitmap@2x.png`;
  }

  get userStats() {
    return {
      raiting: this._raiting,
      avatar: this._avatar
    };
  }
}
