export default class Player {
  _audio: HTMLAudioElement
  playButton: HTMLElement
  isPlaying: boolean

  constructor(public track: HTMLElement) {
    this.playButton = this.track.querySelector(`.player-control`);
    this._audio = this.track.querySelector(`audio`);
  }

  _toggle() {
    this.playButton.classList.toggle(`player-control--play`);
    this.playButton.classList.toggle(`player-control--pause`);
    this.isPlaying = !this.isPlaying;
  }

  play() {
    if (!this.isPlaying) {
      this._audio.play();
      this._toggle();
    }
  }

  pause() {
    if (this.isPlaying) {
      this._audio.pause();
      this._toggle();
    }
  }
}