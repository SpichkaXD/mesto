import { openPopup } from "./index.js";
export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._popupImage = document.querySelector(".popup__image");
        this._popupImageTitle = document.querySelector(".popup__image-title");
        this._popupViewImage = document.querySelector(".popup_type_view-image");
        this._element = this._getTemplate();
        this._buttonDelete = this._element.querySelector(".card__delete-button");
        this._buttonLike = this._element.querySelector(".card__like-button");
    }

    _getTemplate() {
        this.card = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
        return this.card;
    }

    _deleteElement() {
        this._element.closest(".card").remove();
    }

    _likeElement() {
        this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active");
    }

    _setPopupViewImageValues() {
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._popupImageTitle.textContent = this._name;

        openPopup(this._popupViewImage);
    }

    generateCard() {
        this._setEventListeners();
        this._element.querySelector(".card__image").src = this._link;
        this._element.querySelector(".card__image").alt = this._name;
        this._element.querySelector(".card__text").textContent = this._name;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".card__image").addEventListener("click", () => this._setPopupViewImageValues());
        this._buttonDelete.addEventListener("click", () => this._deleteElement());
        this._buttonLike.addEventListener("click", () => this._likeElement());
    }
}
