const assert = require('assert');
const { Worker } = require('./worker');

// Тест 1: конструктор по умолчанию
const w1 = new Worker();
assert.strictEqual(w1.lastNameInitials, '');
assert.strictEqual(w1.position, '');
assert.strictEqual(w1.salary, 0);
assert.strictEqual(w1.yearHired, 0);

// Тест 2: создание через фабричный метод
const w2 = Worker.create('Иванов И.И.', 'Инженер', 80000, 2020);
assert.strictEqual(w2.lastNameInitials, 'Иванов И.И.');
assert.strictEqual(w2.position, 'Инженер');
assert.strictEqual(w2.salary, 80000);
assert.strictEqual(w2.yearHired, 2020);

// Тест 3: валидация зарплаты и года
const w3 = Worker.create('Петров П.П.', 'Стажёр', 'abc', 'xyz');
assert.strictEqual(w3.salary, 0);
assert.strictEqual(w3.yearHired, 0);

// Тест 4: расчёт стажа
const currentYear = new Date().getFullYear();
const w4 = Worker.create('Сидоров С.С.', 'Разработчик', 120000, 2018);
assert.strictEqual(w4.getExperience(), currentYear - 2018);

// Тест 5: метод display
const display = w2.display();
assert(display.includes('Иванов И.И.'));
assert(display.includes('Инженер'));
assert(display.includes('80000'));
assert(display.includes('2020'));

// Тест 6: dispose
w2.dispose();
assert.strictEqual(w2.lastNameInitials, '');
assert.strictEqual(w2.position, '');
assert.strictEqual(w2.salary, 0);
assert.strictEqual(w2.yearHired, 0);

console.log('Все тесты пройдены!');