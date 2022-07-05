import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setSubmit(newHandler) {
        this._handleFormSubmit = newHandler; //!новый обработчик 
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }
}
