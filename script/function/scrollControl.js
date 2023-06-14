import {page} from '../const.js';

export const scrollController = {
  disabledScroll() {
    0,
    page.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - page.offsetWidth}px;
    `;
  },
  enabledScroll() {
    page.style.cssText = ``;
    window.scroll({top: scrollController.scrollPosition});
  },
};
