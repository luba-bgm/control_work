import AbstractComponent from '../framework/view/abstract-component.js';
import HabitItemComponent from './habit-item-component.js';

export default class HabitListComponent extends AbstractComponent {
  constructor() {
    super();
    this._toggleHandler = null;
    this._deleteHandler = null;
    this._editHandler = null;
  }

  get template() {
    return `<div class="habit-list"></div>`;
  }

  setToggleHandler(handler) {
    this._toggleHandler = handler;
  }

  setDeleteHandler(handler) {
    this._deleteHandler = handler;
  }

  setEditHandler(handler) {
    this._editHandler = handler;
  }

  update(habits) {
    const container = this.element;
    container.innerHTML = '';

    habits.forEach(habit => {
      const itemComponent = new HabitItemComponent(habit);

      itemComponent.setToggleHandler(this._toggleHandler);
      itemComponent.setDeleteHandler(this._deleteHandler);
      itemComponent.setEditHandler(this._editHandler);

      container.appendChild(itemComponent.element);
    });
  }
}
