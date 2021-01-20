import Observer from './observer';
import {ModelMethod} from "../const.js";

export default class CommentsModel extends Observer {
  constructor(api) {
    super();
    this._api = api;
    this._comments = [];
    this._observers = {
      deleteComment: [],
      addComment: []
    };
  }

  getComments(filmId, isOldNeeded) {
    if (isOldNeeded) {
      return new Promise((resolve) => resolve(this._comments));
    }
    return this._api.getComments(filmId)
    .then((comments) => {
      this._comments = comments;
      return this._comments;
    });
  }

  deleteComment(commentToDelete) {
    return this._api.deleteComment(commentToDelete.id)
    .then(() => {
      this._comments = this._comments.filter((comment) => (comment.id !== commentToDelete.id));
      this.notify(ModelMethod.DELETE_COMMENT, commentToDelete);
    });
  }

  addComment(commentToAdd, filmId) {
    return this._api.addComment(commentToAdd, filmId)
    .then((response) => {
      this._comments = response.comments;
      this.notify(ModelMethod.ADD_COMMENT, response);
    });
  }

  getErrorComment() {
    return {
      id: `!!!`,
      author: `site`,
      date: new Date(),
      emotion: `angry`,
      text: `Не удалось загрузить комментарии.`
    };
  }
}
