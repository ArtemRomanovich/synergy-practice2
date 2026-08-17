class Worker {
  // Конструктор по умолчанию
  constructor() {
    this.lastNameInitials = '';
    this.position = '';
    this.salary = 0;
    this.yearHired = 0;
  }

  // Конструктор с параметрами (через перегрузку через проверку аргументов)
  static create(lastNameInitials, position, salary, yearHired) {
    const w = new Worker();
    w.setLastNameInitials(lastNameInitials);
    w.setPosition(position);
    w.setSalary(salary);
    w.setYearHired(yearHired);
    return w;
  }

  // Методы изменения полей
  setLastNameInitials(value) {
    this.lastNameInitials = value || '';
  }

  setPosition(value) {
    this.position = value || '';
  }

  setSalary(value) {
    const num = Number(value);
    this.salary = isNaN(num) ? 0 : num;
  }

  setYearHired(value) {
    const num = Number(value);
    this.yearHired = isNaN(num) ? 0 : num;
  }

  // Метод отображения полей
  display() {
    return `${this.lastNameInitials}, должность: ${this.position}, зарплата: ${this.salary}, год приёма: ${this.yearHired}`;
  }

  // Вычисление стажа (на текущий год)
  getExperience() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.yearHired;
  }

  // Деструктор-подобный метод (в JS нет настоящего деструктора,
  // но можно явно очистить данные, если нужно)
  dispose() {
    this.lastNameInitials = '';
    this.position = '';
    this.salary = 0;
    this.yearHired = 0;
  }
}

module.exports = { Worker };