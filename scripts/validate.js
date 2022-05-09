const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn_value_save",
    inactiveButtonClass: "popup__btn_value_save-error",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-texterror_active"
};


const enableValidation = (config) => {
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement, config);
    });
};


const showInputError = (formElement, inputElement, errorMessage, config) => {
    // Выбираем элемент ошибки на основе уникального класса
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    //добавление подчеркивания формы
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    
};

//Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        // Если проходит, скроем
        hideInputError(formElement, inputElement, config);
    }
};

const setEventListeners = (formElement, config) => {
    // Находим все поля внутри формы,
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, config);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener("input", () => {
            // Внутри колбэка вызовем checkInputValidity,
            // передав ей форму и проверяемый элемент
            checkInputValidity(formElement, inputElement, config);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const toggleButtonState = (inputList, buttonElement, config) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInValidInput(inputList, config)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};


// Функция принимает массив полей

const hasInValidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    });
};

// Вызовем функцию
enableValidation(config);