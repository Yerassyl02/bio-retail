const nav = document.querySelector('.nav');
const menuBlurMask = document.querySelector('.menu_blurmask');
const navItemActive = document.querySelector(".nav_item.active");
const subNav = document.querySelector(".subnav");
const body = document.querySelector("body");

// select

for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
    dropdown.addEventListener('click', function() {
        this.querySelector('.custom-select').classList.toggle('open');
    })
}

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').innerHTML = this.innerHTML;
        }
    })
}

window.addEventListener('click', function(e) {
    for (const select of document.querySelectorAll('.custom-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});

// catalog sidebar

const catalogSide = document.querySelector('.catalog_sidebar');
if(catalogSide){
    catalogSide.addEventListener('click', function()  {
        catalogSide.classList.toggle('active');
    });
}


// fixed navbar

// window.addEventListener("scroll", () => {
//     let scrollPos = window.scrollY;

//     if(scrollPos > 450) {
//         nav.classList.add('active');
//     } else {
//         nav.classList.remove('active');
//     }
// })

// burger
(function() {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.nav_links');
    const menuCloseItem = document.querySelector('.header__nav-close');
    burgerItem.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        menu.classList.add('active');
        menuBlurMask.classList.add('active')
    });
    menuCloseItem.addEventListener('click', () => {
        document.body.style.overflow = 'visible'
        menu.classList.remove('active');
        menuBlurMask.classList.remove('active')
    });
}());

// number amount

const basketAmountPrev = document.querySelectorAll('.basket_amount-prev');
const basketAmountNext = document.querySelectorAll('.basket_amount-next');
const basketAmountNum = document.querySelectorAll('.basket_amount-num');

for (let i = 0; i < basketAmountNext.length; i++){
    basketAmountNext[i].addEventListener('click', () =>{
        basketAmountNum[i].value = parseInt(basketAmountNum[i].value) + 1;
    });
};

for (let i = 0; i < basketAmountPrev.length; i++){
    basketAmountPrev[i].addEventListener('click', () =>{
        if(basketAmountNum[i].value <= 0){
            basketAmountNum[i].value = 0;
        } else{
            basketAmountNum[i].value = parseInt(basketAmountNum[i].value) - 1;
        }
    });
};

// modal window

const modalButtons = document.querySelectorAll('[data-modal-button]');
const modalClosebuttons = document.querySelectorAll('[data-modal-close]');
const allModals = document.querySelectorAll('[data-modal]');

modalButtons.forEach(function (item) {
    item.addEventListener('click', function () {
        console.log("click");
		const modalId = this.dataset.modalButton;
		const modal = document.querySelector('#' + modalId);
		modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

		modal.querySelector('.modal_window').addEventListener('click', function (e) {
			e.stopPropagation();
		});
	})
})

modalClosebuttons.forEach(function (item) {
    item.addEventListener('click', function () {
        const modal = this.closest('[data-modal]');
        modal.classList.add('hidden');
        document.body.style.overflow = 'visible';
    })
})

allModals.forEach(function (item) {
    item.addEventListener('click', function () {
        this.classList.add('hidden');
        document.body.style.overflow = 'visible';
	});
});

// project tabs
// устінгі таб(жылдар)

const tabHeaders = document.querySelectorAll('[data-tab]');
const contentBoxes = document.querySelectorAll('[data-tab-content]');
const projectTabsItem = document.querySelectorAll('.projects-done-year-item');

for ( let i = 0; i < projectTabsItem.length; i++){
    projectTabsItem[i].addEventListener('click', function () {
        for ( let i = 0; i < contentBoxes.length; i++ ){
            contentBoxes[i].classList.add('hidden');
        };
        
        const contentBox = document.querySelector('#' + this.dataset.tab);
        contentBox?.classList.remove('hidden');

        for (let i = 0; i < projectTabsItem.length; i++ ) {
            projectTabsItem[i].classList.remove('active');
        }
        projectTabsItem[i].classList.add('active');
    });
};

// --------------------------------------------
// астынгы таб

const contentBoxess = document.querySelectorAll('[data-tab-year-content]');
const projectTabssItem = document.querySelectorAll('.projects-done-content-item');

for ( let i = 0; i < projectTabssItem.length; i++){
    projectTabssItem[i].addEventListener('click', function () {
        for ( let i = 0; i < contentBoxess.length; i++ ){
            contentBoxess[i].classList.remove('active');
        };

        contentBoxess[i].classList.add('active');
        
        const contentBox = document.querySelector('#' + this.dataset.tab);
        contentBox?.classList.remove('active');

        for (let i = 0; i < projectTabssItem.length; i++ ) {
            projectTabssItem[i].classList.remove('active');
        }
        projectTabssItem[i].classList.add('active');
    });
};


// error input msg

const inputUserName = document.querySelector('.input_username');
const inputUserPhone = document.querySelector('.input_userphone');
 

function validateInput(){
    if(inputUserName.value.trim() === ""){
        onError(inputUserName, "Введите имя");
    } else{
        if(!isValidEmail(inputUserName.value.trim())){
            onError(inputUserName,"Имя может включать буквы кириллицы");
        }else{
            onSuccess(inputUserName);
        }
    };

    if(inputUserPhone.value.trim() === ""){
        onError(inputUserPhone, "Введите номер телефона")
    } else{
        if(!isValidPhone(inputUserPhone.value.trim())){
            onError(inputUserPhone, "Разрещены только цифры");
        }else{
            onSuccess(inputUserPhone);
        };
    };
};

function isValidEmail(email){
    return /[а-яё]+/i.test(email);
}
;
function isValidPhone(phone){
    return /^[0-9]+$/i.test(phone);
};

const basketCheckoutBtn = document.querySelector('.basket-checkout-btn');
if(basketCheckoutBtn){
    basketCheckoutBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        validateInput();
    });
}

