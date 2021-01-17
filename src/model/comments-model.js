import Observer from './observer';
import {ModelMethod} from "../const.js";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
    this._observers = {
      deleteComment: [],
      addComment: []
    };
  }

  setComments(comments) {
    this._comments = comments;
  }

  getComments() {
    return this._comments;
  }

  deleteComment(commentToDelete) {
    this._comments = this._comments.filter((comment) => (comment.id !== commentToDelete.id));
    this.notify(ModelMethod.DELETE_COMMENT, commentToDelete);
  }

  addComment(commentToAdd) {
    this._comments.push(commentToAdd);
    this.notify(ModelMethod.ADD_COMMENT, commentToAdd);
  }
}
