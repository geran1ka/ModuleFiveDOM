const isCheckMinLengthDescription = (minLength, modalForm, btnAddGoods) => {
  if (modalForm.description.value.length > minLength) {
    btnAddGoods.removeAttribute('disabled');
  } else {
    modalForm.querySelector('.form__label-description').textContent =
      `Описание ${minLength - modalForm.description.value.length > 0 ?
        `Осталось ввести ${minLength - modalForm.description.value.length}` : ''}`;
  }
};

export const allowInputOnlySymbol = (modalForm, btnAddGoods) => {
  modalForm.addEventListener('input', ({target}) => {
    if (target === modalForm.title || target === modalForm.category || target === modalForm.description) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }

    if (target === modalForm.units) {
      target.value = target.value.replace(/[^а-яё]/gi, '');
    }

    if (target === modalForm.count || target === modalForm.discount || target === modalForm.price) {
      target.value = target.value.replace(/[^0-9]/g, '');
    }

    if (target === modalForm.description) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }

    isCheckMinLengthDescription(80, modalForm, btnAddGoods);
  });
  modalForm.addEventListener('click', () => isCheckMinLengthDescription(80, modalForm, btnAddGoods));
};
