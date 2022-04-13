const info__btn = document.querySelector('.info__btn');
const popup = document.querySelector('.popup');
const popup__btn_value_close = popup.querySelector('.popup__btn_value_close');
let nameInput = popup.querySelector('.popup__input[name="name"]'); 
let jobInput = popup.querySelector('.popup__input[name="occupation"]');
let info__name = document.querySelector('.info__name');
let info__occupation = document.querySelector('.info__occupation');


let formElement = popup.querySelector('.popup__form');

function formSubmitHandler (evt) {
	evt.preventDefault(); 
    info__name.textContent = nameInput.value;
    info__occupation.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

info__btn.addEventListener('click', () => {
    popup.classList.add('popup_opened');  
});

popup__btn_value_close.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
    nameInput.value = info__name.textContent;
    jobInput.value = info__occupation.textContent;
});

const likeBtn = document.querySelectorAll ('.element__like');
console.log(likeBtn);

function LikeActive () { 
	likeBtn.classList.add('element__like_active');
    console.log("hello");
}

LikeBtn.addEventListener('click', LikeActive);







