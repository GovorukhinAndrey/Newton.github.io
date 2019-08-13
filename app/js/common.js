
$(function() {


	$('select').styler();

	$('.open-popup').magnificPopup({
		type:'inline',
		mainClass: 'mfp-forms',
		fixedContentPos: false,
		fixedBgPos: false	
	});
	

	$('.close-popup').click( function(){
		$.magnificPopup.close();
	});


	$('.open-payment').click( function(){
		event.preventDefault();
		let openPayment = $(this).data("description");
		$('#form-subject').val('Узнать больше:' + ' ' + openPayment);
		$.magnificPopup.open({
			items: {
					src: '#formCallback',
					type: 'inline',
					mainClass: 'mfp-forms',
			},
			fixedContentPos: false,
			fixedBgPos: false,
			callbacks: {
				close: function() {
					$('#form-subject').val('Заявка с сайта');
				}
			}
		});
});

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$(".popup").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			swal("Спасибо! Мы свяжемся с Вами ближайшее время");	
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				$.magnificPopup.close();
			}, 1000);
		});
		return false;
	});	

	$("#callback-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			swal("Спасибо за заявку! Мы свяжемся с Вами ближайшее время");			
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
// --------------

});

//------------------------



// ---------------------
document.addEventListener('DOMContentLoaded', function(){ 
	'use strict';
	// слайдер
		let advantagesSwiper = new Swiper('#slider .swiper-container', {
			loop: true,
			speed: 500,
			// autoplay: {
			// 	delay: 900,
			// 	disableOnInteraction: false,
			// },
			observer: true,
			observeParents: true,
			navigation: {
				nextEl: '#slider .main-slider-next',
				prevEl: '#slider .main-slider-prev',
			}
		});
	
	window.addEventListener('load', onLoadFunction);
	window.addEventListener('resize', onResizeFunction);
	
	function onLoadFunction(e){
		onResizeFunction();
		loadTab();
	};
	function onResizeFunction (e){
	
	};

//

// Табы и слайдеры "apartments"
	let apartmentsListTab = document.getElementById('apartments-tab-item-wrap');
	let apartmentsListPane = document.getElementById('apartments-pane-item-wrap');
	let apartmentsTabsContent = '';
	let apartmentsPaneContent = '';


	let targetResult = document.getElementById('mse2_results');
	let observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			// console.log(mutation.type);
			apartmentsListTab.innerHTML = '';
			apartmentsListPane.innerHTML = ''; 
			apartmentsTabsContent = '';
			apartmentsPaneContent = '';
			loadTab();
		});    
	});
	let configResult = { attributes: false, childList: true, characterData: false };
	observer.observe(targetResult,  configResult);

	function loadTab() {
		let apartmentInfoItem = [...document.querySelectorAll('.result__item')];

		apartmentInfoItem.forEach((el) => {
			let arrApartmentsSlider = 	[...el.querySelectorAll('.apartments-slide')];

			// 			phone apartment
			let apartmentPhone = document.querySelector('.aprtment-phone-alloke');
			let apartmentPhoneClone = apartmentPhone.cloneNode(false);
			// console.log(apartmentPhone);
			// console.log(apartmentPhone.innerHTML);
			// console.log(apartmentPhone.dataset.phone);
			// console.log(apartmentPhone.getAttribute('href'));
			//

			let apartmentsSlideGroup = '';
			arrApartmentsSlider.forEach((slide) => {
				apartmentsSlideGroup +=`
				<div class="swiper-slide">
					<img class="img-responsive" src="${slide.getAttribute('src')}" alt="${slide.getAttribute('alt')}">
				</div>					
				`
			});


				apartmentsTabsContent += `
			<a href="#apartments-pane-item-wrap" class="apartments-list__item flex-fluid">
				<div class="colg apartments-list__item-rooms">
				${el.dataset.rooms}
				</div>
				<div class="colg apartments-list__item-area">
				${el.dataset.area} м<sup>2</sup>
				</div>
				<div class="colg apartments-list__item-floor">
				${el.dataset.floor} этаж
				</div>
				<div class="colg apartments-list__item-deadline">
				${el.dataset.deadline}
				</div>
				<div class="colg apartments-list__item-price">
					<span class="red">${el.dataset.price}</span>
				</div>
			</a>
				`
	
				apartmentsPaneContent += `
					<div class="apartment-info-item">
						<div class="apartment-info-item__slider swiper-container">
							<div class="swiper-wrapper">
								${apartmentsSlideGroup}
							</div>
							<!-- Add Arrows -->
							<div class="apartment-info-item__slider-next"><i class="fa fa-angle-right" aria-hidden="true"></i>								</div>
							<div class="apartment-info-item__slider-prev"><i class="fa fa-angle-left" aria-hidden="true"></i>								</div>								
						</div>
						<div class="flex-fluid apartment-info-item__top-info">
							<div class="colg apartment-info-item__top-info-left">
								<div class="apartment-info-item__top-info-title">${el.dataset.title}</div>
								<span>${el.dataset.deadline}</span>
							</div>
							<div class="colg apartment-info-item__top-info-right">
								<div class="apartment-info-item__top-info-title red">${el.dataset.price}</div>
								<span>${el.dataset.pricem} руб./м<sup>2</sup></span>									
							</div>
						</div>
						<div class="apartment-info-item__bottom-info flex-fluid">
							<div class="colg">
								<div class="apartment-info-item__bottom-info-title">Площадь</div>
								<span>${el.dataset.area} м<sup>2</sup></span>
							</div>
							<div class="colg">
								<div class="apartment-info-item__bottom-info-title">Этаж</div>
								<span>${el.dataset.floor}</span>
							</div>
							<div class="colg">
								<div class="apartment-info-item__bottom-info-title">Санузел</div>
								<span>${el.dataset.bathroom}</span>									
							</div>
						</div>
						<div class="apartment-info-item__description">
							<p>${el.dataset.text}</p>
						</div>
						<div class="apartment-info-item__btn-block">
							<a  class="open btn" data-description="Забронировать квартиру в ЖК Ньютон(${el.dataset.title}): количество комнат - ${el.dataset.rooms} , срок сдачи - ${el.dataset.deadline} , площадь - ${el.dataset.area}, цена - ${el.dataset.price}, этаж ${el.dataset.floor}">Забронировать</a>
							<a  class="btn open-excursion" data-description="Записаться на экскурсию в ЖК Ньютон(${el.dataset.title}): количество комнат - ${el.dataset.rooms} , срок сдачи - ${el.dataset.deadline} , площадь - ${el.dataset.area}, цена - ${el.dataset.price}, этаж ${el.dataset.floor}">Записаться на экскурсию</a>
						</div>
						<div class="apartment-info-item__phone-block">
							<a href="tel: ${el.dataset.telphone}" class="phone">${el.dataset.phone}</a>
						</div>							
					</div>
				`
			});
	
			apartmentsListTab.insertAdjacentHTML('beforeend', apartmentsTabsContent);
			apartmentsListPane.insertAdjacentHTML('beforeend', apartmentsPaneContent);
			initTabsApartments();
	};

	//слайдер
	
	function initTabsApartments() {
		function initApartmentsSlider(swiper) {
			apartmentsSlide = new Swiper(swiper, {
				loop: true,
				speed: 500,
				// autoplay: {
				// 	delay: 900,
				// 	disableOnInteraction: false,
				// },
				observer: true,
				observeParents: true,
				navigation: {
					nextEl: '.apartment-info-item__slider-next',
					prevEl: '.apartment-info-item__slider-prev',
				},
			});	
		};
		let apartmentsSlider = [...document.querySelectorAll('.apartment-info-item__slider')];
		let apartmentsSlideItem = apartmentsSlider[0];
		let apartmentsTabNav = [...document.querySelectorAll('.apartments-list .apartments-list__item')],
				apartmentsTabContent = [...document.querySelectorAll('.apartments-list .apartment-info-item')];
		let apartmentsSlide;		

		apartmentsTabNav[0].classList.add('is-active');
		apartmentsTabContent[0].classList.add('is-active');
				 
		initApartmentsSlider(apartmentsSlideItem);

				apartmentsTabNav.forEach((item, idx) => {
					 item.addEventListener('click', function(e){
						apartmentsTabNav.forEach(item => {
							 item.classList.remove('is-active'); // Удаляем активный укласс у элемента списка
						 });
						 apartmentsTabContent.forEach(item => {
							 item.classList.remove('is-active');
						 });
						 apartmentsSlide.destroy(false,true);
						 apartmentsSlideItem = apartmentsSlider[idx];
						 initApartmentsSlider(apartmentsSlideItem);
				
						 this.classList.add('is-active');  // Добавляем активный у класс у элемента списка
						 apartmentsTabContent[idx].classList.add('is-active');
						 e.preventDefault();
						 if(window.screen.width <= 991){
							smoothScrollTo(document.getElementById('apartments-pane-item-wrap').offsetTop - 60);
						} else{
							smoothScrollTo(document.getElementById('apartments-pane-item-wrap').offsetTop);
						}	
					 });
				 });	
	
			
			$('.open').click( function(){
				let descriptionButton = $(this).data("description");
				$('#form_callback-popup #form-subject').val(descriptionButton);
				$.magnificPopup.open({
					items: {
							src: '#formCallback',
							type: 'inline',
							mainClass: 'mfp-forms',
					},
					fixedContentPos: false,
					fixedBgPos: false,
					callbacks: {
						close: function() {
							$('#form_callback-popup #form-subject').val('Заявка с сайта');
						}
					}					
				});
		});
		
			$('.open-excursion').click( function(){
				let descriptionButton = $(this).data("description");
				$('#form_excursion-popup #form-subject').val(descriptionButton);
				$.magnificPopup.open({
					items: {
							src: '#form-excursion',
							type: 'inline',
							mainClass: 'mfp-forms',
					},
					fixedContentPos: false,
					fixedBgPos: false,
					callbacks: {
						close: function() {
							$('#form_excursion-popup #form-subject').val('Заявка на экскурсию');
						}
					}						
				});

		});
			

	};

