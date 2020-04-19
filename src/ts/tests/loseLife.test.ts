import { expect } from "chai";
import loseLife from "../utils/loseLife";
import { INITIAL_STATE } from "../data/data";
import { State } from "../data/data";

describe(`Counting the player lives`, () => {
  it(`should return -1 if there is no lives left`, () => {
    const testGame: State = {
      level: 2, lives: 0, time: 15, answers: []
    };
    expect(loseLife(testGame).lives).to.equal(-1);
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
    expect(loseLife(INITIAL_STATE).lives).to.equal(2);
    expect(loseLife(gameOne).lives).to.equal(1);
    expect(loseLife(gameTwo).lives).to.equal(0);
  });
});
