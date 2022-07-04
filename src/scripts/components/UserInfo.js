export class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._userName = document.querySelector(nameSelector);
        this._userActivity = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userActivity.textContent = data.about;
        this._avatar.src = data.avatar;
        this._avatar.alt = data.name;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userActivity.textContent,
        };
    }
}
