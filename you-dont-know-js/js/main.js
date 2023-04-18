'use strict';
// получаем все карточки
const cards = document.querySelectorAll('.item');

// расположим card 1 после card 3
cards[3].after(cards[0]);

// получим все списки props__list
const propsList = document.querySelectorAll('.props__list');

// получим все элементы h2
const itemsTitle = document.querySelectorAll('.item__title');

// Замена глав заголовков
propsList[5].before(itemsTitle[0]);
propsList[1].before(itemsTitle[3]);
propsList[4].before(itemsTitle[4]);

// перемещение глав
const itemsTwo = document.querySelectorAll('.props__item_two');
const itemsFour = document.querySelectorAll('.props__item_four');

// переместим главу 4 из 2-й карточуи в 4-ю
itemsFour[3].after(itemsFour[0]);

// переместим приложения А/Б из 6-й карточуи в 2-ю
itemsTwo[7].after(itemsTwo[8], itemsTwo[9]);

// перемещение глав между 3 и 5 карточками;
itemsTitle[1].after(propsList[4]);

itemsTitle[4].after(propsList[2]);

// удаляем баннер
document.querySelector('.ads').remove();