////
// табы

tabs('#payment .tab','#payment .pane');

function tabs(tabs, panes) {
	let tabNav = [...document.querySelectorAll(tabs)],
			tabContent = [...document.querySelectorAll(panes)];
			
	tabNav[1].classList.add('is-active');
	tabContent[1].classList.add('is-active');
	let changeApartment = document.getElementById('tab1');
 	let mortgage = document.getElementById('tab2');

	
	function tabNavRemoveActive() {
		tabNav.forEach(item => {
			item.classList.remove('is-active'); // Удаляем активный укласс у элемента списка
		});
		tabContent.forEach(item => {
			item.classList.remove('is-active');
		});
	};

	tabNav.forEach((item, idx) => {
		//
		changeApartment.addEventListener("click", function() {
			tabNavRemoveActive();

			tabNav[0].classList.add('is-active');
			tabContent[0].classList.add('is-active');
		});
		mortgage.addEventListener("click", function() {
			tabNavRemoveActive();
			tabNav[1].classList.add('is-active');
			tabContent[1].classList.add('is-active');
		});
		//
		item.addEventListener('click', function(){

			tabNavRemoveActive();
			this.classList.add('is-active');  // Добавляем активный у класс у элемента списка
			tabContent[idx].classList.add('is-active');				
		});
	});	
};

