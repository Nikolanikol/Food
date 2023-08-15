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
export default calc;