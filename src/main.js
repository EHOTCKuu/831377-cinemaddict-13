import {userStar} from "./view/userStar.js";
import {menu} from "./view/menu.js";
import {card} from "./view/card.js";
import {show} from "./view/show.js";
import {popup} from "./view/popup.js";
import {topFilm} from "./view/topFilm.js";

const CARD_COUNT = 5;
const CARD_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`header`);

render(siteHeader, userStar(), `beforeend`);

const siteMain = document.querySelector(`.main`);

render(siteMain, menu(), `beforeend`);

render(siteMain, show(), `beforeend`);

const filmList = document.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmList, card(), `beforeend`);
}

const films = siteMain.querySelector(`.films`);

render(films, topFilm(), `beforeend`);

const filmExtra = document.querySelectorAll(`.films-list--extra .films-list__container`);

for (let i = 0; i < filmExtra.length; i++) {
  for (let j = 0; j < CARD_EXTRA_COUNT; j++) {
    render(filmExtra[i], card(), `beforeend`);
  }
}

render(siteMain, popup(), `beforeend`);
