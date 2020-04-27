import { expect } from "chai";
import { getRadius } from '../utils/getRadius';
import { GAME_SETTINGS } from '../data/data';

describe(`Function should correctly calculate circle length`, () => {
  describe(`Normal cases`, () => {
    it(`Should return 0 in initial state`, () => {
      expect(getRadius(300, GAME_SETTINGS.radius).stroke).to.equal(2325);
      expect(getRadius(300, GAME_SETTINGS.radius).offset).to.equal(0);
    });

    it(`Should return full length in the final state`, () => {
      expect(getRadius(0, GAME_SETTINGS.radius).stroke).to.equal(2325);
      expect(getRadius(0, GAME_SETTINGS.radius).offset).to.equal(2325);
    });

    it(`Offset should be equal to half the length in the middle`, () => {
      expect(getRadius(150, GAME_SETTINGS.radius).stroke).to.equal(2325);
      expect(getRadius(150, GAME_SETTINGS.radius).offset).to.equal(1162);
    });
  });
});
