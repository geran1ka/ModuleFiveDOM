import {getTotalPricePage} from './script/function/totalPriceAllProduct.js';
import {renderGoods} from './script/module/renderElement.js';
import {modalControl, formControl, deleteControl, imageControl} from './script/module/control.js';

const goods = [
  {
    'id': 253842678,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': `Смартфон Xiaomi 11T – это представитель флагманской линейки,
                    выпущенной во второй половине 2021 года. И он полностью 
                    соответствует такому позиционированию, предоставляя своим 
                    обладателям возможность пользоваться отличными камерами, 
                    ни в чем себя не ограничивать при запуске игр и других 
                    требовательных приложений.`,
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'https://static.mvideo.ru/media/Promotions/Promo_Page/2021/December/obzor-xiaomi-11t-i-xiaomi-11t-pro/obzor-xiaomi-11t-i-xiaomi-11t-pro-img-product1.png',
    },
  },
  {
    'id': 296378448,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': `Внедорожник на дистанционном управлении. Скорость 25км/ч. 
                    Возраст 7 - 14 лет`,
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'https://kaypu.com/photo/51fb3c6dcb1de0ff0602d646.jpg',
    },
  },
  {
    'id': 215796548,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': `Всего лишь один шаг сделает ваш телевизор умным, 
                    Быстрый и умный MECOOL KI PRO, прекрасно спроектированный,
                    сочетает в себе прочный процессор Cortex-A53 с чипом 
                    Amlogic S905D`,
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {},
  },
  {
    'id': 246258248,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': `Витая пара Proconnect 01-0043-3-25 является сетевым кабелем 
                    с 4 парами проводов типа UTP, в качестве проводника в 
                    которых используется алюминий, плакированный медью CCA.
                    Такая неэкранированная витая пара с одножильными проводами
                    диаметром 0.50 мм широко применяется в процессе сетевых 
                    монтажных работ. С ее помощью вы сможете обеспечить 
                    развертывание локальной сети в домашних условиях или на 
                    предприятии, объединить все необходимое вам оборудование 
                    в единую сеть.`,
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'https://img.mvideo.ru/Pdb/4162956b.jpg',
    },
  },
];

const init = () => {
  getTotalPricePage(goods);
  renderGoods(goods);
  const {closeModal} = modalControl();
  formControl(goods, closeModal);
  deleteControl(goods);
  imageControl();
};

init();
