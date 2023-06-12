import {tableBody} from '../const.js';
import {showEror} from '../function/renderError.js';
import {getTotalPricePage} from '../function/totalPriceAllProduct.js';
import {createRow} from './createElement.js';


export const renderGoods = (err, response, array) => {
  console.log('response: ', response);
  console.log('array: ', array);
  console.log('err: ', err);
  if (err) {
    const errorElem = showEror(err, response);
    tableBody.append(errorElem);
    return;
  }
  getTotalPricePage(array);
  tableBody.textContent = '';
  array.map(item => tableBody.append(createRow(item)));
};
/*
export const addProductPage = (product, tableBody) => {
  tableBody.append(createRow(product));
};
*/