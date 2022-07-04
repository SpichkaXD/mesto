export class Card {
    constructor({ data, templateSelector, userData, handleCardClick, handleDeleteCardClick, handleLikes }) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._userData = userData;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._buttonDelete = this._element.querySelector(".card__delete-button");
        this._buttonLike = this._element.querySelector(".card__like-button");
        this._templateCardImage = this._element.querySelector(".card__image");
        this._templateCardText = this._element.querySelector(".card__text");
        this._userId = data.owner._id;
        this._myId = userData._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikes = handleLikes;
        this._cardCounter = this._element.querySelector(".card__counter");
    }

    _getTemplate() {
        this.card = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
        return this.card;
    }

    deleteElement() {
        this._element.remove();
        this._element = null;
    }

    isLiked() {
        return Boolean(
            this._data.likes.find((user) => {
                return user._id === this._myId;
            })
        );
    }

    addLike() {
        this._buttonLike.classList.add("card__like-button_active");
    }

    deleteLike() {
        this._buttonLike.classList.remove("card__like-button_active");
    }

    setLikesCount(item) {
        this._data.likes = item.likes;
        this._cardCounter.textContent = item.likes.length;
    }
    
    generateCard(item) {
        this._setEventListeners();
        this.setLikesCount(item);

        this._templateCardImage.src = this._link;
        this._templateCardImage.alt = this._name;
        this._templateCardText.textContent = this._name;

        if (this._userId == this._myId) this._buttonDelete.classList.add("card__delete-button_active");

        if (this.isLiked()) {
            this.addLike();
        } else {
            this.deleteLike();
        }

        return this._element;
    }

    _setEventListeners() {
        this._templateCardImage.addEventListener("click", () => this._handleCardClick(this._data));
        this._buttonDelete.addEventListener("click", () => this._handleDeleteCardClick(this._data._id));
        this._buttonLike.addEventListener("click", () => this._handleLikes(this._data._id));
    }
}
