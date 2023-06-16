import {renderGoods} from './script/module/renderGoods.js';
import {deleteControl, imageControl, modalOpen} from './script/module/control.js';
import {getData} from './script/module/serviceAPI.js';

const init = () => {
  getData(renderGoods);

  modalOpen();


  deleteControl();
  imageControl();
};

init();
