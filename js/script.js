import tabs from './modules/tabs';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', () => {

  tabs();
  cards();
  forms();
  modal('[data-modal]', '.modal');
  slider();
  timer();
  calculator();
});
