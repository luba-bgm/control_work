export default class AbstractComponent {
  #element = null;
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error("Can't instantiate AbstractComponent directly.");
    }
  }

  get template() {
    throw new Error("Abstract method 'template' must be implemented.");
  }

  get element() {
    if (!this.#element) {
      this.#element = this._createElement(this.template);
    }
    return this.#element;
  }

  _createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template.trim();
    return newElement.firstElementChild;
  }

  removeElement() {
    this.#element = null;
  }
}
