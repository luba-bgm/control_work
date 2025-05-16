import AbstractComponent from '../framework/view/abstract-component.js';

export default class HabitItemComponent extends AbstractComponent {
  constructor(habit) {
    super();
    this._habit = habit;
    this._toggleHandler = null;
    this._deleteHandler = null;
    this._editHandler = null;
    this._isEditing = false;
  }

  get template() {
    return `
      <div class="habit-item">
        <input type="checkbox" ${this._habit.completed ? 'checked' : ''}>
        <span class="habit-name" style="text-decoration: ${this._habit.completed ? 'line-through' : 'none'}">${this._habit.name}</span>
        <button class="edit-btn">Редактировать</button>
        <button class="delete-btn">Удалить</button>
      </div>
    `;
  }

  setToggleHandler(handler) {
    this._toggleHandler = handler;
    this._setHandlers();
  }

  setDeleteHandler(handler) {
    this._deleteHandler = handler;
    this._setHandlers();
  }

  setEditHandler(handler) {
    this._editHandler = handler;
    this._setHandlers();
  }

  _setHandlers() {
    if (!this.element) return;

    const checkbox = this.element.querySelector('input[type="checkbox"]');
    const editBtn = this.element.querySelector('.edit-btn');
    const deleteBtn = this.element.querySelector('.delete-btn');
    const nameSpan = this.element.querySelector('.habit-name');

    checkbox.onclick = () => {
      if (this._toggleHandler) this._toggleHandler(this._habit.id);
    };

    deleteBtn.onclick = () => {
      if (this._deleteHandler) this._deleteHandler(this._habit.id);
    };

    editBtn.onclick = () => {
      if (!this._isEditing) {
        this._startEditing(nameSpan, editBtn);
      } else {
        this._saveEditing(nameSpan, editBtn);
      }
    };
  }

  _startEditing(nameSpan, editBtn) {
    this._isEditing = true;
    this._input = document.createElement('input');
    this._input.type = 'text';
    this._input.value = this._habit.name;
    this.element.replaceChild(this._input, nameSpan);
    editBtn.textContent = 'Сохранить';
  }

  _saveEditing(nameSpan, editBtn) {
    const newName = this._input.value.trim();
    if (newName && this._editHandler) {
      this._editHandler(this._habit.id, newName);
    }
    this._isEditing = false;
    this.element.replaceChild(nameSpan, this._input);
    nameSpan.textContent = newName || this._habit.name;
    editBtn.textContent = 'Редактировать';
  }
}
