import {render} from './util.js';

import FilmsNumberView from './view/films-number';
import CatalogPresenter from './presenter/catalog-presenter';
import FiltersPresenters from './presenter/filters-presenter';

import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import CommentsModel from './model/comments-model';

import UserMock from './mock/user';

import Api from './api';

const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;
const AUTHORIZATION = `Basic er883jdzbdw`;
const AVAILABLE_FILMS = `123 456`;

const filterModel = new FilterModel();
const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel(api);
const commentsModel = new CommentsModel(api);

const siteMain = document.querySelector(`.main`);

const user = new UserMock().userStats;
const filtersPresenter = new FiltersPresenters(filmsModel, filterModel);
filtersPresenter.init(siteMain);

const catalogPresenter = new CatalogPresenter(filmsModel, filterModel, commentsModel);
catalogPresenter.init(user, siteMain);

const siteFooter = document.querySelector(`.footer`);
const footerStats = siteFooter.querySelector(`.footer__statistics`);
render(footerStats, new FilmsNumberView(AVAILABLE_FILMS));

api.getFilms()
.then((films) => filmsModel.setFilms(films))
.catch(() => {
  filmsModel.setFilms([]);
});
