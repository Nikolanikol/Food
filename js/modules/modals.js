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

export default modals;
export {modalClose};
export {modalOpen};