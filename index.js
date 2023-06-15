import {renderGoods} from './script/module/renderGoods.js';
import {deleteControl, imageControl, modalOpen} from './script/module/control.js';
import {URL} from './script/const.js';
// import {httpRequest} from './script/function/httpRequest.js';
import {fetchRequest} from './script/function/fetchRequest.js';
import {getData} from './script/module/serviceAPI.js';

const init = () => {
  getData(renderGoods);

  modalOpen();


  deleteControl();
  imageControl();
};

init();
