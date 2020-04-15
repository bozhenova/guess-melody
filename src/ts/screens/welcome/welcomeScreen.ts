import Application from '../../application';
import WelcomeView from './WelcomeView';

export default class WelcomeScreen {
  content: WelcomeView;
  element: HTMLElement;

  constructor() {
    this.content = new WelcomeView();
    this.element = this.content.element;
  }
  changeScreen() {
    this.content.onPlayButtonClick = () => Application.showGame();
  }

}