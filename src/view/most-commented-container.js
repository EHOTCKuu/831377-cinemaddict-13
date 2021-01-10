import AbstractView from './abstract-view';

const createMostCommentedContainer = () => {
  return `<section class="films-list films-list--extra films-list--commented">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container"></div>
  </section>`;
};

export default class MostCommentedContainer extends AbstractView {

  getTemplate() {
    return createMostCommentedContainer();
  }
}
