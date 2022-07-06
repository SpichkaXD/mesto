export class Section {
    constructor({ renderer }, container) {
        this._container = document.querySelector(container);
        this._renderer = renderer;
    }

    renderItems(initialArray) {       
        initialArray.forEach((item) => {
            this._renderer(item);
        });
    }

    addItemAppend(element) {
        this._container.append(element);
    }

    addItemPrepend(element) {
        this._container.prepend(element);
    }
}
