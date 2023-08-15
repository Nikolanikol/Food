/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    // калькулятор

let height, weight, age, sex, ratio;

// работа с localStorage дя сохранения состояния введенных данных
if (localStorage.getItem('sex')) { //если значение установлено
    sex = localStorage.getItem('sex');
} else {
    sex = 'female'; //если значение отсутствует назначаем по умолчанию
    localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
}

const totalCalories = document.querySelector('.calculating__result span');

//функция для установки класса активности на основе состояния localStorage
function localStorageClassActiveAdd(parent, activeClass){
    let elements = document.querySelectorAll(parent);

    elements.forEach(item => {
        item.classList.remove(activeClass);
        if(item.getAttribute('id') === localStorage.getItem('sex')){
            item.classList.add(activeClass);
        }

        if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')){
            item.classList.add(activeClass);
            console.log(`my item ${item}`)
        }
    })
}

localStorageClassActiveAdd("#gender div","calculating__choose-item_active");
localStorageClassActiveAdd('.calculating__choose_big div',"calculating__choose-item_active");

//основная функция для расчета
function calcTotal(height, weight, age) {
    let resultCalories;
    //если одного из введенных значений нет, устанавливаем totalCalories
    if (!height || !weight || !age) {
        totalCalories.innerText = '___';
        return; // способ сразу завершить функцию
    }

    if (sex === 'male') {
        resultCalories = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
        totalCalories.innerText = resultCalories;
    } else if (sex === 'female') {
        resultCalories = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(0);
        totalCalories.innerText = resultCalories;
    }
    if (Number.isNaN(+resultCalories)){
        totalCalories.innerText = 'Ошибка';
    }
}
calcTotal(height, weight, age, sex, ratio);

// функция для получения информации из кнопок калькулятора
function getStaticInformation(parentSelector, classActive) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    document.querySelector(parentSelector).addEventListener('click', (e) => {
        if (e.target.getAttribute("data-ratio")) {
            ratio = e.target.getAttribute("data-ratio"); 
            localStorage.setItem('ratio', e.target.getAttribute("data-ratio")); //метод .setItem() пинимает два аргумента, ключ значение
            calcTotal(height, weight, age, sex, ratio);

            elements.forEach(item => {
                item.classList.remove(classActive);
            })
            e.target.classList.add(classActive);

            calcTotal(height, weight, age, sex, ratio);

        } else if (e.target.getAttribute('id') === 'male' || e.target.getAttribute('id') === 'female') {
            sex = e.target.getAttribute('id');
            e.target.classList.add(classActive);
            localStorage.setItem('sex', e.target.getAttribute('id'))

            elements.forEach(item => {
                item.classList.remove(classActive);
            })
            e.target.classList.add(classActive);

            calcTotal(height, weight, age, sex, ratio);
        }
    })
}

getStaticInformation("#gender", "calculating__choose-item_active");
getStaticInformation('.calculating__choose_big', "calculating__choose-item_active");

