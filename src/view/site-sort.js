import AbstractView from './abstract-view';
import {SortType} from "../const.js";

const createSiteSort = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.RAITING}">Sort by rating</a></li>
</ul>`;
};

export default class SiteSort extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteSort();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(cb) {
    this._callback.sortTypeChange = cb;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
