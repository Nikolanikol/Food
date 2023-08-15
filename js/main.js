import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modals from './modules/modals';
import sliders from './modules/sliders';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { modalOpen } from './modules/modals';

document.addEventListener('DOMContentLoaded', () => {
    // tab/////////
    // вызов модального окна через таймаут
    const modalTimerId = setTimeout(()=>modalOpen('.modal', modalTimerId), 3000);
    calc();
    cards();
    forms('form', '.modal');
    modals('[data-modal-trigger]','.modal', modalTimerId);
    sliders({
        container:'.offer__slider',
        slide : '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-inner', 
        field: '.offer__slider-wrapper'
    });
    tabs('.tabheader__item','.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-11-9');
})

