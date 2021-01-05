export const menu = (filter) => {
  const {name, count} = filter;

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${count}</span></a>
    <a href="#${name}" class="main-navigation__item">History <span class="main-navigation__item-count">${count}</span></a>
    <a href="#${name}" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${count}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
