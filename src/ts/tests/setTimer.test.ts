import { expect } from "chai";
import setTimer from "../utils/setTimer";
import { INITIAL_STATE, GAME_SETTINGS, State } from "../data/data";

describe(`Set game timer`, () => {
  it(`should reduce time by 1 second`, () => {
    const testGame: State = {
      level: 2, lives: 2, time: 120, answers: []
    };
    expect(setTimer(INITIAL_STATE, GAME_SETTINGS).time).to.equal(299);
    expect(setTimer(testGame, GAME_SETTINGS).time).to.equal(119);
  });

  it(`should stop the timer if there is no time left`, () => {
    const testGame: State = {
      level: 2, lives: 2, time: 0, answers: []
    };
    expect(setTimer(testGame, GAME_SETTINGS).time).to.equal(0);
  });

  it(`should not allow the timer to have a negative value`, () => {
    const testGame: State = {
      level: 2, lives: 2, time: -1, answers: []
    };

    expect(setTimer(testGame, GAME_SETTINGS).time).to.equal(0);
  });
});
