import {tableBody} from '../const.js';
import {getTotalPricePage} from '../function/totalPriceAllProduct.js';
import {createRow} from './createElement.js';


export const renderGoods = (err, array) => {
  if (err) console.log('Ошибка');
  getTotalPricePage(array);
  tableBody.textContent = '';
  array.map(item => tableBody.append(createRow(item)));
};

export const addProductPage = (product, tableBody) => {
  tableBody.append(createRow(product));
};
