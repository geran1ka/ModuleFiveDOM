import {tableBody} from '../const.js';
import {createRow} from './createElement.js';


export const renderGoods = (array) => array.map(item => tableBody.append(createRow(item)));

export const addProductPage = (product, tableBody) => {
  tableBody.append(createRow(product));
};
