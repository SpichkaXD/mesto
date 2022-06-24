export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._formSelector = config.formSelector;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    }

    _getErrorElement(inputElement) {
        return this._form.querySelector(`#${inputElement.id}-error`);
    }

    _showInputError(inputElement, errorMessage) {
        inputElement.classList.add(this._config.inputErrorClass);
        this._getErrorElement(inputElement).textContent = errorMessage;
        this._getErrorElement(inputElement).classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement) {
        inputElement.classList.remove(this._config.inputErrorClass);
        this._getErrorElement(inputElement).textContent = "";
        this._getErrorElement(inputElement).classList.remove(this._config.errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _toggleButtonState() {
        this._buttonElement.disabled = !this._form.querySelector(this._formSelector).checkValidity();
        this._buttonElement.classList.toggle(
            this._config.inactiveButtonClass,
            !this._form.querySelector(this._formSelector).checkValidity()
        );
    }

    checkInputsOnValidity() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}
