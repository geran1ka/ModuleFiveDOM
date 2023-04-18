'use strict';
// получаем все карточки
const cards = document.querySelectorAll('.item');
// получим все элементы h2
const itemsTitle = document.querySelectorAll('.item__title');
// получим все списки props__list
const propsList = document.querySelectorAll('.props__list');
// перемещение глав
const itemsTwo = document.querySelectorAll('.props__item_two');
const itemsFour = document.querySelectorAll('.props__item_four');
// Переменные для исправления первого замечания по отступу
const itemTitleClone = itemsTitle[0].cloneNode();
const itemTitleFirstCard = document.querySelector('[name = title-items]');
// расположим card 1 после card 3
cards[3].after(cards[0]);
// Замена глав заголовков
propsList[5].before(itemsTitle[1]);
propsList[4].before(itemsTitle[4]);
propsList[2].before(itemsTitle[3]);
itemsTitle[2].textContent = 'This и прототипы объектов';
// второй вариант встаки нового Заглавия
// itemsTitle[2].innerHTML = 'This и прототипы объектов';
// переместим главу 4 из 2-й карточуи в 4-ю
itemsFour[3].after(itemsFour[5]);
// переместим приложения А/Б из 6-й карточуи в 2-ю
itemsTwo[7].after(itemsTwo[8], itemsTwo[9]);
// перемещение глав между 3 и 5 карточками;
itemsTitle[2].after(propsList[4]);
itemsTitle[4].after(propsList[3]);
// удаляем баннер
document.querySelector('.ads').remove();
// вариант для исправления первого замечания по отступу
itemTitleClone.textContent = 'Познакомьтесь, JavaScript';
itemTitleFirstCard.replaceWith(itemTitleClone);