//функция для получения информации из полей input
function getDinamicInformation() {
    const dinamicField = document.querySelector('.calculating__choose_medium');
    const dinamicFieldChild = dinamicField.querySelectorAll('.calculating__choose-item');

    dinamicFieldChild.forEach(item => {
        item.addEventListener('input', (e) => {
            if (e.target.value.match(/\D/g)) { // устанавливаем проверку для введенных значений. если ввели не цифру, добавляем красный border
                e.target.style.border = '1px solid red';
                totalCalories.innerText = '___';
            } else {
                e.target.style.border = 'none'
            }

            if (e.target.getAttribute('id') === 'height') {// значение input можно получить из свойства value
                height = e.target.value;
            } else if (e.target.getAttribute('id') === 'weight') {
                weight = e.target.value;
            } else if (e.target.getAttribute('id') === 'age') {
                age = e.target.value;
            }
            calcTotal(height, weight, age, sex, ratio);
        })
    })
}
getDinamicInformation();


}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
     // класс
    const menu = document.querySelector('.menu'),
        menuCards = menu.querySelector('.container');

    class ClassTest {
        constructor(imgSource, alt, title, description, price) { //проектируем объект с заданными аргументами
            this.imgSource = imgSource;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
        }
        renderCard() { // создаем метод render, который будет созадвать карточки на основе принятых аргументов
            const div = document.createElement('div'); // 1. создаем блок 
            // 2. добавляем в блок html элемент
            div.innerHTML = ` 
                            <div class="menu__item">
                                <img src=${this.imgSource} alt=${this.alt}>
                                <h3 class="menu__item-subtitle">${this.title}</h3>
                                <div class="menu__item-descr">${this.description}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                </div>
                            </div>
                            `;
            menuCards.append(div); // 3. добавляем сформированный блок в обертку для карточек
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu') // для формирования карточек получаем ответ от сервера.
                                            // Ответ приходит в виде promise. обрабатываем его через then
        .then(data => {// data приходит в виде массива из 3 объектов
            data.forEach(({ img, altimg, title, descr, price }) => { //перебираем элементы data с помощью класса ClassTest
                new ClassTest(img, altimg, title, descr, price).renderCard()
            })
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalSelector){
     // forms
     const forms = document.querySelectorAll(formSelector); // находим элементы форм. на странице их две

     forms.forEach(item => {
         postDataForm(item) //перебираем формы с помощью функции, которая включает в себя запрос на сервер
     })
     //объект с ответами на запрос
     const message = {
         loading: 'img/form/spinner.svg',
         sucsess: 'Спасибо мы с вами свяжемся',
         failure: 'Что-то пошло не так'
     }

     function postDataForm(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault();  //обнуляем настройки формы, для того чтобы не происходила перезагрузка страницы
            
             //формируем индикатор загрузки запроса
             const statusMessage = document.createElement('img');
             statusMessage.src = message.loading;
             statusMessage.style.cssText = 'margin: 0 auto; display: block;'
             statusMessage.textContent = message.loading;
             form.insertAdjacentElement('afterend', statusMessage);
 
             const formData = new FormData(form); //специальный объект FormData принимает в себя значение из формы. Т.к. из этого объекта нельзя просто так достать данные, парсим его в следующей строке
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // метод .entries() разбивает объект на массив, состоящий из массивов [key, value]
            //метод глобального объекта .fromEntries делает обратную операцию
            // в конце превращаем полученный обьект в json 
 
             (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                 .then((data) => {
                     console.log(data);
                     showThanksModal(message.sucsess);
                 })
                 .catch((data) => {
                     console.log(data)
                     showThanksModal(message.failure);
                 })
                 .finally(() => {
                     form.reset();
                     statusMessage.remove();
                 })
 
             //     request.addEventListener('load', ()=>{
             //         if(request.status === 200){
             //             console.log(request.response);
             //             showThanksModal(message.sucsess);
             //             form.reset();
             //             statusMessage.remove();
             //         }else{
             //             showThanksModal(message.failure);
             //             form.reset();
             //             statusMessage.remove();
             //         }
             //     })
             // })
         })
 
         // создаем функцию для создания/оповещения пользователя об отправке запроса
         function showThanksModal(message) {
             // получаем modal__dialog  и скрываем его
             const prevModalDialog = document.querySelector('.modal__dialog'),
                   modal = document.querySelector(modalSelector);
             prevModalDialog.classList.add('hidden');

             // создаем окно с сообщением и присваиваем ему класс modal__dialog лдя того чтобы применились старые стили
             const thanksModal = document.createElement('div');
             thanksModal.classList.add('modal__dialog');
             thanksModal.innerHTML = `
                                        <div class='modal__content'>
                                            <div class='modal__close' data-modal-close>×</div>
                                            <div class='modal__title'>${message}</div>
                                        </div>
                                    `;
             document.querySelector('.modal').append(thanksModal);
             
             const modalSetTimeOutId = setTimeout(() => {
                 thanksModal.remove()
                 prevModalDialog.classList.remove('hidden');
                 (0,_modals__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');
             }, 4000);

             modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.getAttribute('data-modal-close') == '') {
                    thanksModal.remove()
                    prevModalDialog.classList.remove('hidden');
                    (0,_modals__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');            
                    clearTimeout(modalSetTimeOutId);
                }
            })
         }
     }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   modalClose: () => (/* binding */ modalClose),
/* harmony export */   modalOpen: () => (/* binding */ modalOpen)
/* harmony export */ });
//вынесли функции открытия/закрытия наверх т.к. есть зависимость с модулем forms
function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show')
}

function modalOpen(modalSelector, modalTimerId) {
    const  modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    //обнуляем вызов модального окна через таймер
    if(modalTimerId){
        clearInterval(modalTimerId);
    }
};

function modals (modalTrigger, modalSelector, modalTimerId){
        // модальное окно
        const modal = document.querySelector(modalSelector),
              btnTrigger = document.querySelectorAll(modalTrigger);
    // закрытие модального окна через крестик
    btnTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOpen(modalSelector, modalTimerId);
            clearTimeout(modalTimerId);
        });
    });
    //закрытие модального окна через клик по подложке
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-modal-close') == '') {
            modalClose(modalSelector);
        }
    })
    //закрытие модального окна через esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose(modalSelector);
        }
    })
    // вызов модального окна через скролл
    // для очистки ожидания события, создали отдельную функцию. в этой же функции и обнулили ожидание события
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen(modalSelector, modalTimerId);
            removeEventListener('scroll', showModalByScroll) 
        }
    };
    window.addEventListener('scroll',showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);



