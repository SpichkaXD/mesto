const infoBtn = document.querySelector(".info__btn");

// popup-profile
const popupProfile = document.querySelector(".popup-profile");
const btnClosePopupProfile = popupProfile.querySelector(".popup-close-profile");
const nameInput = popupProfile.querySelector('.popup__input[name="name"]');
const jobInput = popupProfile.querySelector('.popup__input[name="occupation"]');
const infoName = document.querySelector(".info__name");
const infoOccupation = document.querySelector(".info__occupation");
const formElementProfile = popupProfile.querySelector(".popup-form-profile");

//проверка на корректность
nameInput.addEventListener("input", function (evt) {
    console.log(evt.target.validity.valid);
});

jobInput.addEventListener("input", function (evt) {
    console.log(evt.target.validity.valid);
});

//dom
const formSelector = document.querySelector(".popup__form");
const inputSelector = formSelector.querySelector(".popup__input");
const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
const submitButtonSelector = popupProfile.querySelector(".popup-profile__btn-add");

// стили кнопки
submitButtonSelector.classList.add("popup__btn_value_save-error");


// open close popup
function openPopup(popup) {
    popup.classList.add("popup_opened");
    console.log("open");
    //добовляем слушатель на закрытие по кнопке
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEsc);
}

//функция определения нажатия esc
function closeByEsc(evt) {
    if (evt.key == "Escape") {
        const openPopup = document.querySelector('.popup_opened')
        closePopup(openPopup);
        console.log("Esc");
    }
}

formElementProfile.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    closePopup(popupProfile);
    infoName.textContent = nameInput.value;
    infoOccupation.textContent = jobInput.value;
}

infoBtn.addEventListener("click", () => {
    nameInput.value = infoName.textContent;
    jobInput.value = infoOccupation.textContent;
    openPopup(popupProfile);
});

// popup edit

const popupEdit = document.querySelector(".popup-edit");

const popupEditAdd = document.querySelector(".profile__addbtn");
const popupEditclose = popupEdit.querySelector(".popup-edit__btn");

popupEditAdd.addEventListener("click", () => {
    openPopup(popupEdit);
});

popupEditclose.addEventListener("click", () => {
    closePopup(popupEdit);
});

//addcard
const initialCards = [
    {
        name: "Гора Эльбрус",
        link: "images/gora-albrus.jpg",
    },
    {
        name: "Домбай",
        link: "images/dombai.jpg",
    },
    {
        name: "Карачаево-Черкессия",
        link: "images/karachaevsk.jpg",
    },
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
const formEdit = document.querySelector(".popup-edit__form");
const inputName = document.querySelector(".popup__input-name");
const inputLink = document.querySelector(".popup__input-link");

const popupImg = document.querySelector(".popup-img");
const popupImgFull = popupImg.querySelector(".popup-img__fullimg");
const popupImgTitle = popupImg.querySelector(".popup-img__title");
const popupImgClose = popupImg.querySelector(".popup-img__btn");

//handler event

const submitAddCardForm = (event) => {
    console.log("deactive");

    event.preventDefault();
    renderCard({ name: inputName.value, link: inputLink.value });
    closePopup(popupEdit);
    // deactiv btn
    const submitButton = document.querySelector(".popup-edit__btn-add");
    submitButton.classList.add("popup__btn_value_save-error");
    submitButton.disabled = true;
    
    event.target.reset();
};

const deleteCard = (event) => {
    event.target.closest(".element").remove();
};

const likeCard = (event) => {
    event.target.classList.toggle("element__like_active");
};

popupImgClose.addEventListener("click", () => {
    closePopup(popupImg);
});

//generateCard

const generateCard = (cardData) => {
    const newCard = cardTemplate.cloneNode(true);
    const nameCard = newCard.querySelector(".element__title");
    const linkCard = newCard.querySelector(".element__img");

    nameCard.textContent = cardData.name;
    linkCard.src = cardData.link;
    linkCard.alt = cardData.name;
    const deleteCardButton = newCard.querySelector(".element__delete");
    deleteCardButton.addEventListener("click", deleteCard);

    const likeCardButton = newCard.querySelector(".element__like");
    likeCardButton.addEventListener("click", likeCard);

    linkCard.addEventListener("click", () => {
        popupImgTitle.textContent = cardData.name;
        popupImgFull.src = linkCard.src;
        popupImgFull.alt = cardData.name;
        openPopup(popupImg);
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

formEdit.addEventListener("submit", submitAddCardForm);


const setCloseListeners = () => {
        // сделаем из них массив методом Array.from
        const popupList = Array.from(document.querySelectorAll(".popup"));
        // Переберём полученную коллекцию
        popupList.forEach((popup) => {
            // при нажатии на  overlay и крестик закрытие popup
            popup.addEventListener("mousedown", (event) => {
                if (event.target.classList.contains('popup__overlay')) {
                    closePopup(popup)
                }
                if (event.target.classList.contains('popup__btn_value_close')) {
                    closePopup(popup)
                }
                console.log("закрыт при нажатии на overlay или крестик ");
            });
        });
    };
    
    setCloseListeners();
