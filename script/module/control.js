import {randomID} from '../function/randomID.js';
import {getTotalPricePage} from '../function/totalPriceAllProduct.js';
import {addProductGoods} from '../function/addProductGoods.js';
import {addProductPage, renderGoods} from './renderElement.js';
import {
  tableBody,
  btnAddProduct,
  overlay,
  form,
  totalPriceProduct,
  URL,
} from '../const.js';
import {httpRequest} from '../httpRequest.js';


const modalControl = () => {
  const openModal = () => {
    overlay.classList.add('overlay_active');
  };

  const closeModal = () => {
    overlay.classList.remove('overlay_active');
  };
  btnAddProduct.addEventListener('click', () => {
    openModal();
    // const id = randomID();
    // document.querySelector('.modal__id').style = `display: none`;
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

const renderModalEror = (err, data) => {
  if (err) {
    const modal = overlay.querySelector('.modal');
    const errorModal = document.createElement('div');
    errorModal.classList.add('modal__error');

    const btnErrorClose = document.createElement('button');
    btnErrorClose.classList.add('modal__close');
    btnErrorClose.insertAdjacentHTML('afterbegin', `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L22 22" stroke="#currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M2 22L22 2" stroke="#currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>  
    `);

    const errorWrapper = document.createElement('div');
    errorWrapper.classList.add('error__wrapper');

    const spanOne = document.createElement('div');
    spanOne.classList.add('error__span-one');
    const spanTwo = document.createElement('div');
    spanTwo.classList.add('error__span-two');

    errorWrapper.append(spanOne, spanTwo);

    const errorTitle = document.createElement('h2');
    errorTitle.classList.add('erorr__title');
    errorTitle.textContent = 'Что-то пошло не так';
    errorModal.append(errorWrapper, errorTitle, btnErrorClose);
    modal.append(errorModal);
    return;
  }
  console.log('data', data);
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
    console.log('formData: ', formData);
    // const id = document.querySelector('.modal__id').textContent;
    const newProduct = Object.fromEntries(formData);
    console.log('newProduct: ', JSON.stringify(newProduct));
    httpRequest(`${URL}/api/good`, {
      method: 'POST',
      callback: renderModalEror,
      body: newProduct,
    });

    // newProduct.id = id;
    /*
    // проверка на наличие картинки
    if (!formData.get('images').name) {
      newProduct.images = {};
    } else {
      newProduct.images = {};
      newProduct.images.small = 'img/' + formData.get('images').name;
      newProduct.images.big = 'img/' + formData.get('images').name;
    }
    //addProductGoods(data, newProduct);
    //addProductPage(newProduct, tableBody);
    //getTotalPricePage(data);
    form.reset();
    totalPriceProduct.textContent = '$ 0.00';
    //closeModal();
    */
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
