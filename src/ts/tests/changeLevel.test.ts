import changeLevel from "../utils/changeLevel";
import { INITIAL_STATE, GAME_SETTINGS } from "../data/data";
import { expect } from "chai";

describe(`Changing the level`, () => {
  it(`should change the level when the player answered the question`, () => {
    expect(
      changeLevel(INITIAL_STATE, 0, GAME_SETTINGS.maxLevel).level
    ).to.equal(1);
    expect(
      changeLevel(INITIAL_STATE, 1, GAME_SETTINGS.maxLevel).level
    ).to.equal(2);
    expect(
      changeLevel(INITIAL_STATE, 2, GAME_SETTINGS.maxLevel).level
    ).to.equal(3);
  });
  it(`should not allow the level to be more than 10`, () => {
    expect(
      changeLevel(INITIAL_STATE, 11, GAME_SETTINGS.maxLevel).level
    ).to.equal(10);
    expect(
      changeLevel(INITIAL_STATE, 12, GAME_SETTINGS.maxLevel).level
    ).to.equal(10);
  });
});
