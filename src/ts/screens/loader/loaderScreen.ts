import LoaderView from "./loaderView";

export default class LoaderScreen {
  element: HTMLElement;
  content: LoaderView;

  constructor() {
    this.content = new LoaderView();
    this.element = this.content.element;
  }
}
