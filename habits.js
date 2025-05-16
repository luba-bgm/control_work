import { HabitPresenter } from './presenter/habit-presenter.js';
import { HabitModel } from './model/habit-model.js';
import HabitView from './view/habit-view.js';
import { render } from './framework/render.js';

const model = new HabitModel();
const view = new HabitView();

const container = document.getElementById('app');

if (!container) {
  throw new Error('Container element not found');
}

render(view, container);
view.showList(); 

const presenter = new HabitPresenter(model, view);
