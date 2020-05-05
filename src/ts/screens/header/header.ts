import AbstractView from "../../abstractView";
import { GAME_SETTINGS, State } from "../../data/data";
import getRadius from "../../utils/getRadius";
import getTime from "../../utils/getTime";
import changeTimeColor from "../../utils/changeTimeColor"

export default class HeaderView extends AbstractView {
  constructor(public state?: State) {
    super();
  }

  get template() {
    return `<header class="header">
          <a class="game-back" href="#">
            <span class="visually-hidden">Сыграть ещё раз</span>
            <img class="game-logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
          </a>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          class="timer"
          viewBox="0 0 780 780">
          <circle
            cx="390"
            cy="390"
            r="370"
            class="timer-line"
            style="
              filter: url(#blur);
              transform: rotate(-90deg) scaleY(-1);
              transform-origin: center;
              stroke-dasharray: ${getRadius(this.state.time, GAME_SETTINGS.radius).stroke};
              stroke-dashoffset: ${getRadius(this.state.time, GAME_SETTINGS.radius).offset};
            "
          ></circle>

          <div class="timer-value ${changeTimeColor(this.state.time)}" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">${getTime(this.state.time).mins}</span>
            <!--
        -->
            <span class="timer-value-dots">:</span>
            <!--
        -->
            <span class="timer-value-secs">${getTime(this.state.time).secs}</span>
          </div>
        </svg>
        <div class="game-mistakes">
        ${new Array(this.state.lives).fill(` <img
            class="game-mistake"
            src="img/wrong-answer.png"
            width="35"
            height="49"
          />`).join(``)}</div>
          </header>`

  }

  onBackButtonClick() { }

  bind() {
    const backButton = this.element.querySelector(`.game-back`);

    backButton.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.onBackButtonClick();
    });
  }

}