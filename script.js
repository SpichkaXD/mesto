const info__btn = document.querySelector(".info__btn");

// popup-profile
const popupProfile = document.querySelector(".popup-profile");
const btnClosePopupProfile = popupProfile.querySelector(".popup-close-profile");
const nameInput = popupProfile.querySelector('.popup__input[name="name"]');
const jobInput = popupProfile.querySelector('.popup__input[name="occupation"]');
const info__name = document.querySelector(".info__name");
const info__occupation = document.querySelector(".info__occupation");
const formElementProfile = popupProfile.querySelector(".popup-form-profile");

// open close popup
function openPopup(popup) {
    popup.classList.add("popup_opened");
    console.log("open");
    //добовляем слушатель на закрытие по кнопке
    document.addEventListener(
        "keydown",
        (evt) => {
            if (evt.key == "Escape") {
                console.log("Esc");
                closePopup(popup);
            }
        },
        { once: true }
    );
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

//функция определения нажатия esc
// function deleteLisener(evt) {
//     if (evt.key == 'Escape') {
//         console.log("Esc");
//     };
// };

formElementProfile.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(evt) {
    evt.preventDefault();
    closePopup(popupProfile);
    info__name.textContent = nameInput.value;
    info__occupation.textContent = jobInput.value;
}

info__btn.addEventListener("click", () => {
    nameInput.value = info__name.textContent;
    jobInput.value = info__occupation.textContent;
    openPopup(popupProfile);
});

btnClosePopupProfile.addEventListener("click", () => {
    closePopup(popupProfile);
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
    event.preventDefault();
    renderCard({ name: inputName.value, link: inputLink.value });
    closePopup(popupEdit);
    inputName.value = "";
    inputLink.value = "";
};

const deleteCard = (event) => {
    event.target.closest(".element").remove();
};

const likeCard = (event) => {
    event.target.closest(".element__like").classList.toggle("element__like_active");
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



//закрытие popup при нажатии overlay
const PopupAll = () => {
    // сделаем из них массив методом Array.from
    const popupList = Array.from(document.querySelectorAll(".popup__overlay"));
    // Переберём полученную коллекцию
    popupList.forEach((popupForm) => {
        // при нажатии на  overlay закрытие popup
        popupForm.addEventListener("click", (event) => {
            const popup = event.target.closest(".popup");
            closePopup(popup);
            console.log("закрыт при нажатии на overlay");
        });
    });
};

PopupAll();
