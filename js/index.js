const createElement = (tag, attr, {append, appends, parent, cb} = {}) => {
  const element = document.createElement(tag);
  // Проверка: передан ли атрибут
  if (attr) {
    Object.assign(element, attr);
  }
  // Проверка: есть ли у элемента родитель и является ли он HTML элементом
  if (append && append instanceof HTMLElement) {
    element.append(append)
  }

  if (appends && appends.every(item => item instanceof HTMLAreaElement)) {
    element.append(...apends);
  }
  // Проверка: есть ли у элемента ... и является ли он HTML элементом
  if (parent && parent instanceof HTMLElement) {
    parent.append(element);
  }

  if (cb && typeof cb === 'function') {
    cb(element);
  }

  return element
};

const tableTitle = {
  'id': 'ID',
  'name': 'Наименование',
  'category': 'Категория',
  'units': 'ед/изм',
  'count': 'количество',
  'price': 'цена',
  'total': 'ИТОГ',
  'btn': '',
}

const goods = 
[
  {
    "id": 253842678,
    "name": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 296378448,
    "name": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {

    }
  },
  {
    "id": 296378448,
    "name": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 296378448,
    "name": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {

    }
  },
]

const cms = document.querySelector('.cms');

const container = createElement('div', {
  className: 'container',
}, {
  parent: cms,
});

const containerGroup = createElement('div', {
  className: 'container__group'
}, {
  parent: container,
  append: createElement('h2', {
    className: 'title',
    textContent: 'CMS'
  })
});

const textTitle = createElement('p', {
  className: 'text',
  textContent: 'Итоговая стоимость: '
}, {
  parent: containerGroup,
  append: createElement('span', {
    className: 'text-alt',
    textContent: `$900.00`
  })
});

const containerBtn = createElement('div', {
  className: 'container__btn'
}, {
    parent: container,
});

const filterBtn = createElement('button', {
  className: 'button-filter',
  type: 'button',
  innerHTML: `
    <svg class="button-filter__svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z"/>
    </svg>
    <span class="button-filter__text">Фильтр</span>
  `
}, {
  parent: containerBtn
});

const search = createElement('form', {
  className: 'search',
  innerHTML: `
    <fieldset class="search">
      <button class="search__button" type="submit">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4097 14.8822C11.7399 16.1799 9.63851 16.7922 7.53338 16.5942C5.42824 16.3963 3.47766 15.403 2.07881 13.8166C0.679961 12.2303 -0.0619809 10.1701 0.00405863 8.05565C0.0700982 5.94118 0.939153 3.9314 2.43427 2.43552C3.92939 0.939633 5.93814 0.0701341 8.05152 0.00406071C10.1649 -0.0620127 12.224 0.680308 13.8096 2.07987C15.3951 3.47944 16.3879 5.43102 16.5857 7.53723C16.7836 9.64345 16.1717 11.7459 14.8745 13.4166L19.6936 18.2201C20.1016 18.6267 20.1022 19.2872 19.695 19.6946C19.2878 20.1021 18.6273 20.1017 18.2204 19.6939L13.4201 14.8822H13.4097ZM8.31916 14.5495C9.13773 14.5495 9.94829 14.3882 10.7045 14.0748C11.4608 13.7614 12.148 13.302 12.7268 12.7229C13.3056 12.1438 13.7647 11.4563 14.078 10.6996C14.3913 9.94298 14.5525 9.13201 14.5525 8.31302C14.5525 7.49403 14.3913 6.68306 14.078 5.92641C13.7647 5.16976 13.3056 4.48225 12.7268 3.90314C12.148 3.32402 11.4608 2.86465 10.7045 2.55123C9.94829 2.23782 9.13773 2.07651 8.31916 2.07651C6.66598 2.07651 5.08051 2.73356 3.91153 3.90314C2.74256 5.07271 2.08583 6.659 2.08583 8.31302C2.08583 9.96705 2.74256 11.5533 3.91153 12.7229C5.08051 13.8925 6.66598 14.5495 8.31916 14.5495Z"/>
        </svg>
      </button>
      <input class="search__input" type="search" name="search" placeholder="Поиск по наименованию и категории">
    </fieldset>
  `
}, {
  parent: containerBtn,
})

const buttonAddProduct = createElement('button', {
  className: 'button-add-product',
  type: 'button',
  textContent: 'Добавить товар'
}, {
  parent: containerBtn
})

// Верстка таблицы на JS
const containerTable = createElement('div', {
  className: 'scroll-box'
}, {
  parent: container,
});

const table = createElement('table', {
  className: 'table',
}, {
  parent: containerTable
});

const thead = createElement('thead', {
  className: 'table__title'
}, {
  parent: table
});

const tbody = createElement('tbody', {
  className: 'table__tbody'
}, {
  parent: table
});

const tfoot = createElement('tfoot', {
  className: 'table__tfoot'
}, {
  parent: table
});

// thead
const titleRow = createElement('tr', {
  className: 'table__row-title'
}, {
  parent: thead,
});