/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function sliders({
    container, 
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field 
    }){
    // slider
    let offset = 0;
    let slideIndex = 1;
    const slides = document.querySelectorAll(slide), //псевдомассив со слайдами
        sliderParent = document.querySelector(container), //родительский блок
        counter = sliderParent.querySelector(currentCounter), //счетчик
        total = sliderParent.querySelector(totalCounter), //счетчик общего количества слайдов
        minus = sliderParent.querySelector(prevArrow),
        plus = sliderParent.querySelector(nextArrow),
        slidesField = document.querySelector(wrapper), //поле содержащее все слайды
        slidesWrapper = document.querySelector(field), // обертка/родитель через которая видно активный слайд
        width = window.getComputedStyle(slidesWrapper).width; //получаем computed style для обертки слайдов

    slidesField.style.width = 100 * slides.length + '%'; // устанавливаем ширину для поля со слайдами
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; //все что находится вне обертки, будет скрыто
    slides.forEach(slide => {
        slide.style.width = width;  // указывает фиксированную ширину для каждого слайда
    })

    counter.textContent = `0${slideIndex}`; // устанавливаем начальные значения счетчика и проводим проверку
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    };

    function counterPlus(n) { //функция для изменения счетчика 
        slideIndex = slideIndex + n;
        if (slideIndex < 1) {
            slideIndex = slides.length;
        } else if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        if (slideIndex < 10) {
            counter.innerText = `0${slideIndex}`;
        } else if (slideIndex >= 10) {
            counter.innerText = slideIndex;
        }
    }
    plus.addEventListener('click', () => { // пролистывание слайдера через отступы
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {//если отступ имеет максимально допустимое значение, обнуляем
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, ''); // в противном случае, увеличиваем отступ. с увеличением отступа будет сдвигаться слайдер
        }
        slidesField.style.transform = `translateX(-${offset}px)`;//применяем изменение отступа через полученное значение offset
        counterPlus(1);
        slidesActiveStatus(dotArray);
    })
    minus.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        };
        slidesField.style.transform = `translateX(-${offset}px)`;
        counterPlus(-1);
        slidesActiveStatus(dotArray);
    })

    // counter.textContent = `0${slideIndex}`;
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // };
    // showSlides(slideIndex);

    // function showSlides(n){
    //     if(n > slides.length){
    //          slideIndex = 1;
    //     }
    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(slide =>{
    //         slide.classList.add('hidden')
    //     })
    //     slides[slideIndex-1].classList.remove('hidden');
    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }
    // minus.addEventListener('click',()=>{
    //     plusSlides(-1)
    // })
    // plus.addEventListener('click', ()=>{
    //     plusSlides(1);
    // });

    // if(slides.length < 10){
    //     total.innerText = `0${slides.length}`
    // }else if(slides.length > 10){
    //     total.innerText = slides.length;
    // }
    // showSlides(1)


    // мой вариант
    // function showSlides(n){
    //     // поверка для slideIndex
    //     if(slideIndex > slides.length){
    //         slideIndex = 1;
    //     }else if(slideIndex < 1){
    //         slideIndex = slides.length;
    //     }
    //     //переключаем слайды
    //     slides.forEach(slide=>{
    //         slide.classList.add('hidden');
    //     });
    //     slides[slideIndex - 1].classList.remove('hidden');
    //     //переключаем счетчик
    //     if(n < 10){
    //         counter.innerText = `0${slideIndex}`
    //     }else(
    //         counter.innerText = slideIndex
    //     )

    // }

    // plus.addEventListener('click',()=>{
    //     slideIndex+=1;
    //     showSlides(slideIndex)
    // });
    // minus.addEventListener('click',()=>{
    //     slideIndex-=1;
    //     showSlides(slideIndex)
    // })


    // навигация для слайдера
    slidesWrapper.style.position = 'relative';

    //для точек навигации создаем обертку в виде списка
    const dotWrapper = document.createElement('ul'),
        dotArray = [];

    dotWrapper.classList.add('carousel-indicators');
    //перебираем массив со слайдами и на каждый слайд создаем точку навигации и пушим ее в массив
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('ul');
        dot.classList.add('dot');
        dot.setAttribute('slideNumber', i + 1);
        dotArray.push(dot);
        dotWrapper.append(dot);
    };

    slidesWrapper.append(dotWrapper);
    
    // функция отслеживания активности слайда
    function slidesActiveStatus(arr) {
        arr.forEach(slide => {
            slide.style.opacity = '0.5';
        });
        arr[slideIndex - 1].style.opacity = '1';
    };

    slidesActiveStatus(dotArray);

    //функция обработчик событий для навигации слайдера
    function slidesClick(arr) {
        arr.forEach(slide => {
            slide.addEventListener('click', (e) => {
                const slideNumber = slide.getAttribute('slideNumber');
                slideIndex = slideNumber;
                offset = +width.replace(/\D/g, '') * (slideNumber - 1);
                slidesField.style.transform = `translateX(-${offset}px)`;
                slidesActiveStatus(dotArray);
                if (slideIndex < 10) {
                    counter.innerText = `0${slideIndex}`;
                } else if (slideIndex >= 10) {
                    counter.innerText = slideIndex;

                }
            })
        })
    };
    slidesClick(dotArray);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function tabs (tabsSelector, tabsContentselector, tabsParentSelector, activeClass){
    const tabHeaderItem = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabsContentselector),
          tabHeaderItems = document.querySelector(tabsParentSelector);
          console.log(`tabheaderItem ${tabHeaderItem}`)
          console.log(`tabContent${tabContent}`)
          console.log(`tabHeaderItems$${tabHeaderItems}`)
