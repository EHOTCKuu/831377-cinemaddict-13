import {render, isKeyPressed} from './util.js';
import FilmPopupView from './view/film-popup';
import FilmCardView from './view/film-card';

const pageBody = document.querySelector(`body`);

export const renderCard = (container, film) => {
  const card = new FilmCardView(film).getElement();

  const closePopup = () => {
    const popup = pageBody.querySelector(`.film-details`);
    popup.remove();
    popup.querySelector(`.film-details__close-btn`).removeEventListener(`click`, onPopupCrossClick);
    document.removeEventListener(`keyup`, onPopupEscPress);
    pageBody.classList.remove(`hide-overflow`);
  };

  const onCardClick = (evt) => {
    evt.preventDefault();
    if (pageBody.querySelector(`.film-details`)) {
      closePopup();
    }
    const popup = new FilmPopupView(film).getElement();
    render(pageBody, popup);
    popup.querySelector(`.film-details__close-btn`).addEventListener(`click`, onPopupCrossClick);
    document.addEventListener(`keyup`, onPopupEscPress);
    pageBody.classList.add(`hide-overflow`);
  };

  const onPopupEscPress = (evt) => {
    isKeyPressed(evt, closePopup, `Escape`);
  };

  const onPopupCrossClick = () => {
    closePopup();
  };

  card.querySelector(`.film-card__poster`).addEventListener(`click`, onCardClick);
  card.querySelector(`.film-card__title`).addEventListener(`click`, onCardClick);
  card.querySelector(`.film-card__comments`).addEventListener(`click`, onCardClick);

  render(container, card);
};