Object.keys(tableTitle).map(item => {
  const th = createElement('th', {
    className: `table__cell-title table__cell-${item}`,
    textContent: `${tableTitle[item]}`
  }, {
    parent: titleRow
  })
});

// tbody
const buttonTableImage = createElement('button', {
  className: 'button-table button-table__image',
  innerHTML: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.7778 2.22223H2.22223C1.92754 2.22223 1.64493 2.33929 1.43655 2.54767C1.22818 2.75604 1.11111 3.03866 1.11111 3.33334V16.6667C1.11111 16.9614 1.22818 17.244 1.43655 17.4523C1.64493 17.6607 1.92754 17.7778 2.22223 17.7778H17.7778C18.0725 17.7778 18.3551 17.6607 18.5635 17.4523C18.7718 17.244 18.8889 16.9614 18.8889 16.6667V3.33334C18.8889 3.03866 18.7718 2.75604 18.5635 2.54767C18.3551 2.33929 18.0725 2.22223 17.7778 2.22223ZM2.22223 16.6667V3.33334H17.7778V16.6667H2.22223Z"/>
      <path d="M4.95555 7.77778C5.28518 7.77778 5.60741 7.68003 5.8815 7.49689C6.15558 7.31376 6.3692 7.05346 6.49535 6.74892C6.62149 6.44437 6.6545 6.10926 6.59019 5.78596C6.52588 5.46266 6.36715 5.16569 6.13406 4.9326C5.90097 4.69951 5.604 4.54078 5.2807 4.47647C4.9574 4.41216 4.62228 4.44516 4.31774 4.57131C4.0132 4.69746 3.7529 4.91108 3.56976 5.18516C3.38663 5.45924 3.28888 5.78147 3.28888 6.11111C3.28888 6.55314 3.46447 6.97706 3.77703 7.28962C4.0896 7.60218 4.51352 7.77778 4.95555 7.77778ZM4.95555 5.22222C5.13158 5.22112 5.30399 5.27232 5.45089 5.36932C5.5978 5.46632 5.71259 5.60476 5.78072 5.76708C5.84885 5.9294 5.86725 6.1083 5.83358 6.28109C5.79992 6.45389 5.7157 6.61279 5.59161 6.73766C5.46752 6.86253 5.30915 6.94774 5.13657 6.98249C4.96399 7.01724 4.78498 6.99997 4.62223 6.93285C4.45949 6.86574 4.32033 6.75182 4.22241 6.60552C4.12449 6.45923 4.07222 6.28715 4.07221 6.11111C4.07367 5.87729 4.1672 5.65345 4.33255 5.48811C4.49789 5.32277 4.72172 5.22923 4.95555 5.22778V5.22222Z"/>
      <path d="M12.6555 8.53889L9.65555 11.5389L7.43332 9.31666C7.32923 9.21319 7.18843 9.15511 7.04166 9.15511C6.89489 9.15511 6.75408 9.21319 6.64999 9.31666L3.28888 12.7222V14.2944L7.0611 10.5222L8.88888 12.3222L6.80555 14.4056H8.33332L13.0278 9.71111L16.6667 13.3333V11.7667L13.4389 8.53889C13.3348 8.43541 13.194 8.37733 13.0472 8.37733C12.9004 8.37733 12.7596 8.43541 12.6555 8.53889Z"/>
    </svg>                  
`
});

const buttonTableNoImage = createElement('button', {
  className: 'button-table button-table__image',
  innerHTML: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.75 2.13375L17.8663 1.25L1.25 17.8663L2.13375 18.75L3.38375 17.5H16.25C16.5814 17.4995 16.899 17.3676 17.1333 17.1333C17.3676 16.899 17.4995 16.5814 17.5 16.25V3.38375L18.75 2.13375ZM16.25 16.25H4.63375L9.50437 11.3794L10.9913 12.8663C11.2257 13.1006 11.5435 13.2322 11.875 13.2322C12.2065 13.2322 12.5243 13.1006 12.7587 12.8663L13.75 11.875L16.25 14.3731V16.25ZM16.25 12.605L14.6337 10.9888C14.3993 10.7544 14.0815 10.6228 13.75 10.6228C13.4185 10.6228 13.1007 10.7544 12.8663 10.9888L11.875 11.98L10.3894 10.4944L16.25 4.63375V12.605Z"/>
      <path d="M3.75 13.75V11.875L6.875 8.75187L7.73313 9.61062L8.61812 8.72563L7.75875 7.86625C7.52434 7.63191 7.20646 7.50027 6.875 7.50027C6.54354 7.50027 6.22566 7.63191 5.99125 7.86625L3.75 10.1075V3.75H13.75V2.5H3.75C3.41858 2.50033 3.10083 2.63213 2.86648 2.86648C2.63213 3.10083 2.50033 3.41858 2.5 3.75V13.75H3.75Z"/>
    </svg>
  `
});

