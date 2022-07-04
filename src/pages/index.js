import "./index.css";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import {
    config,
    popupEditProfile,
    buttonEditProfile,
    popupAddCard,
    popupEditAvatar,
    popupUserName,
    popupUserActivity,
    buttonAdd,
    buttonEditAvatar,
    // elementsContainer,
} from "../scripts/utils/config.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

const popupEditFormValidator = new FormValidator(config, popupEditProfile);
const popupEditAvatarValidator = new FormValidator(config, popupEditAvatar);
const popupAddFormValidator = new FormValidator(config, popupAddCard);

const popupImage = new PopupWithImage(".popup_type_view-image");
const userInfo = new UserInfo(".profile__user-name", ".profile__user-activity", ".profile__avatar");

const cardList = new Section(
    {
        renderer: (item) => {
            cardList.addItemAppend(createCardElement(item));
        },
    },
    ".elements__container"
);

const popupWithFormAddCard = new PopupWithForm(".popup_type_add-card", {
    handleFormSubmit: (dataInputs) => {
        popupWithFormAddCard.renderLoading(true);
        api.addCard(dataInputs)
            .then((card) => {
                cardList.addItemPrepend(createCardElement(card));
                popupWithFormAddCard.close();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            })
            .finally(() => {
                popupWithFormAddCard.renderLoading(false);
            });
    },
});

const popupWithFormEditProfile = new PopupWithForm(".popup_type_edit-profile", {
    handleFormSubmit: (data) => {
        popupWithFormEditProfile.renderLoading(true);
        api.setUsersInfo(data)
            .then((dataUserInfo) => {
                userInfo.setUserInfo(dataUserInfo);
                popupWithFormEditProfile.close();
            }) 
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            })
            .finally(() => {
                popupWithFormEditProfile.renderLoading(false);
            });
    },
});

const popupWithFormEditAvatar = new PopupWithForm(".popup_type_change-avatar", {
    handleFormSubmit: (data) => {
        popupWithFormEditAvatar.renderLoading(true);
        api.setUserAvatar(data)
            .then((dataUserInfo) => {
                userInfo.setUserInfo(dataUserInfo);
                popupWithFormEditAvatar.close();
            })
            .catch((error) => {
                console.log(`Ошибка: ${error}`);
            })
            .finally(() => {
                popupWithFormEditAvatar.renderLoading(false);
            });
    },
});

const popupWithConfirmation = new PopupWithConfirmation(".popup_type_confirm");

const api = new Api({
    url: "https://nomoreparties.co/v1/cohort-44",
    headers: {
        authorization: "96c1b86f-aa6e-4f39-8274-9861f5042d0a",
        "Content-Type": "application/json",
    },
});

let userData;

Promise.all([api.getUsersInfo(), api.getCards()])
    .then(([dataUserInfo, cards]) => {
        userData = dataUserInfo;

        userInfo.setUserInfo(dataUserInfo);
        cardList.renderItems(cards);
    })
    .catch((error) => {
        console.log(`Ошибка: ${error}`);
    });

function createCardElement(data) {
    const card = new Card({
        data: data,
        templateSelector: ".template-card",
        userData: userData,
        handleCardClick: (item) => {
            popupImage.open(item);
        },
        handleDeleteCardClick: (cardInfo) => {
            popupWithConfirmation.open();
            popupWithConfirmation.setSubmit(() => {
                api.deleteCard(cardInfo)
                    .then(() => {
                        card.deleteElement();
                        popupWithConfirmation.close();
                    })
                    .catch((error) => {
                        console.log(`Ошибка: ${error}`);
                    });
            });
        },
        handleLikes: (cardInfo) => {
            if (card.isLiked()) {
                api.deleteLike(cardInfo)
                    .then((item) => {
                        card.setLikesCount(item);
                        card.deleteLike();
                    })
                    .catch((error) => {
                        console.log(`Ошибка: ${error}`);
                    });
            } else {
                api.setLike(cardInfo)
                    .then((item) => {
                        card.setLikesCount(item);
                        card.addLike();
                    })
                    .catch((error) => {
                        console.log(`Ошибка: ${error}`);
                    });
            }
        },
    });

    const element = card.generateCard(data);

    return element;
}

popupWithFormEditProfile.setEventListeners();
popupImage.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithConfirmation.setEventListeners();
popupWithFormEditAvatar.setEventListeners();
popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
popupEditAvatarValidator.enableValidation();

// cardList.renderItems();

buttonEditProfile.addEventListener("click", () => {
    popupWithFormEditProfile.open();
    const getUserInfo = userInfo.getUserInfo();
    popupUserName.value = getUserInfo.name;
    popupUserActivity.value = getUserInfo.about;
    popupEditFormValidator.checkInputsOnValidity();
});

buttonEditAvatar.addEventListener("click", () => {
    popupWithFormEditAvatar.open();
    popupEditAvatarValidator.checkInputsOnValidity();
});

buttonAdd.addEventListener("click", () => {
    popupWithFormAddCard.open();
    popupAddFormValidator.checkInputsOnValidity();
});
