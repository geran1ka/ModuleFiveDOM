const URL = 'https://dazzling-rain-account.glitch.me';
//const URL = 'http://localhost:3000';

const page = document.querySelector('.page');
const table = document.querySelector('.table');
const tableBody = table.querySelector('.table__body');
const btnAddProduct = document.querySelector('.button-add-product');
const overlay = document.querySelector('.overlay');

const form = document.querySelector('.modal__form');
const totalPriceProduct = document.querySelector('.form__text-price');

export {
  URL,
  page,
  table,
  tableBody,
  btnAddProduct,
  overlay,
  form,
  totalPriceProduct,
};
