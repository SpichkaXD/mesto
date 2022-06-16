import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageTitle = this._popup.querySelector(".popup__image-title");
        this._popupImage = this._popup.querySelector(".popup__image");
    }
    
    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupImageTitle.textContent = data.name;

        super.open();
    }
}
