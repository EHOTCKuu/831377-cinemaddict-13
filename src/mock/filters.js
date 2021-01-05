const isFilmWatchList = (addWatchList) => {
  return Object.values(addWatchList).some(Boolean);
};

const isFilmAlredyWatched = (alredyWatched) => {
  return Object.values(alredyWatched).some(Boolean);
};

const isFilmFavorite = (favorite) => {
  return Object.values(favorite).some(Boolean);
};

const filmToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films
  .filter((film) => isFilmWatchList(film.alredyWatched)).length,
  history: (films) => films
    .filter((film) => isFilmAlredyWatched(film.alredyWatched)).length,
  favorites: (films) => films
  .filter((film) => isFilmFavorite(film.alredyWatched)).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(films),
    };
  });
};
