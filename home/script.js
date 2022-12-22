//hamburger animation
const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
    if (hamburger.classList == 'hamburger hamburger--spin') {
        hamburger.classList = 'hamburger hamburger--spin is-active'
    } else {
        hamburger.classList = 'hamburger hamburger--spin'
    }
});
//navbar

function closenav() {
    const nav = document.querySelector('nav');
    nav.style.left = '-300px'
}

function opennav() {
    const nav = document.querySelector('nav');
    nav.style.left = '0px'
}