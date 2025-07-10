document.addEventListener('DOMContentLoaded', function() {
    const experienceSlider = document.getElementById('experience');
    const experienceValue = document.getElementById('experienceValue');
    const registrationForm = document.getElementById('registrationForm');
    const gameVideo = document.getElementById('gameVideo');
    const card = document.querySelector('.card');
    
    experienceSlider.addEventListener('input', function() {
        experienceValue.textContent = this.value;
    });
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            nickname: document.getElementById('nickname').value,
            email: document.getElementById('email').value,
            birthdate: document.getElementById('birthdate').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            country: document.getElementById('country').value,
            heroType: document.getElementById('heroType').value,
            experience: document.getElementById('experience').value
        };
        
        localStorage.setItem('gameUserData', JSON.stringify(formData));
        

        card.classList.add('hide-form');
        

        gameVideo.style.display = 'block';
        gameVideo.style.zIndex = '10000';
        

        const playPromise = gameVideo.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
    
                gameVideo.controls = false; 
            })
            .catch(error => {
              
                gameVideo.controls = true;
                console.error("Autoplay failed:", error);
            });
        }
        

        const exitBtn = document.createElement('button');
        exitBtn.id = 'exitBtn';
        exitBtn.className = 'btn btn-danger btn-exit';
        exitBtn.innerHTML = '<i class="bi bi-box-arrow-left me-2"></i>Выход';
        exitBtn.style.position = 'fixed';
        exitBtn.style.bottom = '20px';
        exitBtn.style.right = '20px';
        exitBtn.style.zIndex = '10001';
        
        document.body.appendChild(exitBtn);
        
        exitBtn.addEventListener('click', function() {
            gameVideo.pause();
            gameVideo.currentTime = 0;
            gameVideo.style.display = 'none';
            card.classList.remove('hide-form');
            document.body.removeChild(exitBtn);
        });
    });
});