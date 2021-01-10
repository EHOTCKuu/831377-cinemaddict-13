import {render, isKeyPressed} from './util.js';
import FilmPopupView from './view/film-popup';
import FilmCardView from './view/film-card';

const pageBody = document.querySelector(`body`);
let popup;

export const renderCard = (container, film) => {
  const card = new FilmCardView(film);

  const closePopup = () => {
    if (pageBody.querySelector(`.film-details`)) {
      popup.getElement().remove();
      document.removeEventListener(`keyup`, onPopupEscPress);
      pageBody.classList.remove(`hide-overflow`);
    }
  };

  const openPopup = (evt) => {
    evt.preventDefault();
    closePopup();
    popup = new FilmPopupView(film);
    render(pageBody, popup);
    popup.setCrossClickHandler(onPopupCrossClick);
    document.addEventListener(`keyup`, onPopupEscPress);
    pageBody.classList.add(`hide-overflow`);
  };

  const onCardPosterClick = (evt) => {
    openPopup(evt);
  };

  const onCardTitleClick = (evt) => {
    openPopup(evt);
  };

  const onCardCommentsClick = (evt) => {
    openPopup(evt);
  };

  const onPopupEscPress = (evt) => {
    isKeyPressed(evt, closePopup, `Escape`);
  };

  const onPopupCrossClick = () => {
    closePopup();
  };

  card.setPosterClickHandler(onCardPosterClick);
  card.setTitleClickHandler(onCardTitleClick);
  card.setCommentsClickHandler(onCardCommentsClick);

  render(container, card);
};
