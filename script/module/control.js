import {getTotalPricePage} from '../function/totalPriceAllProduct.js';
import {renderGoods} from './renderElement.js';
import {
  tableBody,
  btnAddProduct,
  overlay,
  form,
  totalPriceProduct,
  URL,
} from '../const.js';
import {httpRequest} from '../function/httpRequest.js';
import {renderEror} from '../function/renderError.js';


const modalControl = () => {
  const openModal = () => {
    overlay.classList.add('overlay_active');
  };

  const closeModal = () => {
    overlay.classList.remove('overlay_active');
  };

  btnAddProduct.addEventListener('click', () => {
    openModal();
    if (!form.checkbox.checked) {
      form.discount.disabled = true;
      form.discount.value = '';
    }
  });

  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target === overlay || target.closest('.modal__close')) {
      closeModal();
    }
  });

  return {
    openModal,
    closeModal,
  };
};

const {closeModal} = modalControl();


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

const renderModalEror = (err, response, data) => {
  if (err) {
    const errorElem = renderEror(err, response);
    overlay.append(errorElem);
    return;
  }
  form.reset();
  totalPriceProduct.textContent = '$ 0.00';
  closeModal();

  httpRequest(`${URL}/api/goods`, {
    method: 'get',
    callback: renderGoods,
  });
};

const formControl = (closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    if (formData.get('image').name) {
      newProduct.image = 'image/' + formData.get('image').name;
    } else {
      delete newProduct.image;
    }

    httpRequest(`${URL}/api/goods`, {
      method: 'POST',
      callback: renderModalEror,
      body: newProduct,
    });
  });


  form.addEventListener('change', () => {
    if (form.discount.value) {
      form.discount.value < 100 ? totalPriceProduct.textContent =
      '$ ' + Math.round(form.price.value * form.count.value -
          form.price.value * form.count.value * form.discount.value / 100) :
          totalPriceProduct.textContent = '$ 0.00';
    } else {
      totalPriceProduct.textContent = '$ ' + Math.round(form.price.value * form.count.value);
    }
  });

  form.addEventListener('click', (e) => {
    if (e.target.name === 'checkbox') {
      if (form.checkbox.checked) {
        form.discount.disabled = false;
        form.discount.focus();
      } else {
        form.discount.disabled = true;
        form.discount.value = '';
      }
    }
  });
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
      if (url !== 'false') {
        open(url, '', `width=${width},height=${height},top=${top},left=${left}`);
      }
    }
  });
};

export {
  modalControl,
  deleteControl,
  formControl,
  imageControl,
};
