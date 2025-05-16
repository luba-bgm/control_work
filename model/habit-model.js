export class HabitModel {
  constructor() {
    this.habits = [
      { id: 1, name: 'Утренняя зарядка', completed: false },
      { id: 2, name: 'Чтение книги', completed: true },
    ];
  }

  getHabits(filter = 'all') {
    if (filter === 'completed') {
      return this.habits.filter(habit => habit.completed);
    }
    if (filter === 'active') {
      return this.habits.filter(habit => !habit.completed);
    }
    return this.habits;
  }

  addHabit(name) {
    const newHabit = {
      id: Date.now(),
      name,
      completed: false,
    };
    this.habits.push(newHabit);
  }

  deleteHabit(id) {
    this.habits = this.habits.filter(habit => habit.id !== id);
  }

  toggleHabit(id) {
    this.habits = this.habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
  }

  updateHabit(id, newName) {
    this.habits = this.habits.map(habit =>
      habit.id === id ? { ...habit, name: newName } : habit
    );
  }
}
