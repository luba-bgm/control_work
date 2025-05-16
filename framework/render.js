import AbstractComponent from '../framework/view/abstract-component.js';

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractComponent)) {
    throw new Error('Can render only components extending AbstractComponent.');
  }
  if (!container) {
    throw new Error('Container element doesn\'t exist');
  }
  container.insertAdjacentElement(place, component.element);
}

export function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template.trim();
  return newElement.firstElementChild;
}
