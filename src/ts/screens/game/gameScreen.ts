import Application from '../../application';
import GameView from './GameView';
import { LEVELS, GameData } from '../../data/data';
import { GameModel } from '../../gameModel';

export default class GameScreen {
  content: GameView;
  element: HTMLElement;

  constructor(public model?: GameModel) {
    this.content = new GameView(LEVELS[0]);
    this.element = this.content.element;
  }

  startGame() {
    this.content.onAnswer = (e: MouseEvent) => {
      this.answer(this.model.getCurrentLevel(), e);
      this.changeLevel();
    };
  }

  changeContentView(view: GameView) {
    document.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  changeLevel() {
    const content = new GameView(this.model.getCurrentLevel());
    this.changeContentView(content);
    this.content.onAnswer = (e: MouseEvent) => {
      this.answer(this.model.getCurrentLevel(), e);
      this.changeLevel();
    };
  }

  answer(level: GameData, e: Event) {
    let answerType: boolean;
    switch (level.type) {
      case `genre`:
        const gameInputs = this.element.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>;
        const gameOptions = this.element.querySelectorAll(`input:checked`) as NodeListOf<HTMLInputElement>;
        let count = 0;
        [...gameInputs].forEach((element, index) => {
          if ([...gameOptions].indexOf(element) !== -1) {
            level.answers[index].genre === level.genre;
            count++;
            console.log(count);
          }
        });
        answerType = count === level.answers.filter(elem => elem[`genre`] = level.genre).length;
        break;

      case `artist`:
        const option = e.target as HTMLImageElement;
        const title = option.alt;

        level.answers.forEach(element => {
          if (element.title = title) {
            console.log(element.title)
            return answerType = element.isCorrect;
          }
        });

        break;

    }
    if (!answerType) {
      console.log('wrong answer');
    }
    console.log('right answer');
  }

}