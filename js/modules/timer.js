function timer (selector , deadline){
        function getLeftTime(endTime) {
            //фиксит парсинг даты на IOS
            function parseDate(dateStr) {
                const [year, month, day] = dateStr.split('-').map(Number);
                console.log(new Date(year, month - 1, day))
                return new Date(year, month - 1, day);
                }

            // const leftTimeParse = Date.parse(endTime) - Date.parse(new Date),
            const leftTimeParse = parseDate(endTime).getTime() - new Date().getTime(),
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
export default timer;