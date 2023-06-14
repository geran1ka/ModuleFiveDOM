import {getTotalPricePage} from '../function/totalPriceAllProduct.js';
import {renderGoods} from './renderGoods.js';
import {
  tableBody,
  btnAddProduct,
  URL,
  page,
} from '../const.js';
// import {httpRequest} from '../function/httpRequest.js';
import {showEror} from './showEror.js';
import {showModal} from './showModal.js';
import {fetchRequest} from '../function/fetchRequest.js';
import {scrollController} from '../function/scrollControl.js';


const modalOpen = () => {
  btnAddProduct.addEventListener('click', () => {
    showModal();
    scrollController.disabledScroll();
  });

  tableBody.addEventListener('click', ({target}) => {
    if (target.closest('.button-table_edit')) {
      const idGoods = target.closest('.table__row').id;

      fetchRequest(`${URL}/api/goods/${idGoods}`, {
        method: 'GET',
        callback: showModal,
      });
    }
  });
};


const deleteControl = (data) => {
  tableBody.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.button-table_del')) {
      const idGoods = target.closest('.table__row').id;

      fetchRequest(`${URL}/api/goods/${idGoods}`, {
        method: 'DELETE',
      });
      //target.closest('.table__row').remove();
      tableBody.textContent = '';
      fetchRequest(`${URL}/api/goods`, {
        method: 'get',
        callback: renderGoods,
      });
    }
  });
};

const renderModalEror = async (err, data) => {
  const overlay = document.querySelector('.overlay');
  if (err) {
    const errorElem = await showEror(err);
    page.append(errorElem);
    return;
  }

  overlay.remove();
  scrollController.enabledScroll();

  fetchRequest(`${URL}/api/goods`, {
    method: 'get',
    callback: renderGoods,
  });
};

const imageControl = () => {
  tableBody.addEventListener('click', (e) => {
    console.log('click');
    const target = e.target;
    if (target.closest('.button-table_image')) {
      const url = target.closest('.button-table_image').dataset.pic;
      const width = 600;
      const height = 600;
      const top = (screen.height - height) / 2;
      console.log('top: ', top);
      const left = (screen.width - width) / 2;
      console.log('left: ', left);
      if (url !== 'image/notimage.jpg') {
        open(`${URL}/${url}`, '', `width=${width},height=${height},top=${top},left=${left}`);
      }
    }
  });
};

export {
  modalOpen,
  deleteControl,
  imageControl,
  renderModalEror,
};
