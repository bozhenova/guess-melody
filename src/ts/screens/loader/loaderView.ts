import AbstractView from "../../abstractView";

export default class LoaderView extends AbstractView {
  settings: { width: number, height: number }

  constructor() {
    super();
    this.settings = {
      width: 64,
      height: 64
    };
  }

  get template() {
    return `
    <div class="wrapper">
      <img src="./img/plate.gif" width="${this.settings.width}" height="${this.settings.height}">
    </div>
    `;
  }
}
