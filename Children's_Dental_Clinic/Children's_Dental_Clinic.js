document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');


    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });


    const menuItems = menu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menu.classList.remove('active');
            }
        });
    });


});
