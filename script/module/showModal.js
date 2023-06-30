import {URL, page} from '../const.js';
import {renderModalEror} from './control.js';
import {loadStyle} from '../function/loadStyle.js';
import {toBase64} from '../function/toBase64.js';
import {sendData, updateData} from './serviceAPI.js';
import {createModal} from './createModal.js';
import {createOverlay} from './createOverlay.js';
import { allowInputOnlySymbol } from '../function/allowInputOnlySymbol.js';

export const showModal = async (err, goods = null) => {
  await loadStyle('style/showModal.css');

  const overlay = createOverlay();

  const {
    modal,
    modalForm,
    modalTitle,
    modalGrouppTitle,
    idWrapper,
    idGoods,
    btnEditModal,
    preview,
    groupAddImg,
    imageWrapper,
    addImg,
    totalPriceGoods,
    btnAddGoods,
    messageError,
  } = createModal();

  btnAddGoods.setAttribute('disabled', 'disabled');

  overlay.append(modal);
  page.append(overlay);

  console.log(modalForm.title);

  allowInputOnlySymbol(modalForm, btnAddGoods);

  if (goods) {
    modalTitle.textContent = 'Изменить ТОВАР';
    idGoods.textContent = goods?.id;

    modalGrouppTitle.append(idWrapper, btnEditModal);

    modalForm.title.value = goods.title;
    modalForm.category.value = goods.category;
    modalForm.units.value = goods.units;
    modalForm.checkbox.checked = !!goods?.discount;
    modalForm.discount.disabled = !goods?.discount;
    modalForm.discount.value = goods.discount > 0 ? goods.discount : '';
    modalForm.description.value = goods.description;
    modalForm.count.value = goods.count;
    modalForm.price.value = goods.price;

    if (goods.image !== 'image/notimage.jpg') {
      preview.src = `${URL}/${goods.image}`;
      groupAddImg.style.rowGap = '30px';
      imageWrapper.style.display = 'block';
      addImg.textContent = 'Изменить изображение';
    }

    totalPriceGoods.textContent = `$ ${goods.price * goods.count - goods.price * goods.count * goods.discount / 100}`;
    btnAddGoods.textContent = 'Сохранить изменения';
  }

  modalForm.addEventListener('change', () => {
    if (modalForm.discount.value) {
      modalForm.discount.value < 100 ? totalPriceGoods.textContent =
      '$ ' + Math.round(modalForm.price.value * modalForm.count.value -
        modalForm.price.value * modalForm.count.value * modalForm.discount.value / 100) :
        totalPriceGoods.textContent = '$ 0.00';
    } else {
      totalPriceGoods.textContent = '$ ' + Math.round(modalForm.price.value * modalForm.count.value);
    }
    /*
    if (modalForm.image.files.length > 0) {
      if (modalForm.image.files[0].size > 1000000) {
        messageError.style.display = 'flex';
        modalForm.image.value = '';
        preview.src = '';
        imageWrapper.style.display = '';
        addImg.textContent = 'Добавить изображение';
      } else {
        const src = window.URL.createObjectURL(modalForm.image.files[0]);
        messageError.style.display = 'none';
        imageWrapper.style.display = 'block';
        groupAddImg.style.rowGap = '30px';
        preview.src = src;
        addImg.textContent = 'Изменить изображение';
      }
    }
    */
  });

  modalForm.image.addEventListener('change', () => {
    if (modalForm.image.files.length > 0) {
      if (modalForm.image.files[0].size > 1000000) {
        messageError.style.display = 'flex';
        modalForm.image.value = '';
        preview.src = '';
        imageWrapper.style.display = '';
        addImg.textContent = 'Добавить изображение';
      } else {
        const src = window.URL.createObjectURL(modalForm.image.files[0]);
        messageError.style.display = 'none';
        imageWrapper.style.display = 'block';
        groupAddImg.style.rowGap = '30px';
        preview.src = src;
        addImg.textContent = 'Изменить изображение';
      }
    }
  });


  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);

    if (formData.get('image').name) {
      newProduct.image = await toBase64(newProduct.image);
    } else {
      if (preview.src) {
        delete newProduct.image;
      }
    }

    if (goods) {
      updateData(newProduct, renderModalEror, goods.id);
    } else {
      sendData(newProduct, renderModalEror);
    }
  });


  return;
};


