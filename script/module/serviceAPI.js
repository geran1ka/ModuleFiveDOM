import {URL} from '../const.js';
import {fetchRequest} from '../function/fetchRequest.js';


export const getData = (callback) => fetchRequest(`${URL}/api/goods`, {
  method: 'get',
  callback,
});

export const getDataId = (callback, id) => fetchRequest(`${URL}/api/goods/${id}`, {
  method: 'GET',
  callback,
});


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

export const deleteData = (id, elem, showEror, renderGoods) => fetchRequest(`${URL}/api/goods/${id}`, {
  method: 'DELETE',
  callback: (err, data) => {
    if (err) {
      const errorElem = showEror(err);
      elem.append(errorElem);
      return;
    }
    if (data) {
      getData(renderGoods);
    }
  },
});