const buttonTableEdit = createElement('button', {
  className: 'button-table button-table__edit',
  innerHTML: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.3059 10.7148 9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 5.23293 19.8617 5.01248C19.953 4.79203 20 4.55576 20 4.31714C20 4.07853 19.953 3.84225 19.8617 3.6218C19.7704 3.40136 19.6366 3.20105 19.4678 3.03233C19.2991 2.8636 19.0988 2.72976 18.8784 2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72976 17.0669 2.8636 16.8982 3.03233V3.03233Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651 18.5925C17.0973 18.9602 16.5986 19.1668 16.0786 19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765 18.5925C3.53993 18.2248 3.33334 17.726 3.33334 17.206V6.42157C3.33334 5.90154 3.53993 5.4028 3.90765 5.03508C4.27537 4.66735 4.77411 4.46077 5.29415 4.46077H8.23535" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>   
  `
});

const buttonTableDel = createElement('button', {
  className: 'button-table button-table__del',
  innerHTML: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.03125 3.59375H6.875C6.96094 3.59375 7.03125 3.52344 7.03125 3.4375V3.59375H12.9688V3.4375C12.9688 3.52344 13.0391 3.59375 13.125 3.59375H12.9688V5H14.375V3.4375C14.375 2.74805 13.8145 2.1875 13.125 2.1875H6.875C6.18555 2.1875 5.625 2.74805 5.625 3.4375V5H7.03125V3.59375ZM16.875 5H3.125C2.7793 5 2.5 5.2793 2.5 5.625V6.25C2.5 6.33594 2.57031 6.40625 2.65625 6.40625H3.83594L4.31836 16.6211C4.34961 17.2871 4.90039 17.8125 5.56641 17.8125H14.4336C15.1016 17.8125 15.6504 17.2891 15.6816 16.6211L16.1641 6.40625H17.3438C17.4297 6.40625 17.5 6.33594 17.5 6.25V5.625C17.5 5.2793 17.2207 5 16.875 5ZM14.2832 16.4062H5.7168L5.24414 6.40625H14.7559L14.2832 16.4062Z"/>
    </svg>                  
`
});

const createRow = (obj, objTable) => {
const tableRow = createElement('tr', {
  className: 'table__row'
}, {
  parent: tbody,
});

Object.keys(objTable).map(item => {
  const td = createElement('td', {
    className: `table__cell-title table__cell-${item}`,
    textContent: `${obj[item] !== undefined ? obj[item] : ''}`
  }, {
    parent: tableRow
  })
  switch (item) {
    case 'total':
      td.textContent = '$' + obj.count * obj.price
      break;
    case 'btn':
      if(!Object.keys(obj.images).length) {
        td.append(buttonTableNoImage.cloneNode(true))
      } else {
        td.append(buttonTableImage.cloneNode(true))
      }
      td.append(buttonTableEdit.cloneNode(true), buttonTableDel.cloneNode(true))
      break;
  }
});
}

const renderGoods = (arr, objTable) => { 
  tbody.textContent = '';
  return arr.map(item => {createRow(item, objTable)})
}

renderGoods(goods, tableTitle);

// tfoot
const footRow = createElement('tr', {
  className: 'footer-row',
  innerHTML: `
    <tr>
      <td class="page-count" colspan="6">
        <label>Показывать на странице:
          <select class="page-count__list" name="page">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </td>
  `
}, {
  parent: tfoot
});
const tdPageAll = createElement('td', {
  className: 'page-all',
  innerHTML: `
    <p><span>1-10</span> of <span>276</span></p>
  `
}, {
  parent: footRow,
})
const tdPageControl = createElement('td', {
  className: 'page-control'
}, {
  parent: footRow,
})

const btnBack = createElement('button', {
  className: 'button btn-back',
  type: 'button',
  innerHTML: `
    <svg width="6" height="10" viewBox="0 0 6 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.79971 1.10636C6.42812 0.51287 5.43313 -0.426818 4.80472 0.216126L0.196378 4.51891C-0.0654595 4.7662 -0.0654595 5.21131 0.196378 5.4586L4.80472 9.81084C5.43313 10.4043 6.42812 9.46464 5.79971 8.87115L1.71504 5.01348L5.79971 1.10636Z"/>
    </svg>                  
  `
}, {
  parent: tdPageControl
})

const btnNext = createElement('button', {
  className: 'button btn-next',
  type: 'button',
  innerHTML: `
    <svg width="6" height="10" viewBox="0 0 6 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.200293 1.10636C-0.428118 0.51287 0.566865 -0.426818 1.19528 0.216126L5.80362 4.51891C6.06546 4.7662 6.06546 5.21131 5.80362 5.4586L1.19528 9.81084C0.566865 10.4043 -0.428118 9.46464 0.200293 8.87115L4.28496 5.01348L0.200293 1.10636Z"/>
    </svg>
`
}, {
  parent: tdPageControl
})
/*
<div class="scroll-box">
  <table class="table">

    <tfoot>
      <tr>
        <td class="page-count" colspan="6">
          <label>Показывать на странице:
            <select class="page-count__list" name="page">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
</div>*/