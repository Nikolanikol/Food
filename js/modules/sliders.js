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

export default sliders;