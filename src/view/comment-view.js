import AbstractView from './abstract-view';
import dayjs from "dayjs";
import he from "he";

const createCommentTemplate = (comment) => {
  const {text, author, date: commentDate, emotion} = comment;

  const getFormattedTime = (date) => {
    const difference = (+new Date() - +new Date(date)) / 60000;
    const hoursDiff = difference / 60;
    const daysDiff = hoursDiff / 24;
    const monthDiff = daysDiff / 30;
    if (difference < 1) {
      return `now`;
    } else if (difference >= 1 && difference < 5) {
      return `a few minutes ago`;
    } else if (difference >= 5 && difference < 60) {
      return `${Math.floor(difference)} minutes ago`;
    } else if (difference > 60 && difference < 61) {
      return `1 hour ago`;
    } else if (difference >= 61 && hoursDiff < 24) {
      return `${Math.floor(hoursDiff)} hours ago`;
    } else if (hoursDiff > 24 && hoursDiff < 48) {
      return `1 day ago`;
    } else if (hoursDiff >= 48 && daysDiff < 30) {
      return `${Math.floor(daysDiff)} days ago`;
    } else if (daysDiff >= 30 && daysDiff < 60) {
      return `1 month ago`;
    } else if (daysDiff >= 60 && monthDiff < 12) {
      return `${Math.floor(monthDiff)} month ago`;
    } else if (monthDiff >= 12 && monthDiff < 24) {
      return `1 year ago`;
    } else if (monthDiff > 24) {
      return `${Math.floor(monthDiff / 12)} years ago`;
    } else {
      return dayjs(commentDate).format(`YYYY/MM/DD HH:mm`);
    }
  };

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
<p class="film-details__comment-text">${he.encode(text)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${he.encode(author)}</span>
      <span class="film-details__comment-day">${getFormattedTime(commentDate)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};


export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    this._callback.deleteClick(evt);
  }

  setDeleteButtonClickHandler(cb) {
    this._callback.deleteClick = cb;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._onDeleteButtonClick);
  }
}
