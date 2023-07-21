import {tableBody} from '../const';
import { createElement } from '../function/functionCreateElem.js';
import {createError} from './createError.js';

export const renderCategoryOption = (err, array) => {
  if (err) {
    const errorElem = createError.js(err);
    tableBody.append(errorElem);
    return;
  }
  return array.map(item => listCategory.append(createElement('option', {
    value: item,
  })));
};
