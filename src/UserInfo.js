export class UserInfo {
    constructor(nameSelector, activitySelector) {
        this._userName = document.querySelector(nameSelector);
        this._userActivity = document.querySelector(activitySelector);
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userActivity.textContent = data.activity;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            activity: this._userActivity.textContent,
        };
    }
}
