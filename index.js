import {renderGoods} from './script/module/renderElement.js';
import {modalControl, formControl} from './script/module/control.js';
import {URL} from './script/const.js';
import {httpRequest} from './script/function/httpRequest.js';

const init = () => {
  httpRequest(`${URL}/api/goods`, {
    method: 'get',
    callback: renderGoods,
  });

  const {closeModal} = modalControl();

  formControl(closeModal);
  // deleteControl(goods);
  // imageControl();
};

init();
