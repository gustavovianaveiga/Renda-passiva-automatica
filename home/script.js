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
//grafico pizza
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});