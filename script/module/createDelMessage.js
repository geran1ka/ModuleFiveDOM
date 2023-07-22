import { page } from '../const.js';
import {createElement} from '../function/functionCreateElem.js';
import { createOverlay } from './createOverlay.js';
// import {loadStyle} from '../function/loadStyle.js';

export const createDelMessage = (title) => {
  const overlay = createOverlay();
  const modalDel = createElement('div', {
    className: 'modal-del',
  }, {
    parent: overlay,
  });

  const delTitle = createElement('h2', {
    className: 'modal-del__title',
    textContent: `Вы действительно хотите удалить данный товар:`,
  });

  const delSubTitle = createElement('h2', {
    className: 'modal-del__subtitle',
    textContent: title,
  });


  const btnWrapper = createElement('div', {
    className: 'btn_wrapper',
  });

  const btnDel = createElement('button', {
    className: 'btn btn_del',
    textContent: 'Удалить',
    type: 'button',
  });

  const btnCancel = createElement('button', {
    className: 'btn btn_cancel',
    textContent: 'Отменить',
    type: 'button',
  });

  const btnClose = createElement('button', {
    className: 'modal__close',
    type: 'button',
    ariaLabel: 'Закрыть',
    innerHTML: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L22 22" stroke="#currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M2 22L22 2" stroke="#currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg> 
    `,
  });

  btnWrapper.append(btnDel, btnCancel);
  modalDel.append(delTitle, delSubTitle, btnWrapper, btnClose);
  
  page.append(overlay);
  return {
    overlay,
    btnDel,
    btnCancel,
    btnClose,
  };
};
