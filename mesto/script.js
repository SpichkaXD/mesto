const info__btn = document.querySelector('.info__btn');
const popup = document.querySelector('.popup');
const popup__btn_value_close = popup.querySelector('.popup__btn_value_close');



info__btn.addEventListener('click', () => {
    popup.classList.add('popup_opened');
});

popup__btn_value_close.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

let formElement = popup.querySelector('.popup__form');

function formSubmitHandler (evt) {
	evt.preventDefault(); 
	let nameInput = popup.querySelector('.popup__input[name="name"]'); // Воспользуйтесь инструментом .querySelector()
	let jobInput = popup.querySelector('.popup__input[name="occupation"]');// Воспользуйтесь инструментом .querySelector()
    nameInput = (nameInput).value;
    jobInput = (jobInput).value;
    let info__name = document.querySelector('.info__name');
    let info__occupation = document.querySelector('.info__occupation');
    info__name.textContent = nameInput;
    info__occupation.textContent = jobInput;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);