//

	const copy = document.getElementById("copy");
	const referral = document.getElementById("referral");
	if( copy ) {
		copy.addEventListener("click", function(e){
			e.preventDefault();
			referral.select();
			document.execCommand('copy');
			return false; 
		});
	};


	const burger = document.querySelector('.hamburger');
	const topHeader = document.querySelector('.sidebar__content');
	const menu = document.querySelector('#navigation');

	function changeScroll(e) {
		e.preventDefault();
	};


	burger.addEventListener('click', function(e){
		this.classList.toggle('is-active');
		menu.classList.toggle('open');
		//topHeader.classList.toggle('open');
		//document.addEventListener("mousewheel", changeScroll);
		//document.addEventListener("DOMMouseScroll", changeScroll);
	});

	window.addEventListener('click', function(e){
		if(e.target === topHeader){
			burger.classList.toggle('is-active');
			menu.classList.toggle('open');
			//topHeader.classList.toggle('open');
			//document.removeEventListener("mousewheel", changeScroll);
			//document.removeEventListener("DOMMouseScroll", changeScroll);
		}
	});	

	const activeBox = document.querySelectorAll('.active-box');

	[].forEach.call(activeBox, element => {
		element.addEventListener('click', function(e){
			this.classList.toggle('active-box-open');
			this.parentElement.nextElementSibling.classList.toggle('hidden');
			if( this.classList.contains("active-box-open") ){
				this.querySelector('i').classList.remove("fa-angle-down");
				this.querySelector('i').classList.add("fa-angle-up");
			}else{
				this.querySelector('i').classList.remove("fa-angle-up");
				this.querySelector('i').classList.add("fa-angle-down");				
			}
		});

		
	});

	{
		let elDiscount = document.querySelector('.scroll-to-discount');
		let apartmentBlock = document.getElementById('apartments');
		
		elDiscount.addEventListener('click', function(event){
			document.querySelector('.search-block__discount input').checked = true;
			event.preventDefault();
			history.pushState(null, null, '/?discount=yes');
	
			if(window.screen.width <= 991){
				smoothScrollTo(apartmentBlock.offsetTop - 60);
			} else{
				smoothScrollTo(apartmentBlock.offsetTop);
			}	
			mSearch2.submit();
	
		});
	};

//
let linkNav = [...document.querySelectorAll('.scroll')];
linkNav.forEach((item) => {
	let parentLinkNav = item.parentElement;
	let linkNavHref = item.getAttribute('href');
	let el = document.querySelector(linkNavHref);


	item.addEventListener('click', function(event){
		event.preventDefault();

		if(window.screen.width <= 991){
			smoothScrollTo(el.offsetTop - 60);
			if(parentLinkNav.classList.contains('menu__item')){
				burger.classList.toggle('is-active');
				menu.classList.toggle('open');
			}
		} else{
			smoothScrollTo(el.offsetTop);
		}	
	});
});


//
window.smoothScrollTo = (function () {
	let timer, start, factor;
	
	return function (target, duration = '500') {
	let offset = window.pageYOffset,
		delta  = target - window.pageYOffset;
	start = Date.now();                       
	factor = 0;
	
	if( timer ) {
	clearInterval(timer);
	}
	
	function step() {
	let y;
	factor = (Date.now() - start) / duration;
	if( factor >= 1 ) {
		clearInterval(timer); 
		factor = 1;           
	} 
	y = factor * delta + offset;
	window.scrollBy(0, y - window.pageYOffset);
	}
	
	timer = setInterval(step, 10);
	return timer;
	};
	}());


//
});

