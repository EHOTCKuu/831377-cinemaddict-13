import {render, remove} from '../util.js';
import {UserAction} from "../const.js";

import CommentView from '../view/comment-view';


const DeleteButtonText = {
  COMMON: `Delete`,
  DISABLED: `Deleting...`
};

const SHAKE_DURATION = 500;
export default class Comment {
  constructor(commentsChangeCb, comment) {
    this._comment = comment;
    this._commentsChange = commentsChangeCb;
    this._isCommentDisabled = false;

    this._deleteComment = this._deleteComment.bind(this);
    this.shake = this.shake.bind(this);
  }

  init(container) {

    this._commentView = new CommentView(this._comment);

    this._commentView.setDeleteButtonClickHandler(this._deleteComment);


    render(container, this._commentView);
  }

  destroy() {
    remove(this._commentView);
  }

  _deleteComment() {
    this.changeDeleteButtonState();
    this._commentsChange(UserAction.DELETE_COMMENT, this._comment);
  }

  changeDeleteButtonState() {
    const deleteButton = this._commentView.getElement().querySelector(`.film-details__comment-delete`);
    deleteButton.textContent = this._isCommentDisabled ? DeleteButtonText.COMMON : DeleteButtonText.DISABLED;
    deleteButton.disabled = !this._isCommentDisabled;
    this._isCommentDisabled = !this._isCommentDisabled;
  }

  shake() {
    const comment = this._commentView.getElement();
    comment.style.animation = `shake ${SHAKE_DURATION / 1000}s`;
    setTimeout(() => {
      comment.style.animation = ``;
    }, SHAKE_DURATION);
  }
}
