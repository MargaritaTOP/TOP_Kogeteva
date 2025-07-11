document.addEventListener('DOMContentLoaded', function () {
	const menuToggle = document.getElementById('menuToggle')
	const menu = document.getElementById('menu')

	if (menuToggle && menu) {
		menuToggle.addEventListener('click', function () {
			menu.classList.toggle('active')
		})

		const menuItems = menu.querySelectorAll('a')
		menuItems.forEach(item => {
			item.addEventListener('click', function () {
				if (window.innerWidth <= 768) {
					menu.classList.remove('active')
				}
			})
		})
	}

	const navLinks = document.querySelectorAll('.nav-link')
	const contentTemplates = document.querySelectorAll('.content-template')
	const mainContent = document.querySelector('.main-content')

	// Главная страница по умолчанию
	const defaultContent = document.querySelector('.section-1, .section-2')

	navLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault()
			const contentId = this.getAttribute('data-content') + '-content'

			contentTemplates.forEach(template => {
				template.style.display = 'none'
			})

			if (this.getAttribute('data-content') === 'home') {
				if (mainContent && defaultContent) {
					mainContent.innerHTML = ''
					mainContent.appendChild(defaultContent.cloneNode(true))
				}
				return
			}

			const selectedContent = document.getElementById(contentId)
			if (selectedContent && mainContent) {
				mainContent.innerHTML = ''
				const clonedContent = selectedContent.cloneNode(true)
				clonedContent.style.display = 'block'
				mainContent.appendChild(clonedContent)
			}
		})
	})

	const appointmentBtn = document.querySelector('.appointment-btn')
	if (appointmentBtn) {
		appointmentBtn.addEventListener('click', function () {
			// Здесь может быть код для открытия формы записи
			alert('Форма записи на прием будет здесь!')
		})
	}
})

function initYandexMap() {
	// Координаты клиники (Москва, ул. Детская, д. 19)
	const clinicCoords = [55.812677, 37.71674]

	// Создаем карту
	const map = new ymaps.Map('yandexMap', {
		center: clinicCoords,
		zoom: 17,
		controls: ['zoomControl'],
	})

	// Добавляем маркер клиники
	const clinicPlacemark = new ymaps.Placemark(
		clinicCoords,
		{
			hintContent: 'Детская стоматология "Улыбка"',
			balloonContent: 'ул. Детская, д. 19',
			balloonContentHeader: 'Стоматология "Улыбка"',
			balloonContentBody: 'Детская стоматология<br>ул. Детская, 19',
		},
		{
			preset: 'islands#blueMedicalIcon',
			iconColor: '#4fc3f7',
		}
	)

	map.geoObjects.add(clinicPlacemark)

	// Кнопка "Мое местоположение"
	document.getElementById('locateMe').addEventListener('click', function () {
		ymaps.geolocation
			.get({
				provider: 'browser',
				mapStateAutoApply: true,
			})
			.then(function (result) {
				// Получаем координаты пользователя
				const userCoords = result.geoObjects.position

				// Добавляем маркер текущего местоположения
				const userPlacemark = new ymaps.Placemark(
					userCoords,
					{
						hintContent: 'Ваше местоположение',
						balloonContent: 'Вы здесь',
					},
					{
						preset: 'islands#greenDotIcon',
					}
				)

				map.geoObjects.add(userPlacemark)

				// Центрируем карту, чтобы были видны оба маркера
				map.setBounds([userCoords, clinicCoords], {
					checkZoomRange: true,
				})
			})
			.catch(function (error) {
				alert('Не удалось определить ваше местоположение: ' + error.message)
			})
	})

	// Кнопка "Построить маршрут"
	document.getElementById('showRoute').addEventListener('click', function () {
		ymaps.geolocation
			.get({
				provider: 'browser',
			})
			.then(function (result) {
				const userCoords = result.geoObjects.position
				window.open(
					`https://yandex.ru/maps/?rtext=${userCoords[0]},${userCoords[1]}~55.812677,37.716740&rtt=auto`
				)
			})
			.catch(function () {
				window.open('https://yandex.ru/maps/?text=ул. Детская, д. 19, Москва')
			})
	})
}

// Загрузка API Яндекс.Карт
function loadYandexMaps() {
	const script = document.createElement('script')
	script.src =
		'https://api-maps.yandex.ru/2.1/?apikey=6x205951-1726-435c-M16-Gbccd1974f65&lang=ru_RU'
	script.onload = function () {
		ymaps.ready(initYandexMap)
	}
	document.body.appendChild(script)
}

// Загружаем карту при открытии вкладки контактов
const contactsLink = document.querySelector('[data-content="contacts"]')
contactsLink.addEventListener('click', function () {
	if (!window.ymaps) {
		loadYandexMaps()
	} else {
		initYandexMap()
	}
})
