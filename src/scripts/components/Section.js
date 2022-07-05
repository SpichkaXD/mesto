export class Section {
    constructor({ renderer }, containerClass) {
        this._containerClass = document.querySelector(containerClass);
        this._renderer = renderer;
    }

    renderItems(initialArray) {       
        initialArray.forEach((item) => {
            this._renderer(item);
        });
    }

    addItemAppend(element) {
        this._containerClass.append(element);
    }

    addItemPrepend(element) {
        this._containerClass.prepend(element);
    }
}
