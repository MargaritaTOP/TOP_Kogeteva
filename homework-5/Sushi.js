document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sushiOrderForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();


        clearErrors();


        if (validateForm()) {

            form.classList.add('hidden');
            successMessage.classList.remove('hidden');

            console.log('Form submitted successfully!');
        }
    });

    function validateForm() {
        let isValid = true;


        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('name-error', 'Пожалуйста, введите ваше имя');
            isValid = false;
        }


        const address = document.getElementById('address').value.trim();
        if (address === '') {
            showError('address-error', 'Пожалуйста, введите ваш адрес');
            isValid = false;
        }


        const phone = document.getElementById('phone').value.trim();
        if (phone === '') {
            showError('phone-error', 'Пожалуйста, введите ваш телефон');
            isValid = false;
        } else if (!/^[\d\s\-\+\(\)]+$/.test(phone)) {
            showError('phone-error', 'Пожалуйста, введите корректный номер телефона');
            isValid = false;
        }


        const email = document.getElementById('email').value.trim();
        if (email === '') {
            showError('email-error', 'Пожалуйста, введите ваш email');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email-error', 'Пожалуйста, введите корректный email');
            isValid = false;
        }


        const sushiSelect = document.getElementById('sushi');
        const selectedSushi = Array.from(sushiSelect.selectedOptions).map(option => option.value);
        if (selectedSushi.length === 0) {
            showError('sushi-error', 'Пожалуйста, выберите хотя бы один вид суши');
            isValid = false;
        }

        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
});
