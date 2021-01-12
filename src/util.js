import AbstractView from './view/abstract-view';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place = `beforeend`) => {

  if (container instanceof AbstractView) {
    container = container.getElement();
  }
  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (place) {
    case `beforeend`:
      container.append(element);
      break;
    case `afterbegin`:
      container.prepend(element);
      break;
  }
};

export const isKeyPressed = (evt, cb, keyName) => {
  if (evt.key === keyName) {
    cb();
  }
};

export const updateElement = (elementsArr, elementToUpdate) => {
  const index = elementsArr.findIndex((element) => element.id === elementToUpdate.id);

  if (index === -1) {
    return elementsArr;
  }

  return [
    ...elementsArr.slice(0, index), elementToUpdate, ...elementsArr.slice(index + 1)
  ];
};

export const updateUserPropertyArray = (idArr, filmId) => {
  const index = idArr.findIndex((id) => id === filmId);

  if (index === -1) {
    idArr.push(filmId);
    return idArr;
  }

  idArr.splice(index, 1);
  return idArr;
};

export const replace = (newElement, oldElement) => {
  if (newElement instanceof AbstractView) {
    newElement = newElement.getElement();
  }
  if (oldElement instanceof AbstractView) {
    oldElement = oldElement.getElement();
  }

  const parentElement = oldElement.parentElement;

  if (parentElement === null || newElement === null || oldElement === null) {
    throw new Error(`One of elements doesn't exist in case of replacement`);
  }

  parentElement.replaceChild(newElement, oldElement);
};

export const remove = (element) => {
  if (!(element instanceof AbstractView)) {
    throw new Error(`Can remove view components only`);
  }
  element.getElement().remove();
  element.removeElement();
};
