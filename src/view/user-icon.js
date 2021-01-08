import {createElement} from '../util.js';

const createUserIcon = (avatar, raiting) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${raiting}</p>
  <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
</section>`;
};

export default class UserIcon {
  constructor(avatar, raiting) {
    this._element = null;
    this._userRaiting = raiting;
    this._userAvater = avatar;
  }

  getTemplate() {
    return createUserIcon(this._userAvater, this._userRaiting);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
