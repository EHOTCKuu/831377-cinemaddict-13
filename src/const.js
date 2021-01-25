export const ENTER_KEY_CODE = 13;

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
  UPDATE_USER_RAITING: `updateRaiting`,
  DELETE_COMMENT: `deleteComment`
};

export const Category = {
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

export const UserRaiting = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`
};

export const SiteState = {
  TO_MOVIES: `TO_MOVIES`,
  TO_STATS: `TO_STATS`
};

export const StatsPeriod = {
  ALL: `all-time`,
  TODAY: `day`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const FilmCardContainer = {
  RAITED: `raited`,
  COMMENTED: `commented`
};

export const RenderPosition = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`
};
