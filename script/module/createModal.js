import {tableBody} from '../const.js';
import {createElement} from '../function/functionCreateElem.js';
import {createError} from './createError.js';
import {getCategory} from './serviceAPI.js';
import {renderCategoryOption} from './renderCategoryOption.js';

export const createModal = () => {
  const modal = createElement('div', {
    className: 'modal',
  });

  const modalContainer = createElement('div', {
    className: 'modal__container',
  }, {
    parent: modal,
  });

  const modalGrouppTitle = createElement('div', {
    className: 'modal__group',
  }, {
    parent: modalContainer,
  });

  const modalTitle = createElement('h2', {
    className: 'modal__title',
    textContent: 'Добавить ТОВАР',
  }, {
    parent: modalGrouppTitle,
  });

  const idWrapper = createElement('p', {
    className: 'modal__text',
    textContent: 'ID:',
  });

  const idGoods = createElement('span', {
    className: 'modal__id',
  }, {
    parent: idWrapper,
  });

  const btnEditModal = createElement('button', {
    className: 'button modal__button',
    type: 'button',
    innerHTML: `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.3059 10.7148 9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 5.23293 19.8617 5.01248C19.953 4.79203 20 4.55576 20 4.31714C20 4.07853 19.953 3.84225 19.8617 3.6218C19.7704 3.40136 19.6366 3.20105 19.4678 3.03233C19.2991 2.8636 19.0988 2.72976 18.8784 2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72976 17.0669 2.8636 16.8982 3.03233V3.03233Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651 18.5925C17.0973 18.9602 16.5986 19.1668 16.0786 19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765 18.5925C3.53993 18.2248 3.33334 17.726 3.33334 17.206V6.42157C3.33334 5.90154 3.53993 5.4028 3.90765 5.03508C4.27537 4.66735 4.77411 4.46077 5.29415 4.46077H8.23535" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `,
  });

  const modalForm = createElement('form', {
    className: 'modal__form form',
    name: 'formAddProduct',
  }, {
    parent: modalContainer,
    cb(elem) {
      elem.addEventListener('click', (e) => {
        if (e.target.name === 'checkbox') {
          if (elem.checkbox.checked) {
            elem.discount.disabled = false;
            elem.discount.focus();
          } else {
            elem.discount.disabled = true;
            elem.discount.value = '';
          }
        }
      });
    },
  });

  const groupName = createElement('div', {
    className: 'group group_name',
  }, {
    appends: [
      createElement('label', {
        className: 'form__label',
        htmlFor: 'title',
        textContent: 'Наименование',
      }),
      createElement('input', {
        className: 'form__input',
        type: 'text',
        name: 'title',
        id: 'title',
        required: 'required',
      }),
    ],
  });

  const inputCategory = createElement('input', {
    className: 'form__input ',
    type: 'text',
    name: 'category',
    id: 'category',
    // role: 'combobox',
    autocomplete: 'off',
    required: 'required',
  });
  const listCategory = createElement('datalist', {
    className: 'form__input_datalist',
    id: 'category-list',
    // role: 'listbox',
  });

  // const renderCategoryOption = (err, array) => {
  //   if (err) {
  //     const errorElem = createError(err);
  //     tableBody.append(errorElem);
  //     return;
  //   }
  //   return array.map(item => listCategory.append(createElement('option', {
  //     value: item,
  //     textContent: item,
  //   })));
  // };

  getCategory(renderCategoryOption)
      .then(array => listCategory.append(...array));

  const groupCategory = createElement('div', {
    className: 'group group_category',
  }, {
    appends: [
      createElement('label', {
        className: 'form__label',
        htmlFor: 'category',
        textContent: 'Категория',
      }),
      inputCategory,
      listCategory,
    ],
  });

  inputCategory.setAttribute('list', 'category-list');

  const groupUnits = createElement('div', {
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
      }),
    ],
  });
  const groupDiscount = createElement('div', {
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
            min: 0,
            max: 100,
            id: 'discount',
            disabled: 'disabled',
            required: 'required',
          }),
        ],
      }),
    ],
  });

  const groupDescription = createElement('div', {
    className: 'group group_description',
  }, {
    appends: [
      createElement('label', {
        className: 'form__label form__label-description',
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
      }),
    ],
  });

  const groupCount = createElement('div', {
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
      }),
    ],
  });

  const groupPrice = createElement('div', {
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
      }),
    ],
  });

  const fieldset = createElement('fieldset', {
    className: 'form__group',
  }, {
    parent: modalForm,
    appends: [
      groupName,
      groupCategory,
      groupUnits,
      groupDiscount,
      groupDescription,
      groupCount,
      groupPrice,
    ],
  });

  const groupAddImg = createElement('div', {
    className: 'group group_add-img img',
  }, {
    parent: fieldset,
    append: createElement('input', {
      className: 'visually-hidden image',
      type: 'file',
      id: 'image',
      name: 'image',
      accept: 'image/*',
    }),
  });

  const messageError = createElement('p', {
    className: 'img__error',
    textContent: 'Изображение не должно превышать размер 1 Мб',
  }, {
    parent: groupAddImg,
  });

  const addImg = createElement('label', {
    className: 'img__label',
    htmlFor: 'image',
    textContent: 'Добавить изображение',
  }, {
    parent: groupAddImg,
  });

  const imageWrapper = createElement('div', {
    className: 'img__wrapper',
  }, {
    parent: groupAddImg,
  });

  const preview = createElement('img', {
    className: 'img__preview',
  }, {
    parent: imageWrapper,
  });

  createElement('button', {
    className: 'img__btn-delete',
    type: 'button',
    innerHTML: `
      <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.8961 18.6875C20.5999 18.4115 20.2081 18.2612 19.8033 18.2684C19.3985 18.2755 19.0123 18.4395 18.726 18.7258C18.4398 19.0121 18.2758 19.3983 18.2686 19.8031C18.2615 20.2079 18.4117 20.5996 18.6877 20.8958L22.7919 25L18.6877 29.1042C18.5342 29.2472 18.4111 29.4197 18.3257 29.6114C18.2403 29.803 18.1944 30.0099 18.1907 30.2197C18.187 30.4295 18.2256 30.6379 18.3042 30.8325C18.3827 31.027 18.4997 31.2038 18.6481 31.3522C18.7964 31.5005 18.9732 31.6175 19.1677 31.6961C19.3623 31.7747 19.5707 31.8133 19.7805 31.8096C19.9903 31.8059 20.1972 31.7599 20.3889 31.6745C20.5805 31.5891 20.753 31.466 20.8961 31.3125L25.0002 27.2083L29.1044 31.3125C29.4006 31.5885 29.7924 31.7388 30.1972 31.7316C30.602 31.7245 30.9882 31.5605 31.2745 31.2742C31.5607 30.9879 31.7247 30.6017 31.7319 30.1969C31.739 29.7921 31.5887 29.4004 31.3127 29.1042L27.2086 25L31.3127 20.8958C31.4663 20.7528 31.5894 20.5803 31.6748 20.3886C31.7602 20.197 31.8061 19.99 31.8098 19.7802C31.8135 19.5705 31.7749 19.3621 31.6963 19.1675C31.6177 18.9729 31.5008 18.7962 31.3524 18.6478C31.204 18.4995 31.0273 18.3825 30.8327 18.3039C30.6382 18.2253 30.4298 18.1867 30.22 18.1904C30.0102 18.1941 29.8033 18.2401 29.6116 18.3255C29.42 18.4109 29.2475 18.534 29.1044 18.6875L25.0002 22.7917L20.8961 18.6875Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1191 2.60419H24.8816C20.0712 2.60419 16.3024 2.60419 13.3607 3.00002C10.3524 3.40419 7.97741 4.25002 6.11283 6.11252C4.24824 7.9771 3.40449 10.3521 3.00033 13.3625C2.60449 16.3021 2.60449 20.0709 2.60449 24.8813V25.1188C2.60449 29.9292 2.60449 33.6979 3.00033 36.6396C3.40449 39.6479 4.25033 42.0229 6.11283 43.8875C7.97741 45.7521 10.3524 46.5959 13.3628 47C16.3024 47.3959 20.0712 47.3959 24.8816 47.3959H25.1191C29.9295 47.3959 33.6982 47.3959 36.6399 47C39.6482 46.5959 42.0232 45.75 43.8878 43.8875C45.7524 42.0229 46.5962 39.6479 47.0003 36.6375C47.3962 33.6979 47.3962 29.9292 47.3962 25.1188V24.8813C47.3962 20.0709 47.3962 16.3021 47.0003 13.3604C46.5962 10.3521 45.7503 7.9771 43.8878 6.11252C42.0232 4.24794 39.6482 3.40419 36.6378 3.00002C33.6982 2.60419 29.9295 2.60419 25.1191 2.60419ZM8.32324 8.32294C9.51074 7.13544 11.1149 6.45419 13.7795 6.09585C16.4878 5.73335 20.0462 5.72919 25.0003 5.72919C29.9545 5.72919 33.5128 5.73335 36.2212 6.09585C38.8857 6.45419 40.492 7.13752 41.6795 8.32294C42.8649 9.51044 43.5462 11.1146 43.9045 13.7792C44.267 16.4875 44.2712 20.0459 44.2712 25C44.2712 29.9542 44.267 33.5125 43.9045 36.2209C43.5462 38.8854 42.8628 40.4917 41.6774 41.6792C40.4899 42.8646 38.8857 43.5459 36.2212 43.9042C33.5128 44.2667 29.9545 44.2709 25.0003 44.2709C20.0462 44.2709 16.4878 44.2667 13.7795 43.9042C11.1149 43.5459 9.50866 42.8625 8.32116 41.6771C7.13574 40.4896 6.45449 38.8854 6.09616 36.2209C5.73366 33.5125 5.72949 29.9542 5.72949 25C5.72949 20.0459 5.73366 16.4875 6.09616 13.7792C6.45449 11.1146 7.13783 9.51044 8.32324 8.32294Z" />
      </svg>
    `,
  }, {
    parent: imageWrapper,
    cb(elem) {
      elem.addEventListener('click', () => {
        modalForm.image.value = '';
        preview.removeAttribute('src');
        imageWrapper.style.display = '';
        addImg.textContent = 'Добавить изображение';
      });
    },
  });

  const footerModal = createElement('fieldset', {
    className: 'form__group-2',
  }, {
    parent: modalForm,
  });
  const textTotalPrice = createElement('p', {
    className: 'form__text',
    textContent: 'Итоговая стоимость: ',
  }, {
    parent: footerModal,
  });

  const totalPriceGoods = createElement('span', {
    className: 'form__text-price',
    textContent: '$ 0.00',
  }, {
    parent: textTotalPrice,
  });

  const btnAddGoods = createElement('button', {
    className: 'button-add-product button-add-product__modal',
    type: 'submit',
    textContent: 'Добавить товар',
  }, {
    parent: footerModal,
  });

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
  }, {
    parent: modalContainer,
  });

  return {
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
  };
};
