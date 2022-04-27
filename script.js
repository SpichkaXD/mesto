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

const popupEdit = document.querySelector(".popup-edit");
const editBtn = document.querySelector(".profile__addbtn");
editBtn.addEventListener("click", () => {
    popupEdit.classList.add("popup_opened");
});

const editBtnClose = popupEdit.querySelector(".popup-edit__btn");
editBtnClose.addEventListener("click", () => {
    popupEdit.classList.toggle("popup_opened");
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

//template

const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");

// dom

const cardContainer = document.querySelector(".elements__cards");
const form = document.querySelector(".popup-edit__form");
const inputName = document.querySelector(".popup__input-name");
const inputLink = document.querySelector(".popup__input-link");

const popupImg = document.querySelector(".popup-img");
const popupImgFull = popupImg.querySelector(".popup-img__fullimg");
const popupImgTitle = popupImg.querySelector(".popup-img__title");
const popupImgClose = popupImg.querySelector(".popup-img__btn");

//handler event

const submitAddCardForm = (event) => {
    event.preventDefault();
    // проверка на заполненость карточки
    if (inputName.value == "" && inputLink.value == "") {
        popupEdit.classList.toggle("popup_opened");
        alert("Введите данные заново");
    } else {
        renderCard({ name: inputName.value, link: inputLink.value });
        inputName.value = "";
        inputLink.value = "";
        popupEdit.classList.toggle("popup_opened");
    }
};

const deleteCard = (event) => {
    event.target.closest(".element").remove();
};

const likeCard = (event) => {
    event.target.closest(".element__like").classList.toggle("element__like_active");
};

popupImgClose.addEventListener("click", () => {
    popupImg.classList.toggle("popup_opened");
});

//generateCard

const generateCard = (cardData) => {
    const newCard = cardTemplate.cloneNode(true);
    const nameCard = newCard.querySelector(".element__title");
    const linkCard = newCard.querySelector(".element__img");

    nameCard.textContent = cardData.name;
    linkCard.src = cardData.link;
    const deleteCardButton = newCard.querySelector(".element__delete");
    deleteCardButton.addEventListener("click", deleteCard);

    const likeCardButton = newCard.querySelector(".element__like");
    likeCardButton.addEventListener("click", likeCard);

    linkCard.addEventListener("click", () => {
        popupImg.classList.toggle("popup_opened");
        popupImgTitle.textContent = nameCard.textContent;
        popupImgFull.src = linkCard.src;
    });

    return newCard;
};

//rendercard

const renderCard = (cardData) => {
    cardContainer.prepend(generateCard(cardData));
};

initialCards.forEach((cardData) => {
    renderCard(cardData);
});

form.addEventListener("submit", submitAddCardForm);
