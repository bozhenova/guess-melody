import { INITIAL_STATE, GAME_SETTINGS, State, GameData } from './data/data';
import countScore from './utils/countScore';
import Answer from './data/answer';
import changeLevel from './utils/changeLevel';
import setTimer from './utils/setTimer';
import loseLife from './utils/loseLife';

export class GameModel {
  private _state: State;

  constructor(public gameData: GameData) {
    this.restart();
  }

  get state(): State {
    return this._state;
  }

  set state(data) {
    this._state = data;
  }

  get finalScore() {
    return countScore(this.state.answers, this.state.lives, GAME_SETTINGS);
  }

  restart(): void {
    this.state = { ...INITIAL_STATE };
  }

  loseLife(): void {
    this.state = loseLife(this.state);
  }

  isDead(): boolean {
    return this.state.lives <= GAME_SETTINGS.dead;
  }

  isLastLevel(): boolean {
    return this.state.level === GAME_SETTINGS.maxLevel;
  }

  getNextLevel(): void {
    this.state = changeLevel(this.state);
  }

  tick(): void {
    this.state = setTimer(this.state, GAME_SETTINGS);
  }

  resetTimer(): void {
    this.state = { ...this.state, time: INITIAL_STATE.time };
  }

  updateScore(condition: boolean, answerTime: number): void {
    const answer: Answer = condition ? new Answer(true, answerTime) : new Answer(false, answerTime);
    answer.countSpeedType();
    this.state.answers.push(answer);
  }

  getCurrentLevel() {
    return this.gameData[this.state.level - 1];
  }

}