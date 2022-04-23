const info__btn = document.querySelector(".info__btn");
const popup = document.querySelector(".popup");
const popup__btn_value_close = popup.querySelector(".popup__btn_value_close");
let nameInput = popup.querySelector('.popup__input[name="name"]');
let jobInput = popup.querySelector('.popup__input[name="occupation"]');
let info__name = document.querySelector(".info__name");
let info__occupation = document.querySelector(".info__occupation");

let formElement = popup.querySelector(".popup__form");

function formSubmitHandler(evt) {
    evt.preventDefault();
    info__name.textContent = nameInput.value;
    info__occupation.textContent = jobInput.value;
    popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);

info__btn.addEventListener("click", () => {
    popup.classList.add("popup_opened");
});

popup__btn_value_close.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
    nameInput.value = info__name.textContent;
    jobInput.value = info__occupation.textContent;
});

// popup edit
const popupEdit = document.querySelector(".popup__edit");
const editBtn = document.querySelector(".profile__addbtn");
editBtn.addEventListener("click", () => {
    popupEdit.classList.add("popup__edit_opened");
});

const editBtnClose = popupEdit.querySelector(".popup__edit-btn");
editBtnClose.addEventListener("click", () => {
    popupEdit.classList.toggle("popup__edit_opened");
    console.log("f");
});

//addcard
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

// dom

const cardContainer = document.querySelector(".elements__cards");
const form = document.querySelector(".popup__form-edit");
const inputName = form.querySelector(".popup__input-name");
const inputLink = form.querySelector(".popup__input-link");

//handler event
const submitAddCardForm = (event) => {
    event.preventDefault();
    renderCard({ name: inputName.value , link: inputLink.value});
    inputName.value = "";
    inputLink.value = "";
    popupEdit.classList.toggle("popup__edit_opened");
};

// rendercard

const renderCard = (cardData) => {
    cardContainer.insertAdjacentHTML(
        "afterbegin",
        `
        <li class="element">
            <img class="element__img" src="${cardData.link}" alt="${cardData.name}" >
            <div class="element__box">
                <h2 class="element__title">${cardData.name}</h2>
                <button class="element__like" type="button"></button>
            </div>
            <button class="element__delete" type="button"></button>
        </li>
        `
    );
};

initialCards.forEach((cardData) => {
    renderCard(cardData);
});

form.addEventListener("submit", submitAddCardForm);
// //like active
// const likeBtn = document.querySelector('.element__like');
// likeBtn.addEventListener('click',DolikeActive);

// const DolikeActive = (event) => {
// event.target.closest().classList.toggle('element__like_active')
// };
