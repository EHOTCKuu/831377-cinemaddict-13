import AbstractView from './abstract-view';

const createTopRaitedContainer = () => {
  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2><div class="films-list__container"></div></section>`;
};

export default class TopRaitedContainer extends AbstractView {

  getTemplate() {
    return createTopRaitedContainer();
  }
}
