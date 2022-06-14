export class Card {
    constructor(data, templateSelector, {handleCardClick}) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._popupImage = document.querySelector(".popup__image");
        this._popupImageTitle = document.querySelector(".popup__image-title");
        this._popupViewImage = document.querySelector(".popup_type_view-image");
        this._element = this._getTemplate();
        this._buttonDelete = this._element.querySelector(".card__delete-button");
        this._buttonLike = this._element.querySelector(".card__like-button");
        this._templateCardImage = this._element.querySelector(".card__image");
        this._templateCarText = this._element.querySelector(".card__image");
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        this.card = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
        return this.card;
    }

    _deleteElement() {
        this._element.closest(".card").remove();
    }
    // _deleteElement() {
    //     this._element.remove();
    //     this._element = null;
    //   }

    _likeElement() {
        this._buttonLike.classList.toggle("card__like-button_active");
    }

    // _setPopupViewImageValues() {
    //     this._popupImage.src = this._link;
    //     this._popupImage.alt = this._name;
    //     this._popupImageTitle.textContent = this._name;

    //     openPopup(this._popupViewImage);
    // }

    generateCard() {
        this._setEventListeners();
        this._templateCardImage.src = this._link;
        this._templateCardImage.alt = this._name;
        this._element.querySelector(".card__text").textContent = this._name;
        return this._element;
    }

    _setEventListeners() {
        // this._templateCardImage.addEventListener("click", () => this._setPopupViewImageValues());
        this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick(this._data));
        this._buttonDelete.addEventListener("click", () => this._deleteElement());
        this._buttonLike.addEventListener("click", () => this._likeElement());
    }
}
