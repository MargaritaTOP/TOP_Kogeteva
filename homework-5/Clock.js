document.addEventListener('DOMContentLoaded', function() {

    initClock('.round-clock');

    initClock('.square-clock');

    initDigitalClock();
});

function initClock(clockSelector) {
    const clock = document.querySelector(clockSelector);
    const hourHand = clock.querySelector('.hour-hand');
    const minHand = clock.querySelector('.min-hand');
    const secHand = clock.querySelector('.sec-hand');
    const numberContainer = clock.querySelector('.number-container');


    addNumbers(numberContainer, clockSelector.includes('round'));

    function updateClock() {
        const now = new Date();

        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        secHand.style.transform = `rotate(${secondsDegrees}deg)`;

        const minutes = now.getMinutes();
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        minHand.style.transform = `rotate(${minutesDegrees}deg)`;

        const hours = now.getHours();
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }


    hourHand.style.transform = 'rotate(90deg)';
    minHand.style.transform = 'rotate(90deg)';
    secHand.style.transform = 'rotate(90deg)';

    setInterval(updateClock, 1000);
    updateClock();
}

function addNumbers(container, isRound) {
    const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const size = 300;
    const padding = 28;

    numbers.forEach((num, index) => {
        let x, y;

        if (!isRound) {

            switch(index) {
                case 0:
                    x = size / 2;
                    y = padding;
                    break;
                case 3:
                    x = size - padding;
                    y = size / 2;
                    break;
                case 6:
                    x = size / 2;
                    y = size - padding;
                    break;
                case 9:
                    x = padding;
                    y = size / 2;
                    break;
                default:

                    const angle = (index * 30 - 90) * (Math.PI / 180);
                    const radius = size * 0.4;
                    x = Math.cos(angle) * radius + size / 2;
                    y = Math.sin(angle) * radius + size / 2;
            }
        } else {

            const angle = (index * 30 - 90) * (Math.PI / 180);
            const radius = size * 0.4;
            x = Math.cos(angle) * radius + size / 2;
            y = Math.sin(angle) * radius + size / 2;
        }

        const span = document.createElement('span');
        span.textContent = num;
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;

        if (num % 3 === 0) {
            span.classList.add('main');
        }

        container.appendChild(span);
    });
}

function initDigitalClock() {
    const hoursElement = document.querySelector('.digital-clock .hours');
    const minutesElement = document.querySelector('.digital-clock .minutes');
    const secondsElement = document.querySelector('.digital-clock .seconds');

    function updateDigitalClock() {
        const now = new Date();

        hoursElement.textContent = String(now.getHours()).padStart(2, '0');
        minutesElement.textContent = String(now.getMinutes()).padStart(2, '0');
        secondsElement.textContent = String(now.getSeconds()).padStart(2, '0');
    }

    setInterval(updateDigitalClock, 1000);
    updateDigitalClock();
}
