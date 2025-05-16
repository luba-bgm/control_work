export class HabitPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.currentFilter = 'all';

    this.view.bindAddHabit(this.handleAddHabit.bind(this));
    this.view.bindHandlers({
      onToggle: this.handleToggleHabit.bind(this),
      onDelete: this.handleDeleteHabit.bind(this),
      onEdit: this.handleEditHabit.bind(this),
      onFilter: this.handleFilterChange.bind(this),
    });

    this.updateView();
  }

  updateView() {
    const habits = this.model.getHabits(this.currentFilter);
    this.view.updateHabits(habits); 
  }

  handleAddHabit(name) {
    this.model.addHabit(name);
    this.updateView();
  }

  handleToggleHabit(id) {
    this.model.toggleHabit(id);
    this.updateView();
  }

  handleDeleteHabit(id) {
    this.model.deleteHabit(id);
    this.updateView();
  }

  handleEditHabit(id, newName) {
    this.model.updateHabit(id, newName);
    this.updateView();
  }

  handleFilterChange(filter) {
    this.currentFilter = filter;
    this.updateView();
  }
}
