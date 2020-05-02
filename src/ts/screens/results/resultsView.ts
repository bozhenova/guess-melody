import AbstractView from "../../abstractView";
import { INITIAL_STATE, GAME_SETTINGS, State } from "../../data/data";
import { getTimeText, getMistakesText } from "../../utils/getText";

export default class ResultsView extends AbstractView {
  constructor(public data: State[]) {
    super();
  }

  get template() {
    const successTemplate = (data: State) => {
      const fastAnswerBonus = data.answers.filter(answer => answer.type === `fast`).length;
      const mins = Math.floor((GAME_SETTINGS.maxTime - data.time) / 60);
      const secs = Math.floor((GAME_SETTINGS.maxTime - data.time) % 60);
      const mistakes = INITIAL_STATE.lives - data.lives;

      return `<h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">
          За ${getTimeText(mins, 'минут')} и ${getTimeText(secs, 'секунд')}<br />вы набрали ${data.result} баллов (${fastAnswerBonus === 1 ? fastAnswerBonus + ' быстрый' : fastAnswerBonus + ' быстрых'}), <br />совершив ${getMistakesText(mistakes, 'ошиб')}
        </div>
        <span class="main-comparison"
          >Вы заняли 2 место из 10. Это&nbsp;лучше, чем
          у&nbsp;80%&nbsp;игроков</span
        >
        <span role="button" tabindex="0" class="main-replay">
          Сыграть ещё раз</span>`;
    }

    const outOfLivesTemplate = () => {
      return `<h2 class="title">Какая жалость!</h2>
        <div class="main-stat">
          У вас закончились все попытки.<br />Ничего, повезёт в следующий раз!
        </div>
        <span role="button" tabindex="0" class="main-replay"
          >Попробовать ещё раз</span>`;
    }

    const outOfTimeTemplate = () => {
      return `<h2 class="title">Увы и ах!</h2>
        <div class="main-stat">
          Время вышло!<br />Вы не успели отгадать все мелодии
        </div>
        <span role="button" tabindex="0" class="main-replay"
          >Попробовать ещё раз</span>`;
    }

    const resultTemplate = (data: State) => {
      if (data.time <= GAME_SETTINGS.endTime) {
        return outOfTimeTemplate();
      } else if (data.lives <= GAME_SETTINGS.dead) {
        return outOfLivesTemplate();
      } else {
        return successTemplate(data);
      }
    }

    return `<section class="main main--result">
        <section class="logo" title="Угадай мелодию">
          <h1>Угадай мелодию</h1>
        </section>
        ${resultTemplate(this.data[0])}
        </section>`;




  }

  onReplayButtonClick() { }

  bind(): void {
    const replayButton = this.element.querySelector('.main-replay');
    replayButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.onReplayButtonClick();
    })
  }
}
