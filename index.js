const readline = require('readline');
const { Worker } = require('./worker');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let workers = [];

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function inputWorkers() {
  const countStr = await askQuestion('Сколько работников ввести? ');
  const count = Number(countStr);
  if (isNaN(count) || count <= 0) {
    console.log('Некорректное количество работников.');
    return;
  }

  for (let i = 0; i < count; i++) {
    console.log(`--- Работник ${i + 1} ---`);
    const lastNameInitials = await askQuestion('Фамилия и инициалы: ');
    const position = await askQuestion('Должность: ');
    const salaryStr = await askQuestion('Зарплата: ');
    const yearHiredStr = await askQuestion('Год поступления на работу: ');

    const worker = Worker.create(
      lastNameInitials.trim(),
      position.trim(),
      salaryStr.trim(),
      yearHiredStr.trim()
    );

    workers.push(worker);
  }
  console.log('Работники успешно добавлены.\n');
}

async function filterByExperience() {
  const thresholdStr = await askQuestion('Введите минимальный стаж (лет), чтобы вывести подходящих работников: ');
  const threshold = Number(thresholdStr);
  if (isNaN(threshold) || threshold < 0) {
    console.log('Некорректный стаж.\n');
    return;
  }

  const matched = workers.filter(w => w.getExperience() > threshold);

  if (matched.length === 0) {
    console.log(`Нет работников со стажем более ${threshold} лет.\n`);
  } else {
    console.log(`Работники со стажем более ${threshold} лет:`);
    matched.forEach(w => console.log(w.display()));
    console.log('');
  }
}

async function mainMenu() {
  while (true) {
    const choice = (await askQuestion(
      'Выберите действие:\n' +
      '1 – Ввести данные работников\n' +
      '2 – Показать работников со стажем больше заданного значения\n' +
      '3 – Показать всех работников\n' +
      '4 – Выход\n> '
    )).trim();

    switch (choice) {
      case '1':
        await inputWorkers();
        break;
      case '2':
        await filterByExperience();
        break;
      case '3':
        if (workers.length === 0) {
          console.log('Список работников пуст.\n');
        } else {
          console.log('Все работники:');
          workers.forEach(w => console.log(w.display()));
          console.log('');
        }
        break;
      case '4':
        // «Деструктор» для всех объектов (опционально)
        workers.forEach(w => w.dispose());
        workers = [];
        console.log('Программа завершена.');
        rl.close();
        return;
      default:
        console.log('Неверная опция, попробуйте снова.\n');
    }
  }
}

mainMenu();