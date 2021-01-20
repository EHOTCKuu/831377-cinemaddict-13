export const UserAction = {
  DELETE_COMMENT: `DELETE_COMMENT`,
  ADD_COMMENT: `ADD_COMMENT`,
  UPDATE_FILM_CATEGORY: `UPDATE_FILM_CATEGORY`,
  UPDATE_FILTER: `UPDATE_FILTER`,
  REPLACE_FILM: `REPLACE_FILM`,
  UPDATE_FILM_CATEGORY_WITH_RERENDER: `UPDATE_FILM_CATEGORY_WITH_RERENDER`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const ModelMethod = {
  UPDATE_FILM: `updateFilm`,
  UPDATE_FILM_WITH_RERENDER: `updateFilmWithRerender`,
  UPDATE_FILTER: `updateFilter`,
  ADD_COMMENT: `addComment`,
  SET_FILMS: `setFilms`,
  DELETE_COMMENT: `deleteComment`
};

export const CATEGORIES = {
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  All: `all`,
  FAVOURITES: `favourites`
};

export const SortType = {
  DEFAULT: `default`,
  COMMENTS: `comments`,
  DATE: `date`,
  RAITING: `raiting`
};

export const EMOTIONS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

export const EMOTION_PICS = {
  smile: `./images/emoji/smile.png`,
  sleeping: `./images/emoji/sleeping.png`,
  puke: `./images/emoji/puke.png`,
  angry: `./images/emoji/angry.png`
};

export const UserRaiting = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`
};
