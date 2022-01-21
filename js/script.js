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

});