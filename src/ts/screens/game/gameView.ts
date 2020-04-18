import AbstractView from '../../abstractView';
import { GAME_SETTINGS, GameData } from '../../data/data';

export default class GameView extends AbstractView {
  constructor(public data: GameData) {
    super();
  }
  get template(): string {
    const questionGenreTemplate = (data: GameData) => {
      const questionTemplate = (data: GameData["answers"][0], index: number) => {
        return `<div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio>
                  <source src=${data.src}>
                  </audio>
                  <button class="player-control player-control--pause"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="answer-${index + GAME_SETTINGS.indexStep}" id="a-${index + GAME_SETTINGS.indexStep}">
              <label class="genre-answer-check" for="a-${index + GAME_SETTINGS.indexStep}"></label>
            </div>`;
      }
      return `<form class="genre">
        ${data.answers.map(questionTemplate).join(``)}
      <button class="genre-answer-send" type="submit">Ответить</button>
          </form>`;
    }

    const questionArtistTemplate = (data: GameData) => {
      const questionTemplate = (data: GameData["answers"][0], index: number) => {
        return `<div class="main-answer-wrapper">
              <input
                class="main-answer-r"
                type="radio"
                id="answer-${index + GAME_SETTINGS.indexStep}"
                name="answer"
                value="val-${index + GAME_SETTINGS.indexStep}"
              />
              <label class="main-answer" for="answer-${index + GAME_SETTINGS.indexStep}">
                <img
                  class="main-answer-preview"
                  src="${data.image.url}"
                  alt="${data.title}"
                  width="${data.image.width}"
                  height="${data.image.height}"
                />
                ${data.title}
              </label>
            </div>`;
      }

      return `<div class="player-wrapper">
            <div class="player">
              <audio>
              <source src=${data.src}></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
        ${data.answers.map(questionTemplate).join(``)}
      </form>`;
    }


    let currentQuestion = null;

    switch (this.data.type) {
      case `genre`:
        currentQuestion = questionGenreTemplate(this.data);
        break;
      case `artist`:
        currentQuestion = questionArtistTemplate(this.data);
        break;
    }

    return `<section class="main main--level main--level--${this.data.type}">
    <svg
          xmlns="http://www.w3.org/2000/svg"
          class="timer"
          viewBox="0 0 780 780"
        >
          <circle
            cx="390"
            cy="390"
            r="370"
            class="timer-line"
            style="
              filter: url(#blur);
              transform: rotate(-90deg) scaleY(-1);
              transform-origin: center;
            "
          ></circle>

          <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">05</span>
            <!--
        -->
            <span class="timer-value-dots">:</span>
            <!--
        -->
            <span class="timer-value-secs">00</span>
          </div>
        </svg>
        <div class="main-mistakes">
          <img
            class="main-mistake"
            src="img/wrong-answer.png"
            width="35"
            height="49"
          />
          <img
            class="main-mistake"
            src="img/wrong-answer.png"
            width="35"
            height="49"
          />
        </div>
      <div class="main-wrap">
      <h2 class="title">${this.data.question}</h2>
      ${currentQuestion}
      </div>
    </section>`;
  }

  onAnswer(e: Event): void { }

  bind(): void {
    switch (this.data.type) {
      case `genre`:
        const gameOptions = this.element.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>;
        const submitButton = this.element.querySelector(`.genre-answer-send`) as HTMLButtonElement;
        const form = this.element.querySelector('.genre') as HTMLFormElement;

        submitButton.disabled = true;
        [...gameOptions].forEach(option => option.addEventListener(`change`, (e) => {
          e.preventDefault();
          submitButton.disabled = ![...gameOptions].some(option => option.checked);
          this.onAnswer(e);
        }));

        form.addEventListener(`submit`, (e) => {
          e.preventDefault();
        });

        break;

      case `artist`:
        const gameInputs: NodeListOf<HTMLInputElement> = this.element.querySelectorAll(`input`);

        [...gameInputs].forEach(input => input.addEventListener(`click`, (e) => {
          e.preventDefault();
          this.onAnswer(e);
        }
        ));
        break;
    }
  }

}