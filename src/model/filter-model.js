import Observer from './observer';
import {Category, ModelMethod} from "../const";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._filter = Category.All;
    this._observers = {
      updateFilter: []
    };
  }

  getFilter() {
    return this._filter;
  }

  updateFilter(filterType) {
    this._filter = filterType;

    this.notify(ModelMethod.UPDATE_FILTER, this._filter);
  }
}
