import {renderGoods} from './renderGoods.js';
import {
  tableBody,
  btnAddProduct,
  URL,
  page,
  searchForm,
  search,
} from '../const.js';
import {createError} from './createError.js';
import {showModal} from './showModal.js';
import {scrollController} from '../function/scrollControl.js';
import {deleteData, getData, getDataId, getDataSearch} from './serviceAPI.js';
import { createElement } from '../function/functionCreateElem.js';
import { createOverlay } from './createOverlay.js';


const modalOpen = () => {
  btnAddProduct.addEventListener('click', () => {
    showModal();
    scrollController.disabledScroll();
  });

  tableBody.addEventListener('click', ({target}) => {
    if (target.closest('.button-table_edit')) {
      getDataId(showModal, target.closest('.table__row').id);
    }
  });
};

const deleteControl = (data) => {
  tableBody.addEventListener('click', (e) => {
    const target = e.target;

    
    const overlay = createOverlay();
    const createModalDel = createElement('div', {
      className: 'modal-del',
    }, {
      parent: overlay,
      appends: [
        createElement('h2', {
          className: 'modal-del__title',
          textContent: `Вы действительно хотите удалить данный товар`,
        }),
        createElement('button', {
          className: 'modal__close',
          type: 'button',
          ariaLabel: 'Закрыть',
          innerHTML: `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L22 22" stroke="#currentColor" stroke-width="3" stroke-linecap="round"/>
              <path d="M2 22L22 2" stroke="#currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg> 
            `,
        }),
      ],
    });
    page.append(overlay);
    // if (target.closest('.button-table_del')) {
    //   deleteData(tableBody, renderGoods, target.closest('.table__row').id);
    // }
  });
};

const renderModalEror = async (err, data) => {
  const overlay = document.querySelector('.overlay');
  if (err) {
    const errorElem = await createError(err);
    page.append(errorElem);
    return;
  }

  overlay.remove();
  scrollController.enabledScroll();
  getData(renderGoods);
};

const imageControl = () => {
  tableBody.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.button-table_image')) {
      const url = target.closest('.button-table_image').dataset.pic;
      const width = 600;
      const height = 600;
      const top = (screen.height - height) / 2;
      const left = (screen.width - width) / 2;
      if (url !== 'image/notimage.jpg') {
        open(`${URL}/${url}`, '', `width=${width},height=${height},top=${top},left=${left}`);
      }
    }
  });
};

const searchController = () => {
  let delay;
  searchForm.addEventListener('input', (e) => {
    e.preventDefault();
    clearTimeout(delay);
    delay = setTimeout(() => {
      getDataSearch(renderGoods, search.value);
    }, 300);
  });
};

export {
  modalOpen,
  deleteControl,
  imageControl,
  renderModalEror,
  searchController,
};
