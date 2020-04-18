import { GameModel } from './gameModel';
import WelcomeScreen from './screens/welcome/welcomeScreen';
import GameScreen from './screens/game/gameScreen';
import { GAME_SETTINGS, GameData } from './data/data';


const mainContent = document.querySelector(`.main`);

const renderScreen = (screenElement: HTMLElement) => {
  mainContent.innerHTML = ``;
  mainContent.append(screenElement);
};


export default class Application {
  static _gameData: GameData[];

  static set gameData(data: GameData[]) {
    this._gameData = data;
  }

  static get gameData(): GameData[] {
    return this._gameData;
  }

  static showWelcome(): void {
    const welcome = new WelcomeScreen();
    welcome.changeScreen();
    renderScreen(welcome.element);
  }

  static showGame(): void {
    const model = new GameModel(this._gameData);
    const gameScreen = new GameScreen();
    renderScreen(gameScreen.element);
    gameScreen.startGame();
  }

}