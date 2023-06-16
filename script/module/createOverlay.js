import {createElement} from '../function/functionCreateElem.js';
import {scrollController} from '../function/scrollControl.js';

export const createOverlay = () => createElement('div', {
  className: 'overlay',
}, {
  cb(elem) { // закртыие модального окна
    elem.addEventListener('click', (e) => {
      const target = e.target;
      if (elem === target || target.closest('.modal__close')) {
        elem.remove();
        scrollController.enabledScroll();
      }
    });
  },
});
