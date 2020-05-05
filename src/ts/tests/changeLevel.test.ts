import changeLevel from "../utils/changeLevel";
import { State } from "../data/data";
import { expect } from "chai";

describe(`Changing the level`, () => {
  it(`should change the level when the player answered the question`, () => {
    const gameOne: State = {
      level: 5,
      time: 15,
      lives: 2,
      answers: [],
    };
    const gameTwo: State = {
      level: 4,
      time: 20,
      lives: 1,
      answers: [],
    };
    expect(
      changeLevel(gameOne).level).to.equal(6);
    expect(
      changeLevel(gameTwo).level).to.equal(5);
  });
});
