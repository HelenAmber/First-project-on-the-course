window.addEventListener('DOMContentLoaded', () => {
  //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

          function hideTabContent() {
            tabsContent.forEach((item) =>{
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach((item) => {
                item.classList.remove('tabheader__item_active');
            });
          }

          function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide'); 
            tabs[i].classList.add('tabheader__item_active');
          }
          hideTabContent();
          showTabContent();

          tabsParent.addEventListener('click', (event) => {
             const target = event.target;

             if (target && target.classList.contains('tabheader__item')){
                tabs.forEach((item, i) => {
                  if(target == item) {
                     hideTabContent();
                     showTabContent(i);
                   }
                });
             }
          });  


// Add cards 
class Card {
  constructor(src, alt, title,descr, price, parenrSelector, ...classes){
     this.src = src;
     this.alt = alt;
     this.title = title;
     this.descr = descr;
     this.price = price;
     this.parent = document.querySelector(parenrSelector);
     this.classes = classes;
     this.transfer = 27;
     this.changeToUAH();
  }

  changeToUAH() { 
    this.price = this.price*this.transfer;
 }

  render(){
    const element = document.createElement('div');

      if(this.classes.length === 0){
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
  
    element.innerHTML = `
       <img src=${this.src} alt=${this.alt}>
         <h3 class="menu__item-subtitle">${this.title}</h3>
           <div class="menu__item-descr">${this.descr}</div>
           <div class="menu__item-divider"></div>
           <div class="menu__item-price">
           <div class="menu__item-cost">Цена: </div>
           <div class="menu__item-total"><span>${this.price}</span> грн/день
           </div>`;

   this.parent.append(element);
  }
}

new Card (
  "img/tabs/vegy.jpg", 
  "vegy", 
  'Меню "Фитнес"', 
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  9, 
  '.menu .container'
 ).render();

 new Card (
  "img/tabs/elite.jpg", 
  "elite", 
  'Меню “Премиум”', 
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  21, 
  '.menu .container'
 ).render();

 new Card (
  "img/tabs/post.jpg", 
  "post", 
  'Меню "Постное"', 
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  16, 
  '.menu .container'
 ).render();

 // Timer

 const deadLine = '2022-03-18';

 function getTimeRemaining(endtime){
     const t = Date.parse(endtime) - Date.parse(new Date()),
           days = Math.floor(t/(1000 * 60 * 60 * 24)),
           hours = Math.floor(t/(1000 * 60 * 60) % 24),
           minutes = Math.floor(t/(1000 * 60) % 60),
           seconds = Math.floor((t/1000) % 60);

     return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
         };
 }

 function getZero(num){
  if (num >=0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function setClock(selector, endtime){
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
          updateClock();

          function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
              clearInterval(timeInterval);
            }
          }

}
setClock('.timer', deadLine);

});

// Modal
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide'); 
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}

modalTrigger.forEach((btn) => {
    btn.addEventListener('click', openModal);
});

function closeModal(){
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.getAttribute('data-close')== '') {
   closeModal();
  }
 }
);

document.addEventListener('keydown', (e) => {
 if(e.code === 'Escape' && modal.classList.contains('show')){
   closeModal();    
 }
});

const modalTimerId = setTimeout(openModal, 50000);

function showModalByScroll(){
  if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  }
}
window.addEventListener('scroll', showModalByScroll);

// Forms

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
    
