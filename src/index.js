import "./pages/index.css";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { config } from "./config.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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

const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupUserName = document.querySelector(".popup__input_type_name");
const popupUserActivity = document.querySelector(".popup__input_type_activity");
const buttonAdd = document.querySelector(".profile__add-button");
const elementsContainer = document.querySelector(".elements__container");
// const popupUserPlace = document.querySelector(".popup__input_type_place");
const popupEditFormValidator = new FormValidator(config, popupEditProfile);
const popupAddFormValidator = new FormValidator(config, popupAddCard);

const popupImage = new PopupWithImage(".popup_type_view-image");
const userInfo = new UserInfo(".profile__user-name", ".profile__user-activity");

const cardList = new Section(
    {
        data: initialCards,
        renderer: (item) => {
            cardList.addItemAppend(createCardElement(item));
        },
    },
    elementsContainer
);

const popupWithFormEditProfile = new PopupWithForm(".popup_type_edit-profile", {
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item);
        popupWithFormEditProfile.close();
    },
});

const popupWithFormAddCard = new PopupWithForm(".popup_type_add-card", {
    handleFormSubmit: (item) => {
        cardList.addItemPrepend(createCardElement(item));
        popupWithFormAddCard.close();
    },
});

function createCardElement(data) {
    const card = new Card(data, ".template-card", {
        handleCardClick: (item) => {
            popupImage.open(item);
        },
    });

    const cardElement = card.generateCard();

    return cardElement;
}

popupWithFormEditProfile.setEventListeners();
popupImage.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
cardList.renderItems();

buttonEdit.addEventListener("click", () => {
    popupWithFormEditProfile.open();
    const getUserInfo = userInfo.getUserInfo();
    popupUserName.value = getUserInfo.name;
    popupUserActivity.value = getUserInfo.activity;
    popupEditFormValidator.checkInputsOnValidity();
});

buttonAdd.addEventListener("click", () => {
    popupWithFormAddCard.open();
    popupAddFormValidator.checkInputsOnValidity();
});
