import { modalClose, modalOpen } from "./modals";
import { postData } from "../services/services";

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
 
             postData('http://localhost:3000/requests', json)
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
                 modalClose('.modal');
             }, 4000);

             modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.getAttribute('data-modal-close') == '') {
                    thanksModal.remove()
                    prevModalDialog.classList.remove('hidden');
                    modalClose('.modal');            
                    clearTimeout(modalSetTimeOutId);
                }
            })
         }
     }
}
export default forms;