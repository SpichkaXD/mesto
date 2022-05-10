const infoBtn = document.querySelector(".info__btn");

// popup-profile
const popupProfile = document.querySelector(".popup-profile");
const nameInput = popupProfile.querySelector('.popup__input[name="name"]');
const jobInput = popupProfile.querySelector('.popup__input[name="occupation"]');
const infoName = document.querySelector(".info__name");
const infoOccupation = document.querySelector(".info__occupation");
const formElementProfile = popupProfile.querySelector(".popup-form-profile");

const spanErrorName = document.querySelector(".name-input-error");
const spanErrorJob = document.querySelector(".job-input-error");
const popupAddBtn = document.querySelector(".popup__btn_value_save"); 
const nameImages = document.querySelector('.popup__input[name="images"]');
const linkImages = document.querySelector('.popup__input[name="url"]');
const spanErrorNameImg = document.querySelector(".name-img-input-error");
const spanErrorLinkImg = document.querySelector(".url-input-error");


// open close popup
function openPopup(popup) {
    popup.classList.add("popup_opened");
    //добовляем слушатель на закрытие по кнопке
    document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEsc);
}

//функция определения нажатия esc
function closeByEsc(evt) {
    if (evt.key == "Escape") {
        const openPopup = document.querySelector(".popup_opened");
        closePopup(openPopup);
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
    nameInput.classList.remove("popup__input-error");
    jobInput.classList.remove("popup__input-error");
    spanErrorName.classList.remove("popup__input-texterror_active");
    spanErrorJob.classList.remove("popup__input-texterror_active");
    popupAddBtn.classList.remove("popup__btn_value_save-error");
    openPopup(popupProfile);
});

// popup edit

const popupEdit = document.querySelector(".popup-edit");

const popupEditAdd = document.querySelector(".profile__addbtn");
popupEditAdd.addEventListener("click", () => {
    nameImages.value = "";
    linkImages.value = "";
    
    nameImages.classList.remove("popup__input-error");
    linkImages.classList.remove("popup__input-error");
    spanErrorNameImg.classList.remove("popup__input-texterror_active");
    spanErrorLinkImg.classList.remove("popup__input-texterror_active");
    openPopup(popupEdit);
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

//handler event

const submitAddCardForm = (event) => {
    event.preventDefault();
    renderCard({ name: inputName.value, link: inputLink.value });
    closePopup(popupEdit);
    // deactiv btn
    const submitButton = event.submitter;
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
            if (event.target.classList.contains("popup__overlay")) {
                closePopup(popup);
            }
            if (event.target.classList.contains("popup__btn_value_close")) {
                closePopup(popup);
            }
        });
    });
};

setCloseListeners();
