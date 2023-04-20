'use strict';
const cmsList = document.querySelector('.cms__list');
// функция запроса данных от пользователя
const getUserData = () => prompt(`Введите текст для пункта списка`)?.trim();
// функция создания элемента списка
const getPageOutput = (text) => {
  const li = document.createElement('li');
  li.className = 'cms__item';
  li.textContent = text;
  return cmsList.append(li);
};
// функция проверки
const getResult = (text) => {
  switch (text) {
    case 'del':
      cmsList.removeChild(cmsList.lastChild);
      return;
    case 'clear':
      return cmsList.textContent = '';
    case '':
      return;
    default:
      return getPageOutput(text);
  }
};

const createList = (list) => {
  const text = getUserData();

  if (text === undefined || text === 'exit') return;

  getResult(text);

  return createList(list);
};

createList();

