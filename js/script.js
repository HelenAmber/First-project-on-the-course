window.addEventListener('DOMContentLoaded', () => {
  

// Add cards 


 // Timer

 

// Modal


// Slider-carousel

const  slides = document.querySelectorAll('.offer__slide'),
       slider = document.querySelector('.offer__slider'),
       prev = document.querySelector('.offer__slider-prev'),
       next = document.querySelector('.offer__slider-next'),
       current = document.querySelector('#current'),
       total = document.querySelector('#total'),
       slidesWrapper = document.querySelector('.offer__slider-wrapper'),
       slidesField  = document.querySelector('.offer__slider-inner'),
       width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1,
    offset = 0;

    function navigationStyle(){
      if(slides.length < 10){
         current.textContent = `0${slideIndex}`;
       } else {
         current.textContent = slideIndex;
       }
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    }
    
    if(slides.length < 10){
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    
    slides.forEach(slide => {
      slide.style.width = width;
    });
    
    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
    dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
    `;
    slider.append(indicators);
    
    for (let i = 0; i < slides.length; i++){
       const dot = document.createElement('li');
             
       dot.setAttribute('data-slide-to', i + 1);
       dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
       `;
    
        if (i == 0){
          dot.style.opacity = 1;
        }
    
       indicators.append(dot);
       dots.push(dot);
    }
    function deleteNotDigits(str){
      return +str.replace(/\D/g, '');
    }
    
    next.addEventListener('click', () => {
      if (offset == deleteNotDigits(width) * (slides.length - 1)){
         offset = 0;
      } else {
         offset += deleteNotDigits(width);
      }
       slidesField.style.transform = `translateX(-${offset}px)`;
    
       if(slideIndex == slides.length){
         slideIndex = 1;
       } else {
         slideIndex++;
       }
       navigationStyle(); 
    });
    
    prev.addEventListener('click', () => {
      if (offset == 0){    
         offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
         offset -= deleteNotDigits(width);
      }
       slidesField.style.transform = `translateX(-${offset}px)`;
    
       if(slideIndex == 1){
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }
      navigationStyle();
    });
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
       const slideTo = e.target.getAttribute('data-slide-to');
       slideIndex = slideTo;
       offset = deleteNotDigits(width) * (slideTo - 1);
       slidesField.style.transform = `translateX(-${offset}px)`;
       navigationStyle();
      });
     });  

//Calculator

const result = document.querySelector('.calculating__result span');

let sex, height, weight, age, ratio;

if(localStorage.getItem('sex')){
  sex = localStorage.getItem('sex');
} else {
  sex = 'female';
  localStorage.setItem('sex', 'female');
}

if(localStorage.getItem('ratio')){
  ratio = localStorage.getItem('ratio');
} else {
  ratio = 1.375;
  localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass){
  const elements = document.querySelectorAll(selector);
  elements.forEach(elem => {
    elem.classList.remove(activeClass);
    if(elem.getAttribute('id') === localStorage.getItem('sex')){
       elem.classList.add(activeClass);
    }
    if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
       elem.classList.add(activeClass);
   }
  });
}

initLocalSettings('#gender div', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function calcTotal(){
  if(!sex || !height || !weight || !age || !ratio){
    result.textContent = 'Недостаточно данных';
    return;
  }

  if (sex === 'female'){
    result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  } else {
    result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
  }
}

function getStaticInformation(selector, activeClass){
  const elements = document.querySelectorAll(selector);

  elements.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        if(e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
  });
}

getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector){
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {

    if(input.value.match(/\D/g)){
       input.style.border = '2px solid red';
    } else {
       input.style.border = 'none';
    }

    switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
    }
    calcTotal();
  });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

});
