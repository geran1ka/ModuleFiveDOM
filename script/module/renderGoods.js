import {tableBody} from '../const.js';
import {getTotalPricePage} from '../function/totalPriceAllProduct.js';
import {createRow} from './createElement.js';
import {showEror} from './showEror.js';


export const renderGoods = (err, array) => {
  if (err) {
    const errorElem = showEror(err);
    tableBody.append(errorElem);
    return;
  }
  getTotalPricePage(array);
  tableBody.textContent = '';
  array.map(item => tableBody.append(createRow(item)));
};
