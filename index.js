'use strict';

const body = document.querySelector('.body');
const container = document.createElement('div');
container.classList.add('container');
const input = document.createElement('input');
input.classList.add('input');
const paragraf = document.createElement('p');
paragraf.classList.add('text');

container.append(input, paragraf);
body.append(container);

let delay;

input.addEventListener('input', () => {
  clearTimeout(delay);

  delay = setTimeout(() => {
    paragraf.textContent = input.value;
  }, 300);
});


