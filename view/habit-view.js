import AbstractComponent from '../framework/view/abstract-component.js';
import HabitListComponent from './habit-list-component.js';

export default class HabitView extends AbstractComponent {
  constructor() {
    super();
    this._listComponent = new HabitListComponent();
  }

  get template() {
    return `
      <div class="container">
        <h1>Ежедневный Трекер Привычек</h1>
        <div class="habit-form">
          <form id="habit-form">
            <input type="text" id="habit-name" placeholder="Название привычки" required />
            <button type="submit">Добавить привычку</button>
          </form>
        </div>
        <div class="habit-filter">
          <select id="status-filter">
            <option value="all">Все</option>
            <option value="active">Активные</option>
            <option value="completed">Выполненные</option>
          </select>
        </div>
        <div id="habit-list-container"></div>
      </div>
    `;
  }

  renderList(container) {
    container.appendChild(this._listComponent.element);
  }

  bindAddHabit(handler) {
    this.element.querySelector('#habit-form').addEventListener('submit', e => {
      e.preventDefault();
      const input = this.element.querySelector('#habit-name');
      const value = input.value.trim();
      if (value) {
        handler(value);
        input.value = '';
      }
    });
  }

  bindFilterChange(handler) {
    this.element.querySelector('#status-filter').addEventListener('change', e => {
      handler(e.target.value);
    });
  }

  bindToggleHabit(handler) {
    this._listComponent.setToggleHandler(handler);
  }

  bindDeleteHabit(handler) {
    this._listComponent.setDeleteHandler(handler);
  }

  bindEditHabit(handler) {
    this._listComponent.setEditHandler(handler);
  }

  updateHabits(habits) {
    this._listComponent.update(habits);
  }

  bindHandlers(handlers) {
  this.bindToggleHabit(handlers.onToggle);
  this.bindDeleteHabit(handlers.onDelete);
  this.bindEditHabit(handlers.onEdit);
  this.bindFilterChange(handlers.onFilter);
  }

  showList() {
  const listContainer = this.element.querySelector('#habit-list-container');
  this.renderList(listContainer);
}
}
