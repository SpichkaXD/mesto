export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._dataArray = data;
        this._containerSelector = containerSelector;
        this._renderer = renderer;
    }

    renderItems() {
        this._dataArray.forEach((item) => {
            this._renderer(item);
        });
    }

    addItemAppend(element) {
        this._containerSelector.append(element);
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }
}