// #### start
function onSuccess(input){
    let parent=input.parentElement;
    let messageEle=parent.querySelector(".error_msg-text");
    let messageErrorImg = parent.querySelector('.error_msg-img')
    messageErrorImg.style.display="none";
    messageEle.style.display="none"; 
    parent.classList.remove("input_error");
    parent.classList.add("success");  
}
function onError(input,message){
    let parent=input.parentElement;
    let messageEle=parent.querySelector(".error_msg-text");
    let messageErrorImg = parent.querySelector('.error_msg-img')
    messageErrorImg.style.display="block";
    messageEle.style.display="block";
    messageEle.innerText=message;  
    parent.classList.add("input_error");
    parent.classList.remove("success");
}
// #### end

// slider

// #### start projects marker hover

const projectsMapLocations = document.querySelectorAll('.projects-map-locations');

for(let i = 0; i < projectsMapLocations.length; i++){
    projectsMapLocations[i].addEventListener('mouseover', () => {
        projectsMapLocations[i].classList.add('active');
        projectsMapLocations[0].classList.remove('active');
    })
    projectsMapLocations[0].addEventListener('mouseover', () => {
        projectsMapLocations[0].classList.add('active');
    })
    projectsMapLocations[i].addEventListener('mouseout', () =>{
        projectsMapLocations[i].classList.remove('active');
        projectsMapLocations[0].classList.add('active');
    })
}

// #### end projects marker hover
// projects slider

new Swiper('.projects-done-content-swiper-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    pagination:{
        el: '.swiper-pagination',
        clickable: true,
    }
})

// identity slider

new Swiper('.swiper-usinglogo', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    autoHeight: true,
});

// home slider
// #### start
new Swiper('.swiper_slider-similar_home_galleries',{
    slidesPerView: 3,
    autoHeight: true,
    spaceBetween: 32,
    scrollbar: {
        el: '.swiper-scrollbar',
        graggable: true
    },
    breakpoints: {
        1200:{
            slidesPerView: 3.5,
        },
        768:{
            slidesPerView: 3,
        },
        514:{
            slidesPerView: 2,
        },
        200:{
            slidesPerView: 2,
        },
        300:{
            slidesPerView: 1.8,
        },
        340:{
            slidesPerView: 1.6,
        },
        300:{
            slidesPerView: 1.4,
        },
        270:{
            slidesPerView: 1.2,
        }
    }
});
// #### end
// blog slider

new Swiper('.swiper_slider-blog',{
    slidesPerView: 2,
    autoHeight: true,
    spaceBetween: 32,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
});

// basket slider

new Swiper('.swiper_slider-similar_basket',{
    slidesPerView: 2,
    autoHeight: true,
    spaceBetween: 32,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        830: {
            slidesPerView: 2.8,
        }
    }
});

// catalog pages slider

// #### start
new Swiper('.catalog_pages-item-swiper-slider',{
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    thumbs: {
        swiper: {
            el: '.catalog_pages-item-mini-slider',
            slidesPerView: 4,
            spaceBetween: 16,
        }
    },
});
// #### end

new Swiper('.mobile_projects-map_info-swiper-slider', {
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 31,
    slidesPerView: 'auto',
    // breakpoints: {
    //     330: {
    //         slidesPerView: 1.4,
    //     },
    //     360: {
    //         slidesPerView: 1.6,
    //     },
    //     415: {
    //         slidesPerView: 1.8,
    //     },
    //     460: {
    //         slidesPerView: 2,
    //     },
    //     500: {
    //         slidesPerView: 2.2,
    //     },
    // },
    thumbs: {
        swiper: {
            el: '.mobile_projects-swiper-slider',
            slidesPerView: 11,
            touchRatio: 0,
        }
    },
})
// vacancy slider
// #### start
let vacancy = new Swiper('.swiper_slider-vacancy',{
    slidesPerView: 1,
    spaceBetween: 32,
    autoHeight: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        500: {
            slidesPerView: 1.5,
        },
        640: {
            slidesPerView: 2,
        },
        940: {
            slidesPerView: 3,
        },
        1400: {
            slidesPerView: 3.7,
        },
    }
});
// #### end
// company slider
// #### start
let companyteam = new Swiper ('.swiper_slider-company_team',{
    slidesPerView: 1,
    spaceBetween: 32,
    simulateTouch: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        400: {
            slidesPerView: 1.5,
        },
        550: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        930: {
            slidesPerView: 4,
        }
    }
});
// #### end