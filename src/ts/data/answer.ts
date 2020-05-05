import { GAME_SETTINGS } from './data';

export default class Answer {
  type: string

  constructor(public result: boolean, public answerTime: number) {
    this.type = this.result ? `correct` : `wrong`;
  }

  countSpeedType(): void {
    if (this.result && this.answerTime < GAME_SETTINGS.minTime) {
      this.type = `fast`;
    }
  }
}