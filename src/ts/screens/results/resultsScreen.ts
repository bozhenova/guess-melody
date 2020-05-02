import ResultsView from "./resultsView";
import HeaderView from "../header/header";
import Application from "../../application";
import { State } from '../../data/data';

export default class ResultsScreen {
  element: HTMLElement
  header: HeaderView;
  content: ResultsView;

  constructor(public data: State[]) {
    this.data = data.reverse();
    this.content = new ResultsView(data);
    this.element = this.content.element;
  }

  changeScreen() {
    this.content.onReplayButtonClick = () => Application.showWelcome();
  }
}
