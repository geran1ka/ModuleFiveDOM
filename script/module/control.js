import {randomID} from '../function/randomID.js';
import {getTotalPricePage} from '../function/totalPriceAllProduct.js';
import {addProductGoods} from '../function/addProductGoods.js';
import {addProductPage} from './renderElement.js';
import {
  tableBody,
  btnAddProduct,
  overlay,
  form,
  totalPriceProduct,
} from '../const.js';


const modalControl = () => {
  const openModal = () => {
    overlay.classList.add('overlay_active');
  };

  const closeModal = () => {
    overlay.classList.remove('overlay_active');
  };
  btnAddProduct.addEventListener('click', () => {
    openModal();
    const id = randomID();
    document.querySelector('.modal__id').textContent = id;
    if (!form.checkbox.checked) {
      form.discont.disabled = true;
      form.discont.value = '';
    }
  });

  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target === overlay || target.closest('.modal__close')) {
      closeModal();
      // form.reset();
      // totalPriceProduct.textContent = '$ 0.00';
    }
  });

  return {
    openModal,
    closeModal,
  };
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

const formControl = (data, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const id = document.querySelector('.modal__id').textContent;
    const newProduct = Object.fromEntries(formData);
    newProduct.id = id;
    // проверка на наличие картинки
    if (!formData.get('images').name) {
      newProduct.images = {};
    } else {
      newProduct.images = {};
      newProduct.images.small = 'img/' + formData.get('images').name;
      newProduct.images.big = 'img/' + formData.get('images').name;
    }
    addProductGoods(data, newProduct);
    addProductPage(newProduct, tableBody);
    getTotalPricePage(data);
    form.reset();
    totalPriceProduct.textContent = '$ 0.00';
    closeModal();
  });

  form.addEventListener('change', () => {
    if (form.discont.value) {
      form.discont.value < 100 ? totalPriceProduct.textContent = '$ ' + Math.round(form.price.value * form.count.value -
          form.price.value * form.count.value * form.discont.value / 100) :
          totalPriceProduct.textContent = '$ 0.00';
    } else {
      totalPriceProduct.textContent = '$ ' + Math.round(form.price.value * form.count.value);
    }
  });

  form.addEventListener('click', (e) => {
    if (e.target.name === 'checkbox') {
      if (form.checkbox.checked) {
        form.discont.disabled = false;
        form.discont.focus();
      } else {
        form.discont.disabled = true;
        form.discont.value = '';
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
