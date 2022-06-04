import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { config } from "./config.js";

const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__edit-button");
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const buttonsClose = document.querySelectorAll(".popup__close-button");
const profileUserName = content.querySelector(".profile__user-name");
const profileUserActivity = content.querySelector(".profile__user-activity");
const popupUserName = document.querySelector(".popup__input_type_name");
const popupUserActivity = document.querySelector(".popup__input_type_activity");
const popupForm = document.querySelector('[name="edite-profile"]');
const popupFormCard = document.querySelector('[name="add-card"]');
const buttonAdd = document.querySelector(".profile__add-button");
const elementsContainer = document.querySelector(".elements__container");
const popupUserPlace = document.querySelector(".popup__input_type_place");
const popupUserLink = document.querySelector(".popup__input_type_link");
const popupEditFormValidator = new FormValidator(config, popupEditProfile);
const popupAddFormValidator = new FormValidator(config, popupAddCard);

popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();

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

initialCards.forEach((item) => {
    elementsContainer.append(createCardElement(item, ".template-card"));
});

function setPopupProfileValues() {
    popupUserName.value = profileUserName.textContent;
    popupUserActivity.value = profileUserActivity.textContent;
}

function handleFormEditeProfile(evt) {
    evt.preventDefault();

    profileUserName.textContent = popupUserName.value;
    profileUserActivity.textContent = popupUserActivity.value;

    closePopup(popupEditProfile);
}

function handleFormCreate(evt) {
    evt.preventDefault();

    elementsContainer.prepend(
        createCardElement({ name: popupUserPlace.value, link: popupUserLink.value }, ".template-card")
    );

    closePopup(popupAddCard);
    popupFormCard.reset();
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupOnEsc);
}
export { openPopup };

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupOnEsc);
}

function closePopupOnEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

function closePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

function createCardElement(data, templateSelector) {
    const card = new Card(data, templateSelector);
    const element = card.generateCard();
    return element;
}

popupFormCard.addEventListener("submit", handleFormCreate);
popupForm.addEventListener("submit", handleFormEditeProfile);
buttonEdit.addEventListener("click", () => {
    openPopup(popupEditProfile);
    setPopupProfileValues();
    popupEditFormValidator.checkInputsOnValidity();
});

buttonAdd.addEventListener("click", () => {
    popupFormCard.reset();
    openPopup(popupAddCard);
    popupAddFormValidator.checkInputsOnValidity();
});

buttonsClose.forEach((el) => el.addEventListener("click", () => closePopup(el.closest(".popup"))));
popups.forEach((popup) => popup.addEventListener("mousedown", closePopupOnOverlay));
