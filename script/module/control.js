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


const modalOpen = () => {
  btnAddProduct.addEventListener('click', () => {
    showModal();
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
      data.splice(data.findIndex(item => item.id === +target.closest('.table__row').getAttribute('id')), 1);
      target.closest('.table__row').remove();
      getTotalPricePage(data);
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
      const left = (screen.width - width) / 2;
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
