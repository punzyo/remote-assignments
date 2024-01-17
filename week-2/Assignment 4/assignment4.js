//Request 1
const headline = document.getElementById('header-welcome');
const changeMessage = () => {
    headline.textContent = 'Have a Good Time!';
}
headline.addEventListener('click', changeMessage);

//Request 2
const menuIcon = document.getElementById('menu-icon');
const menuList = document.getElementById('mobile-menu');
const closeIcon = document.getElementById('mobile-closeIcon')
const showList = () => {
    menuList.style.right = '0';
}
const closeList = () => {
    menuList.style.right = '-100%';
}
menuIcon.addEventListener('click', showList);
closeIcon.addEventListener('click', closeList);

//Request 3
const actionBtn = document.getElementById('main-action');
const hiddenBox = document.getElementById('hidden-box');
const showBox = () => {
    hiddenBox.style.display = 'grid';
}
actionBtn.addEventListener('click', showBox);