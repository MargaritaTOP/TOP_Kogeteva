document.addEventListener('DOMContentLoaded', function () {
	//  исходное содержимое главной страницы
	const mainContent = document.querySelector('.main-content')
	const defaultContent = mainContent.innerHTML

	const navLinks = document.querySelectorAll('.nav-link')
	const contentTemplates = document.querySelectorAll('.content-template')

	//  инициализация карты после загрузки контента
	function initMapAfterLoad() {
		if (typeof ymaps !== 'undefined') {
			initYandexMap()
		} else {
			loadYandexMaps()
		}
	}

	// кнопки  на странице "Услуги"
	document.addEventListener('click', function (e) {
		if (e.target.classList.contains('service-btn')) {
			e.preventDefault()

			//  ссылка на вкладку "Цены"
			const pricesLink = document.querySelector(
				'.nav-link[data-content="prices"]'
			)

			if (pricesLink) {
				// Имитир. клик по этой ссылке, чтобы перек на вкл "Цены"
				pricesLink.click()
			}
		}
	})

	navLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault()
			const contentId = this.getAttribute('data-content') + '-content'

			contentTemplates.forEach(template => {
				template.style.display = 'none'
			})

			if (this.getAttribute('data-content') === 'home') {
				//  исходное содержимое для главной страницы
				mainContent.innerHTML = defaultContent
			} else {
				const selectedContent = document.getElementById(contentId)
				if (selectedContent) {
					mainContent.innerHTML = ''
					const clonedContent = selectedContent.cloneNode(true)
					clonedContent.style.display = 'block'
					mainContent.appendChild(clonedContent)

					// Инициализируем карту после загрузки контактов
					if (contentId === 'contacts-content') {
						setTimeout(initMapAfterLoad, 100)
					}
				}
			}

			navLinks.forEach(navLink => {
				navLink.classList.remove('active')
			})
			this.classList.add('active')
		})
	})

	// Обработчик для меню в футере
	const footerLinks = document.querySelectorAll('.footer-menu a')
	footerLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault()
			const contentId = this.getAttribute('href').substring(1) + '-content'

			contentTemplates.forEach(template => {
				template.style.display = 'none'
			})

			if (this.getAttribute('href') === '#home') {
				mainContent.innerHTML = defaultContent
			} else {
				const selectedContent = document.getElementById(contentId)
				if (selectedContent) {
					mainContent.innerHTML = ''
					const clonedContent = selectedContent.cloneNode(true)
					clonedContent.style.display = 'block'
					mainContent.appendChild(clonedContent)

					if (contentId === 'contacts-content') {
						setTimeout(initMapAfterLoad, 100)
					}
				}
			}

			navLinks.forEach(navLink => {
				navLink.classList.remove('active')
				if (
					navLink.getAttribute('data-content') ===
					this.getAttribute('href').substring(1)
				) {
					navLink.classList.add('active')
				}
			})

			window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	})

	function setActiveTab(tabName) {
		navLinks.forEach(navLink => {
			navLink.classList.toggle(
				'active',
				navLink.getAttribute('data-content') === tabName
			)
		})

		footerLinks.forEach(footerLink => {
			footerLink.classList.toggle(
				'active',
				footerLink.getAttribute('href') === `#${tabName}`
			)
		})
	}

	const DOM = {
		navLinks: document.querySelectorAll('.nav-link'),
		contentTemplates: document.querySelectorAll('.content-template'),
		mainContent: document.querySelector('.main-content'),
		defaultContent: document.querySelector('.section-1, .section-2'),
		appointmentBtn: document.querySelector('.appointment-btn'),
		menuToggle: document.getElementById('menuToggle'),
		menu: document.getElementById('menu'),
		locateMeBtn: document.getElementById('locateMe'),
		showRouteBtn: document.getElementById('showRoute'),
	}

	function initMobileMenu() {
		if (DOM.menuToggle && DOM.menu) {
			DOM.menuToggle.addEventListener('click', function () {
				DOM.menu.classList.toggle('active')
				this.setAttribute(
					'aria-expanded',
					DOM.menu.classList.contains('active')
				)
			})

			const menuItems = DOM.menu.querySelectorAll('a')
			menuItems.forEach(item => {
				item.addEventListener('click', function () {
					if (window.innerWidth <= 768) {
						DOM.menu.classList.remove('active')
						DOM.menuToggle.setAttribute('aria-expanded', 'false')
					}
				})
			})
		}
	}

	function initAppointmentButton() {
		if (DOM.appointmentBtn) {
			DOM.appointmentBtn.addEventListener('click', function (e) {
				e.preventDefault()
				const modal = new bootstrap.Modal(
					document.getElementById('appointmentModal')
				)
				modal.show()
			})
		}

		const appointmentForm = document.getElementById('appointmentForm')
		if (appointmentForm) {
			appointmentForm.addEventListener('submit', function (e) {
				e.preventDefault()

				const formData = new FormData(this)

				const alertEl = document.getElementById('successAlert')
				if (alertEl) {
					alertEl.style.display = 'block'
					setTimeout(() => {
						new bootstrap.Alert(alertEl).close()
					}, 5000)
				} else {
					alert('Заявка принята! Мы свяжемся с вами в ближайшее время.')
				}

				const modal = bootstrap.Modal.getInstance(
					document.getElementById('appointmentModal')
				)
				if (modal) modal.hide()

				this.reset()
			})
		}
	}

	function showSuccessAlert() {
		const successAlert = document.getElementById('successAlert')
		if (successAlert) {
			successAlert.querySelector('strong').textContent = 'Вы записаны на акцию!'
			successAlert.style.display = 'block'
			setTimeout(() => {
				successAlert.style.display = 'none'
			}, 5000)
		}
	}

	document.addEventListener('click', function (e) {
		const btn = e.target.closest('.promotion-card .btn-primary')
		if (btn) {
			e.preventDefault()
			showSuccessAlert()
		}
	})

	const myCarousel = document.getElementById('clinicCarousel')
	if (myCarousel) {
		new bootstrap.Carousel(myCarousel, {
			interval: 2000, // 2 секунды
			pause: 'hover',
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
		script.onerror = function () {
			document.getElementById('yandexMap').innerHTML =
				'<p class="map-error">Не удалось загрузить карту. <a href="https://yandex.ru/maps/?text=ул. Детская, д. 19, Москва" target="_blank">Открыть карту в новом окне</a></p>'
		}
		document.body.appendChild(script)
	}

	// Инициализация Яндекс.Карт
	function initYandexMap() {
		const clinicCoords = [55.812677, 37.71674]
		const map = new ymaps.Map('yandexMap', {
			center: clinicCoords,
			zoom: 17,
			controls: ['zoomControl'],
		})

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

		if (DOM.locateMeBtn) {
			DOM.locateMeBtn.addEventListener('click', function () {
				ymaps.geolocation
					.get({
						provider: 'browser',
						mapStateAutoApply: true,
					})
					.then(function (result) {
						const userCoords = result.geoObjects.position
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
						map.setBounds([userCoords, clinicCoords], {
							checkZoomRange: true,
						})
					})
					.catch(function (error) {
						alert('Не удалось определить ваше местоположение: ' + error.message)
					})
			})
		}

		if (DOM.showRouteBtn) {
			DOM.showRouteBtn.addEventListener('click', function () {
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
						window.open(
							'https://yandex.ru/maps/?text=ул. Детская, д. 19, Москва'
						)
					})
			})
		}
	}

	// Основная инициализация
	function init() {
		initMobileMenu()
		initAppointmentButton()

		// Предзагрузка API карт при наведении на ссылку контактов
		const contactsLink = document.querySelector('[data-content="contacts"]')
		if (contactsLink) {
			contactsLink.addEventListener(
				'mouseenter',
				function () {
					if (!window.ymaps) {
						loadYandexMaps()
					}
				},
				{ once: true }
			)
		}
	}

	init()
})
