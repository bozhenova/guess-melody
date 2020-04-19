import { expect } from "chai";
import countLives from "../utils/countLives";
import { INITIAL_STATE } from "../data/data";
import { GAME_SETTINGS, State } from "../data/data";

describe(`Counting the player lives`, () => {
  it(`should return 0 if there is no lives left`, () => {
    const testGame: State = {
      level: 2, lives: 0, time: 15, answers: []
    };
    expect(countLives(testGame, GAME_SETTINGS)).to.equal(0);
  });

  it(`should return lives value less by 1 if the answer isn't correct`, () => {
    const gameOne: State = {
      level: 5,
      time: 15,
      lives: 2,
      answers: [],
    };
    const gameTwo: State = {
      level: 1,
      time: 20,
      lives: 1,
      answers: [],
    };
    expect(countLives(INITIAL_STATE, GAME_SETTINGS).lives).to.equal(2);
    expect(countLives(gameOne, GAME_SETTINGS).lives).to.equal(1);
    expect(countLives(gameTwo, GAME_SETTINGS).lives).to.equal(0);
  });
});
