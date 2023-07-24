import {createElement} from './functionCreateElem.js';

const isCheckMinLengthDescription = (minLength, modalForm, btnAddGoods) => {
  if (modalForm.description.value.length > minLength) {
    btnAddGoods.removeAttribute('disabled');
  } else {
    btnAddGoods.setAttribute('disabled', 'disabled');
    modalForm.querySelector('.form__label-description').textContent =
      `Описание ${minLength - modalForm.description.value.length > 0 ?
        `Осталось ввести ${minLength - modalForm.description.value.length}` : ''}`;
  }
};

const checkSymbolInput = (target, regExp) => {
  if (target.value.match(regExp)) {
    const symbol = createElement('p', {
      className: 'form__error',
      textContent: 'Не допустисый символ',
    }, {parent: target.closest('.group')});
    setTimeout(() => {
      symbol.remove();
    }, 300);
  }
};

export const allowInputOnlySymbol = (modalForm, btnAddGoods) => {
  modalForm.addEventListener('input', ({target}) => {
    if (
      target === modalForm.title ||
      target === modalForm.category ||
      target === modalForm.description ||
      target === modalForm.units
    ) {
      const regExp = /[^а-яё\s]/gi;
      checkSymbolInput(target, regExp);
      target.value = target.value.replace(regExp, '');
    }

    if (target === modalForm.count || target === modalForm.discount || target === modalForm.price) {
      const regExp = /[^0-9]/g;
      checkSymbolInput(target, regExp);
      target.value = target.value.replace(regExp, '');
      target === modalForm.discount && target.value > 100 ? target.value = 100 : target.value;
    }
    isCheckMinLengthDescription(80, modalForm, btnAddGoods);
  });
  modalForm.addEventListener('click', () => isCheckMinLengthDescription(80, modalForm, btnAddGoods));
};
