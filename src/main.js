import {userStar} from "./view/userStar.js";
import {menu} from "./view/menu.js";
import {card} from "./view/card.js";
import {show} from "./view/show.js";
import {popup} from "./view/popup.js";
import {topFilm} from "./view/topFilm.js";
import {generateFilm} from "./mock/films";
import {generateFilter} from "./mock/filters";

const CARD_COUNT = 20;
const CARD_EXTRA_COUNT = 2;
const CARD_COUNT_STEP = 5;

const filmsElements = new Array(CARD_COUNT).fill().map(generateFilm);
const filmsExtraElements = new Array(CARD_EXTRA_COUNT).fill().map(generateFilm);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`header`);

render(siteHeader, userStar(), `beforeend`);

const siteMain = document.querySelector(`.main`);
const filters = generateFilter(filmsElements);

render(siteMain, menu(filters), `beforeend`);

render(siteMain, show(), `beforeend`);

const filmList = document.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmsElements.length, CARD_COUNT_STEP); i++) {
  render(filmList, card(filmsElements[i]), `beforeend`);
}

if (filmsElements.length > CARD_COUNT_STEP) {
  const showMoreButton = document.querySelector(`.films-list__show-more`);
  let renderedFilmCount = CARD_COUNT_STEP;

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsElements
    .slice(renderedFilmCount, renderedFilmCount + CARD_COUNT_STEP)
    .forEach((film) => render(filmList, card(film), `beforeend`));

    renderedFilmCount += CARD_COUNT_STEP;

    if (renderedFilmCount >= filmsElements) {
      showMoreButton.remove();
    }
  });
}

const films = siteMain.querySelector(`.films`);

render(films, topFilm(), `beforeend`);

const filmExtra = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < filmExtra.length; i++) {
  for (let j = 0; j < CARD_EXTRA_COUNT; j++) {
    render(filmExtra[i], card(filmsExtraElements[j]), `beforeend`);
  }
};

render(siteMain, popup(filmsElements[0]), `beforeend`);
