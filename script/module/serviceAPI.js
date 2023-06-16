import {URL} from '../const.js';
import {fetchRequest} from '../function/fetchRequest.js';
import {createError} from './createError.js';


export const getData = (callback) => fetchRequest(`${URL}/api/goods`, {
  method: 'get',
  callback,
});

export const getDataId = (callback, id) => fetchRequest(`${URL}/api/goods/${id}`, {
  method: 'GET',
  callback,
}); // не выводится ошибка


export const sendData = (body, callback) => fetchRequest(`${URL}/api/goods`, {
  method: 'POST',
  callback,
  body,
});


export const updateData = (body, callback, id) => fetchRequest(`${URL}/api/goods/${id}`, {
  method: 'PATCH',
  callback,
  body,
});

export const deleteData = (elem, renderGoods, id) => fetchRequest(`${URL}/api/goods/${id}`, {
  method: 'DELETE',
  callback: (err, data) => {
    if (err) {
      const errorElem = createError(err);
      elem.append(errorElem);
      return;
    }
    if (data) {
      getData(renderGoods);
    }
  },
});
