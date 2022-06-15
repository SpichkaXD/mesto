export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector(".popup__close-button");
        this._handleEscClose = this._handleEscClose.bind(this); //closePopupOnEsc
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }


    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _closePopupOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            this.close(evt.currentTarget);
        }
    }

    setEventListeners() {
        this._buttonClose.addEventListener("click", () => this.close());
        this._popup.addEventListener("mousedown", (evt) => this._closePopupOnOverlay(evt));
    }
}
