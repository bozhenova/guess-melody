import { GameModel } from './gameModel';
import WelcomeScreen from './screens/welcome/welcomeScreen';
import GameScreen from './screens/game/gameScreen';
import ResultsScreen from './screens/results/resultsScreen';
import { GameData } from './data/data';
import Loader from './loader';
import LoaderView from './screens/loader/loaderView';


const mainContent = document.querySelector(`.main`);

const renderScreen = (screenElement: HTMLElement, header?: HTMLElement) => {
  mainContent.innerHTML = ``;
  header && mainContent.before(header);
  mainContent.appendChild(screenElement);
};

const clearHeader = (): void => {
  const header: HTMLElement = document.querySelector('header');
  header && header.remove();
}

export default class Application {
  static _gameData: GameData;

  static start(): void {
    Loader.loadData();
  }

  static set gameData(data: GameData) {
    this._gameData = data;
  }

  static get gameData(): GameData {
    return this._gameData;
  }

  static showLoader(): void {
    const loader = new LoaderView();
    mainContent.append(loader.element);
  }

  static showWelcome(): void {
    const welcome = new WelcomeScreen();
    welcome.changeScreen();
    clearHeader();
    renderScreen(welcome.element);
  }

  static showGame(): void {
    const model = new GameModel(this._gameData);
    const gameScreen = new GameScreen(model);
    renderScreen(gameScreen.content.element, gameScreen.header.element);
    gameScreen.startGame();
  }

  static async showResults(model: GameModel) {
    try {
      await Loader.saveResults(model);
      const loadedResults = await Loader.loadResults();
      const statistics = new ResultsScreen(loadedResults);
      statistics.changeScreen();
      clearHeader();
      renderScreen(statistics.element);
    } catch (e) {
      throw new Error(e);
    }
  }

}