import AbstractView from './abstract-view';

const createUserIcon = (avatar, raiting) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${raiting}</p>
  <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
</section>`;
};

export default class UserIcon extends AbstractView {
  constructor(avatar, raiting) {
    super();
    this._userRaiting = raiting;
    this._userAvatar = avatar;
  }

  getTemplate() {
    return createUserIcon(this._userAvatar, this._userRaiting);
  }
}
