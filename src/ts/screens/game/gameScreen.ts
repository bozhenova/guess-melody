import Application from '../../application';
import GameView from './GameView';
import HeaderView from '../header/header';
import { GameData, State, GAME_SETTINGS } from '../../data/data';
import { GameModel } from '../../gameModel';

export default class GameScreen {
  content: GameView;
  header: HeaderView;
  headerElement: HTMLElement;
  state: State;
  root: HTMLDivElement;
  timer: number;

  constructor(public model: GameModel) {
    this.header = new HeaderView(this.model.state);
    this.content = new GameView(this.model.getCurrentLevel());
    this.headerElement = this.header.element;
    this.timer = null;
  }

  startGame() {
    this.content.onAnswer = (e: MouseEvent) => {
      const answerTime: number = GAME_SETTINGS.maxTime - this.model.state.time;
      this.answer(this.model.getCurrentLevel(), e, answerTime);
      this.changeLevel();
    };
    this.tick();
  }

  private tick() {
    this.updateHeader();
    this.model.tick();
    this.timer = window.setTimeout(() => {
      this.tick();
      this.abortLevel();
    }, GAME_SETTINGS.interval);
  }

  private abortLevel() {
    if (this.model.state.time === GAME_SETTINGS.endTime) {
      this.endGame();
    }
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  continueGame() {
    return (this.model.isLastLevel() || this.model.isDead()) ? this.endGame() : this.changeLevel();
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    header.onBackButtonClick = () => {
      Application.showWelcome();
    };
    this.header.element.replaceWith(header.element);
    this.header = header;
  }

  endGame() {
    this.stopTimer();
    Application.showResults(this.model);
  }

  changeContentView(view: GameView) {
    this.content.element.replaceWith(view.element);
    this.content = view;
  }

  changeLevel() {
    const time = this.model.state.time;
    this.updateHeader();
    this.model.getNextLevel();
    const content = new GameView(this.model.getCurrentLevel());
    this.changeContentView(content);
    this.content.onAnswer = (e: MouseEvent) => {
      const answerTime: number = time - this.model.state.time;
      this.answer(this.model.getCurrentLevel(), e, answerTime);
      this.continueGame();
    };
  }

  answer(level: GameData[0], e: Event, answerTime: number) {

    let answerType: boolean;

    switch (level.type) {
      case `genre`:
        const gameOptions = Array.from(this.content.element.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>);
        const checkedOptions = Array.from(this.content.element.querySelectorAll(`input:checked`) as NodeListOf<HTMLInputElement>);
        let count = 0;
        gameOptions.forEach((element, index) => {
          if (checkedOptions.indexOf(element) !== -1) {
            level.answers[index].genre === level.genre && count++;
          }
        });
        answerType = count === level.answers.filter(elem => elem[`genre`] = level.genre).length;
        break;

      case `artist`:
        const options = Array.from(this.content.element.querySelectorAll(`.main-answer-wrapper`) as NodeListOf<HTMLDivElement>);
        const option = e.target as HTMLInputElement;
        const answerIndex: number = options.indexOf(option.closest(`.main-answer-wrapper`));
        answerType = level.song.artist === level.answers[answerIndex].artist;
        break;

    }
    if (!answerType) {
      this.model.loseLife();
    }
    this.model.updateScore(answerType, answerTime);
  }

}