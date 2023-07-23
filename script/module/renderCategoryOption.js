import {tableBody} from '../const.js';
import {createElement} from '../function/functionCreateElem.js';
import {createError} from './createError.js';

export const renderCategoryOption = (err, array) => {
  if (err) {
    const errorElem = createError(err);
    tableBody.append(errorElem);
    return;
  }
  return array.map(item => createElement('option', {
    value: item,
    textContent: item,
  }));
};
