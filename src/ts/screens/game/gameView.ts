import { expect } from 'chai';
import AbstractView from '../../abstractView';
import { GAME_SETTINGS, GameData } from '../../data/data';
import Player from '../../player';

export default class GameView extends AbstractView {
  constructor(public data: GameData[0]) {
    super();
  }

  get template(): string {
    const questionGenreTemplate = (data: GameData[0]["answers"]) => {
      const questionTemplate = (data: GameData[0]["answers"][0], index: number) => {
        return `<div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio src=${data.src}>
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
        ${data.map(questionTemplate).join(``)}
      <button class="genre-answer-send" type="submit">Ответить</button>
          </form>`;
    }

    const questionArtistTemplate = (data: GameData[0]) => {
      const questionTemplate = (data: GameData[0]["answers"][0], index: number) => {
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
                  src="${data.picture}"
                  alt="${data.artist}"
                  width="300"
                  height="300"
                />
                ${data.artist}
              </label>
            </div>`;
      }

      return `<div class="player-wrapper">
            <div class="player">
              <audio>
              <source src=${data.song.src}></audio>
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
        currentQuestion = questionGenreTemplate(this.data.answers);
        break;
      case `artist`:
        currentQuestion = questionArtistTemplate(this.data);
        break;
    }

    return `<section class="main--level main--level--${this.data.type}">
      <div class="main-wrap">
      <h2 class="title">${this.data.type === `genre` ? `Выберите все песни жанра ${this.data.genre}` : `Кто исполняет эту песню?`}</h2>
      ${currentQuestion}
      </div>
    </section>`;
  }

  onAnswer(e: MouseEvent): void { }

  bind(): void {
    switch (this.data.type) {
      case `genre`:
        const submitButton = this.element.querySelector(`.genre-answer-send`) as HTMLButtonElement;
        const gameOptions = Array.from(this.element.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>);
        const form = this.element.querySelector('.genre') as HTMLFormElement;
        const tracks = Array.from(this.element.querySelectorAll('.player') as NodeListOf<HTMLDivElement>);
        const players = tracks.map((track: HTMLElement) => new Player(track));

        submitButton.disabled = true;

        for (const option of gameOptions) {
          option.addEventListener(`change`, () => {
            submitButton.disabled = !gameOptions.some(item => item.checked);
          });
        }

        for (const player of players) {
          player.playButton.addEventListener(`click`, (e) => {
            e.preventDefault();
            const isPlaying = player.isPlaying;
            for (const item of players) {
              item.pause();
            }
            if (!isPlaying) {
              player.isPlaying = isPlaying;
              player.play();
            }
          });
        }

        form.addEventListener(`submit`, (e: MouseEvent) => {
          e.preventDefault();
          const answer = gameOptions.map(item => item.checked);
          this.onAnswer(e);
        });

        break;

      case `artist`:
        const gameInputs = Array.from(this.element.querySelectorAll(`input`) as NodeListOf<HTMLInputElement>);
        const track = this.element.querySelector('.player') as HTMLElement;
        const player = new Player(track);

        player.playButton.addEventListener(`click`, () => {
          const isPlaying = player.isPlaying;
          if (!isPlaying) {
            player.isPlaying = isPlaying;
            player.play();
          } else {
            player.pause();
          }
        });

        for (const input of gameInputs) {
          input.addEventListener(`change`, (e: MouseEvent) => {
            const answer: any = gameInputs.map(item => item.checked);
            this.onAnswer(e);
          });
        }

        break;
    }

  }
}
