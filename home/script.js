//hamburger animation
const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
    if (hamburger.classList == 'hamburger hamburger--spin') {
        hamburger.classList = 'hamburger hamburger--spin is-active'
    } else {
        hamburger.classList = 'hamburger hamburger--spin'
    }
});