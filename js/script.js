window.addEventListener('DOMContentLoaded', () => {

  const tabs = require('./modules/tabs'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        modal = require('./modules/modal'),
        slider = require('./modules/slider'),
        timer = require('./modules/timer'),
        calculator = require('./modules/calculator');

  tabs();
  cards();
  forms();
  modal();
  slider();
  timer();
  calculator();
});
