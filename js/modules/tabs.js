

function tabs (tabsSelector, tabsContentselector, tabsParentSelector, activeClass){
    const tabHeaderItem = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabsContentselector),
          tabHeaderItems = document.querySelector(tabsParentSelector);
     

    function tabContentHidden() {
        tabContent.forEach((item) => {
            item.classList.add('hidden');
        })
    }
    //функция для отмены скрытия слайда. значение по умолчанию 0
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
export default tabs;