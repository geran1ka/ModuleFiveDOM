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
      if (modalForm.description.value.length > 80) {
        btnAddGoods.removeAttribute('disabled');
      } else {
        modalForm.querySelector('.form__label-description').textContent =
          `Описание ${80 - modalForm.description.value.length > 0 ?
            `Осталось ввести ${80 - modalForm.description.value.length}` : ''}`;
      }
    }
  });
};
