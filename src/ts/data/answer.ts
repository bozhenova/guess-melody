import { GAME_SETTINGS, State } from './data';

export default class Answer {
  type: string

  constructor(public result: boolean, public state: State) {
    this.type = this.result ? `correct` : `wrong`;
  }

  countSpeedType(): void {
    if (this.result && this.state.time > GAME_SETTINGS.maxTime - GAME_SETTINGS.minTime * this.state.level) {
      this.type = `fast`;
    }
  }
}