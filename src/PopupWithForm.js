import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._inputPlace = this._popup.querySelectorAll(".popup__input");
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._formBox = {};
        this._inputPlace.forEach((input) => {
            this._formBox[input.name] = input.value;
        });
        return this._formBox;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}
