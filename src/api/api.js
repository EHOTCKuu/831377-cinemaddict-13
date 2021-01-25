const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}${url}`,
        {method, body, headers}
    )
    .then(this._checkStatus)
    .catch((err) => {
      throw err;
    });
  }

  _checkStatus(response) {
    if (response.status < SuccessStatusRange.MIN || response.status > SuccessStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  _toJSON(response) {
    return response.json();
  }

  getFilms() {
    return this._load({url: `movies`})
    .then(this._toJSON)
    .then((films) => films.map(this.adaptFilmToClient));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.adaptFilmToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(this._toJSON)
    .then(this.adaptFilmToClient);
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
    .then(this._toJSON)
    .then((comments) => comments.map(this._adaptCommentToClient));
  }

  addComment(comment, filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(this._adaptCommentToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(this._toJSON)
    .then((response) => {
      return {
        comments: response.comments.map(this._adaptCommentToClient),
        movie: this.adaptFilmToClient(response.movie)
      };
    });
  }

  deleteComment(filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.DELETE
    });
  }

  sync(data) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(this._toJSON);
  }

  adaptFilmToClient(film) {
    const adaptedFilm = {
      id: film.id,
      comments: film.comments,
      title: film.film_info.title,
      originalTitle: film.film_info.alternative_title,
      raiting: film.film_info.total_rating,
      poster: film.film_info.poster,
      age: film.film_info.age_rating,
      director: film.film_info.director,
      writers: film.film_info.writers,
      actors: film.film_info.actors,
      date: new Date(film.film_info.release.date),
      country: film.film_info.release.release_country,
      duration: film.film_info.runtime,
      genre: film.film_info.genre,
      description: film.film_info.description,
      isInWatchlist: film.user_details.watchlist,
      isInHistory: film.user_details.already_watched,
      watchingDate: new Date(film.user_details.watching_date),
      isFavourite: film.user_details.favorite,
      isSynced: true
    };

    return adaptedFilm;
  }

  adaptFilmToServer(film) {
    const adaptedFilm =
        {
          "id": film.id,
          "comments": film.comments,
          "film_info": {
            "title": film.title,
            "alternative_title": film.originalTitle,
            "total_rating": film.raiting,
            "poster": film.poster,
            "age_rating": film.age,
            "director": film.director,
            "writers": film.writers,
            "actors": film.actors,
            "release": {
              "date": new Date(film.date).toISOString(),
              "release_country": film.country
            },
            "runtime": film.duration,
            "genre": film.genre,
            "description": film.description
          },
          "user_details": {
            "watchlist": film.isInWatchlist,
            "already_watched": film.isInHistory,
            "watching_date": film.watchingDate.toISOString(),
            "favorite": film.isFavourite,
          }
        };

    return adaptedFilm;
  }

  _adaptCommentToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          text: comment.comment
        }
    );
    delete adaptedComment.comment;

    return adaptedComment;
  }

  _adaptCommentToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          comment: comment.text
        }
    );
    delete adaptedComment.text;
    return adaptedComment;
  }
}
