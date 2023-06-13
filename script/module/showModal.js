import {createElement} from '../function/functionCreateElem.js';
import {URL, page} from '../const.js';
import {httpRequest} from '../function/httpRequest.js';
import {renderModalEror} from './control.js';
import {fetchRequest} from '../function/fetchRequest.js';

export const showModal = (err, goods = null) => {

  console.log(goods);
  const overlay = createElement('div', {
    className: 'overlay overlay_active',
  }, {
    parent: page,
    cb(elem) { // закртыие модального окна
      elem.addEventListener('click', (e) => {
        const target = e.target;
        if (elem === target || target.closest('.modal__close')) {
          overlay.remove();
        }
      });
    },
  });

  const modal = createElement('div', {
    className: 'modal',
  });

  overlay.append(modal);

  const modalContainer = createElement('div', {
    className: 'modal__container',
  });

  modal.append(modalContainer);

  const modalGrouppTitle = createElement('div', {
    className: 'modal__group',
  }, {
    append: createElement('p', {
      className: goods ? 'modal__text' : 'visually-hidden',
      textContent: 'ID:',
    }, {
      append: createElement('span', {
        className: 'modal__id',
        textContent: goods ? goods.id : '',
      }),
    }),
  });

  const modalTitle = createElement('h2', {
    className: 'modal__title',
    textContent: goods ? 'Изменить ТОВАР' : 'Добавить ТОВАР',
  });

  const btnEditModal = createElement('button', {
    className: goods ? 'button modal__button' : 'visually-hidden',
    type: 'button',
    innerHTML: `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.3059 10.7148 9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 5.23293 19.8617 5.01248C19.953 4.79203 20 4.55576 20 4.31714C20 4.07853 19.953 3.84225 19.8617 3.6218C19.7704 3.40136 19.6366 3.20105 19.4678 3.03233C19.2991 2.8636 19.0988 2.72976 18.8784 2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72976 17.0669 2.8636 16.8982 3.03233V3.03233Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651 18.5925C17.0973 18.9602 16.5986 19.1668 16.0786 19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765 18.5925C3.53993 18.2248 3.33334 17.726 3.33334 17.206V6.42157C3.33334 5.90154 3.53993 5.4028 3.90765 5.03508C4.27537 4.66735 4.77411 4.46077 5.29415 4.46077H8.23535" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `,
  });

  modalGrouppTitle.prepend(modalTitle);
  modalGrouppTitle.append(btnEditModal);

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

  const modalForm = createElement('form', {
    className: 'modal__form form',
    name: 'formAddProduct',
    // action: 'https://jsonplaceholder.typicode.com/posts',
    // method: 'post',
  }, {
    appends: [
      createElement('fieldset', {
        className: 'form__group',
      }, {
        appends: [
          createElement('div', {
            className: 'group group_name',
          }, {
            appends: [
              createElement('label', {
                className: 'form__label',
                htmlFor: '#title',
                textContent: 'Наименование',
              }),
              createElement('input', {
                className: 'form__input',
                type: 'text',
                name: 'title',
                id: 'title',
                required: 'required',
                value: goods ? goods.title : '',
              }),
              // div group_name
            ],
          }),
          createElement('div', {
            className: 'group group_category',
          }, {
            appends: [
              createElement('label', {
                className: 'form__label',
                htmlFor: 'category',
                textContent: 'Категория',
              }),
              createElement('input', {
                className: 'form__input',
                type: 'text',
                name: 'category',
                id: 'category',
                required: 'required',
                value: goods ? goods.category : '',
              }),
              // div group_category
            ],
          }),
          createElement('div', {
            className: 'group group_units',
          }, {
            appends: [
              createElement('label', {
                className: 'form__label',
                htmlFor: 'units',
                textContent: 'Единицы измерения',
              }),
              createElement('input', {
                className: 'form__input',
                type: 'text',
                name: 'units',
                id: 'units',
                required: 'required',
                value: `${goods ? goods.units : ''}`,
              }),
              // div group_units
            ],
          }),
          createElement('div', {
            className: 'group group_discount',
          }, {
            appends: [
              createElement('label', {
                className: 'form__label',
                htmlFor: 'discount',
                textContent: 'Дисконт',
              }),
              createElement('div', {
                className: 'group-container',
              }, {
                appends: [
                  createElement('input', {
                    className: 'form__checkbox',
                    type: 'checkbox',
                    name: 'checkbox',
                    arialabel: 'Добавить скидку',
                  }),
                  createElement('input', {
                    className: 'form__input',
                    type: 'number',
                    name: 'discount',
                    id: 'discount',
                    disabled: goods ? '' : 'disabled',
                    required: 'required',
                    value: goods ? goods.discount : '',
                  }),
                ],
              }),
              // div group_units
            ],
          }),
          createElement('div', {
            className: 'group group_description',
          }, {
            appends: [
              createElement('label', {
                className: 'form__label',
                htmlFor: 'description',
                textContent: 'Описание',
              }),
              createElement('textarea', {
                className: 'form__input',
                name: 'description',
                id: 'description',
                cols: 30,
                rows: 5,
                required: 'required',
                value: goods ? goods.description : '',
              }),
              // div group_description
            ],
          }),
          createElement('div', {
            className: 'group group_count',
          }, {
            appends: [
              createElement('label', {
                className: 'form__label',
                htmlFor: 'count',
                textContent: 'Количество',
              }),
              createElement('input', {
                className: 'form__input',
                type: 'number',
                name: 'count',
                id: 'count',
                required: 'required',
                value: goods ? goods.count : '',
              }),
              // div group_count
            ],
          }),
          createElement('div', {
            className: 'group group_price',
          }, {
            appends: [
              createElement('label', {
                className: 'form__label',
                htmlFor: 'price',
                textContent: 'Цена',
              }),
              createElement('input', {
                className: 'form__input',
                type: 'number',
                name: 'price',
                id: 'price',
                required: 'required',
                value: goods ? goods.price : '',
              }),
              // div group_price
            ],
          }),
          createElement('div', {
            className: 'group group_add-img',
          }, {
            appends: [
              createElement('label', {
                className: 'form__label-img',
                htmlFor: 'image',
                textContent: 'Добавить изображение',
              }),
              createElement('input', {
                className: 'visually-hidden',
                type: 'file',
                id: 'image',
                name: 'image',
                accept: 'image/*',
                // value: goods ? goods.image : '',
              }),
              // div group_add-img
            ],
          }),
          // fieldset - 1
        ],
      }),
      createElement('fieldset', {
        className: 'form__group-2',
      }, {
        appends: [
          createElement('p', {
            className: 'form__text',
            textContent: 'Итоговая стоимость: ',
          }, {
            append: createElement('span', {
              className: 'form__text-price',
              textContent: goods ?
              `$${goods.price * goods.count - goods.price * goods.count * goods.discount / 100}` :
                '$ 0.00',
            }),
          }),
          createElement('button', {
            className: 'button-add-product',
            type: 'submit',
            formTarget: '_blank',
            textContent: 'Добавить товар',
          }),
        ],
      }),
      // form
    ],
  });

  modalContainer.append(modalGrouppTitle, modalForm, btnClose);


  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    if (formData.get('image').name) {
      newProduct.image = 'image/' + formData.get('image').name;
    } else {
      delete newProduct.image;
    }

    fetchRequest(`${URL}/api/goods`, {
      method: 'POST',
      callback: renderModalEror,
      body: newProduct,
    });
  });

  const totalPriceProduct = document.querySelector('.form__text-price');

  modalForm.addEventListener('change', () => {
    if (modalForm.discount.value) {
      modalForm.discount.value < 100 ? totalPriceProduct.textContent =
      '$ ' + Math.round(modalForm.price.value * modalForm.count.value -
        modalForm.price.value * modalForm.count.value * modalForm.discount.value / 100) :
          totalPriceProduct.textContent = '$ 0.00';
    } else {
      totalPriceProduct.textContent = '$ ' + Math.round(modalForm.price.value * modalForm.count.value);
    }
  });

  modalForm.addEventListener('click', (e) => {
    if (e.target.name === 'checkbox') {
      if (modalForm.checkbox.checked) {
        modalForm.discount.disabled = false;
        modalForm.discount.focus();
      } else {
        modalForm.discount.disabled = true;
        modalForm.discount.value = '';
      }
    }
  });




  return {overlay, modalTitle, btnEditModal, btnClose, modalForm};
};

