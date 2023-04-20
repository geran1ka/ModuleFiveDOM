'use strict';

let cmsList = document.querySelector('.cms__list');
let game = true;

const getUserData = () => prompt(`Введите текст для пункта списка`)?.trim();

const print = (text) => {
  const li = document.createElement('li');
  li.className = 'cms__item';
  li.textContent = text;
  return cmsList.append(li);
}

const getResult = (text) => {
  switch (text) {
    case 'del':
      return console.log('del');
    case 'clear':
      return cmsList.textContent = '';
    case '':
      return;
    default:
      return print(text);
  }
}

const createList = (list) => {
  const text = getUserData();

  if (text === undefined) return;

  getResult(text);
  
  return createList (list);
}

createList();