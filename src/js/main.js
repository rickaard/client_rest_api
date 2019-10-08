"use strict";

// Adds the class 'box-shadow' to the header when scroll down from top
// Removes it when scrolled all the way up again
window.addEventListener('scroll', () => {
    const headerEl = document.querySelector('.header_wrapper');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        headerEl.classList.add('box-shadow');
    } else {
        headerEl.classList.remove('box-shadow')
    }
})

const showMenuBtn = document.querySelector('#showMenu');
const closeMenuBtn = document.querySelector('.closeMenu')
showMenuBtn.addEventListener('click', () => {
    document.querySelector('.nav_wrapper').classList.add('show');
});
closeMenuBtn.addEventListener('click', () => {
    document.querySelector('.nav_wrapper').classList.remove('show');
})
