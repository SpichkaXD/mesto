const enableValidation = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn_value_save",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-texterror_active",
    errorInput: "popup__input-error"
};


const showInputError = (formElement, inputElement, errorMessage) => {
    // Выбираем элемент ошибки на основе уникального класса
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    //добавление подчеркивания формы
    inputElement.classList.add(enableValidation.inputErrorClass);

    errorElement.classList.add("popup__input-texterror_active");
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, errorInput, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(errorInput);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

//Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        // Если проходит, скроем
        hideInputError(formElement, inputElement);
    }
};

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add("popup__btn_value_save-error");
        buttonElement.disabled = true;
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove("popup__btn_value_save-error");
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(".popup__btn_value_save");
    toggleButtonState(inputList, buttonElement);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener("input", () => {
            // Внутри колбэка вызовем checkInputValidity,
            // передав ей форму и проверяемый элемент
            checkInputValidity(formElement, inputElement);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const isValid = () => {
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(".popup__form"));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });
};

// Вызовем функцию
isValid();