import Popup from "./Popup.js";

export  class PopupWithForm extends Popup {
    constructor( popupSelector, { handleFormSubmit }) {
        super( popupSelector );
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._inputlist = this._popup.querySelectorAll(".popup__input");
        
        //loader
        this._buttonSubmit = this._popup.querySelector(".popup__submit-button");
        this._downloadButtonText = this._buttonSubmit.textContent;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputlist.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
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

    //chanhe text button submit
    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = "Загрузка...";
            this._buttonSubmit.disabled = true;
        } else {
            this._buttonSubmit.textContent = this._downloadButtonText;
            this._buttonSubmit.disabled = false;
        }
    }
}
