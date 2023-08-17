import { getResource } from "../services/services";

function cards(){
     // класс
    const menu = document.querySelector('.menu'),
        menuCards = menu.querySelector('.container'),
        menuArray =  [
            {
              "img": "img/tabs/vegy.jpg",
              "altimg": "vegy",
              "title": "Меню 'Фитнес'",
              "descr": "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
              "price": 9
            },
            {
              "img": "img/tabs/post.jpg",
              "altimg": "post",
              "title": "Меню 'Постное'",
              "descr": "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
              "price": 14
            },
            {
              "img": "img/tabs/elite.jpg",
              "altimg": "elite",
              "title": "Меню 'Премиум'",
              "descr": "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
              "price": 21
            }
          ];


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
    menuArray.forEach(({ img, altimg, title, descr, price })=>{
        new ClassTest(img, altimg, title, descr, price).renderCard()
    })

    // getResource('http://localhost:3000/menu') // для формирования карточек получаем ответ от сервера.
    //                                         // Ответ приходит в виде promise. обрабатываем его через then
    //     .then(data => {// data приходит в виде массива из 3 объектов
    //         data.forEach(({ img, altimg, title, descr, price }) => { //перебираем элементы data с помощью класса ClassTest
    //             new ClassTest(img, altimg, title, descr, price).renderCard()
    //         })
    //     });
}

export default cards;