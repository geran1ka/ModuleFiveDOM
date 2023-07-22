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

import {createDelMessage} from './createDelMessage.js';


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
    console.log('target: ', target);


    if (target.closest('.button-table_del')) {
      const row = target.closest('.table__row');
      const cellTitle = row.querySelector('.table__cell-name').textContent;
      const {btnDel, btnCancel, overlay} = createDelMessage(cellTitle);
      btnDel.addEventListener('click', () => {
        deleteData(tableBody, renderGoods, target.closest('.table__row').id);
        console.log('click');
      });
      btnCancel.addEventListener('click', (e) => {
        overlay.remove();
      });
    }
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
