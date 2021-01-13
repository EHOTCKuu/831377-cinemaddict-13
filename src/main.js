import FilmsNumberView from './view/films-number';
import MockFilm from './mock/films';
import UserMock from './mock/user';
import {render} from './util.js';
import CatalogPresenter from './presenter/catalog-presenter';

const MOCK_FILMS = 15;
const AVAILABLE_FILMS = `123 456`;

const films = new Array(MOCK_FILMS).fill().map(() => {
  return new MockFilm().getNewFilm();
});
const user = new UserMock().userStats;
const presenter = new CatalogPresenter();
presenter.init(films, user);

const siteFooter = document.querySelector(`.footer`);
const footerStats = siteFooter.querySelector(`.footer__statistics`);
render(footerStats, new FilmsNumberView(AVAILABLE_FILMS));