function tabContentHidden() {
    tabContent.forEach((item) => {
        item.classList.add('hidden');
    })
}
function tabContentHiddenRemove(i = 0) {
    tabContent[i].classList.remove('hidden');
}
function tabContentShow(i) {
    tabContent.forEach(item => {
        item.classList.remove('show');
    })
    tabContent[i].classList.add('show');
}
tabContentHidden();
tabContentHiddenRemove();

tabHeaderItems.addEventListener('click', (event) => {
    console.log('tabs click')
    if (event.target.className == tabsSelector.slice(1)) {
        tabHeaderItem.forEach((item) => {
            item.classList.remove(activeClass)
            tabContentHidden();
        });
        event.target.classList.add(activeClass);

    }
    tabHeaderItem.forEach((item, i) => {
        if (item.classList.contains(activeClass)) {
            tabContentHiddenRemove(i);
        }
    })
})
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (selector , deadline){
       // timer////////////
    //    let endTime = new Date(2023, 11, 9, 21, 35)
    //    let nowTime = new Date();
       // функция получения остатка времени.возвращает обьект данных
       function getLeftTime(endTime) {
           
            const leftTimeParse = Date.parse(endTime) - Date.parse(new Date),
               day = Math.floor(leftTimeParse / (24 * 60 * 60 * 1000)),
               hours = Math.floor((leftTimeParse / (1000 * 60 * 60) % 24)),
               minute = Math.floor((leftTimeParse / (1000 * 60)) % 60),
               second = Math.floor((leftTimeParse / 1000) % 60);
           return {
               day: day,
               hours: hours,
               minute: minute,
               second: second,
               leftTimeParse: leftTimeParse,
           }
       }
   
       // 1. получаем элементы из документа 
   
       function setLeftTime(selector, deadline) {

           let timer = document.querySelector(selector),
               days = timer.querySelector('#days'),
               hours = timer.querySelector('#hours'),
               minutes = timer.querySelector('#minutes'),
               seconds = timer.querySelector('#seconds'),
               // 2 таймаут для обновления таймера
               setTimeOut = setInterval(updateClock, 1000);
   
           function updateClock() {
               let leftTimeObj = getLeftTime(deadline);
               days.innerHTML = leftTimeObj.day;
               hours.innerHTML = leftTimeObj.hours;
               minutes.innerHTML = leftTimeObj.minute;
               seconds.innerHTML = leftTimeObj.second;
               //  3 проверка для сброса таймера
               if (leftTimeObj.leftTimeParse <= 0) {
                   clearInterval(setTimeOut);
               }
           };
       }

       setLeftTime(selector, deadline)
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
}

const getResource = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status ${response.status}`)
    }
    return response.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









document.addEventListener('DOMContentLoaded', () => {
    // tab/////////
    // вызов модального окна через таймаут
    const modalTimerId = setTimeout(()=>(0,_modules_modals__WEBPACK_IMPORTED_MODULE_3__.modalOpen)('.modal', modalTimerId), 3000);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', '.modal');
    (0,_modules_modals__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal-trigger]','.modal', modalTimerId);
    (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container:'.offer__slider',
        slide : '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-inner', 
        field: '.offer__slider-wrapper'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item','.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2023-11-9');
})


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map