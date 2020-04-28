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

  get finalScore() {
    return countScore(this.state.answers, this.state.lives, GAME_SETTINGS);
  }

  restart(): void {
    const answers: object[] = [];
    this._state = Object.assign({}, INITIAL_STATE, { answers });
  }

  loseLife(): void {
    this._state = loseLife(this.state);
  }

  isDead(): boolean {
    return this.state.lives <= GAME_SETTINGS.dead;
  }

  isLastLevel(): boolean {
    return changeLevel(this.state, this.state.level, GAME_SETTINGS.maxLevel).level === GAME_SETTINGS.maxLevel + 1;
  }

  getNextLevel(): void {
    this._state = changeLevel(this.state, this.state.level, GAME_SETTINGS.maxLevel);
  }

  tick(): void {
    this._state = setTimer(this.state, GAME_SETTINGS);
  }

  resetTimer(): void {
    const time: number = INITIAL_STATE.time;
    this._state = Object.assign({}, this.state, { time });
  }

  updateScore(condition: boolean): void {
    const answer: Answer = condition ? new Answer(true, this.state) : new Answer(false, this.state);
    answer.countSpeedType();
    this.state.answers.push(answer);
  }

  getCurrentLevel() {
    return this.gameData[this.state.level - 1];
  }

}