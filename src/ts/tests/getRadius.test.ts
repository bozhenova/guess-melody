import { expect } from "chai";
import { getRadius } from '../utils/getRadius';

describe(`Function should correctly calculate circle length`, () => {
  describe(`Normal cases`, () => {
    it(`Should return full length and 0 in initial state`, () => {
      // 2 * 3.14 * 100 = 6.28 * 100 = 628
      expect(getRadius(1, 100).stroke).to.equal(628);
      expect(getRadius(1, 100).offset).to.equal(0);
    });

    it(`Should return 0 and full length in the final state`, () => {
      // 2 * 3.14 * 100 = 6.28 * 100 = 628
      expect(getRadius(0, 100).stroke).to.equal(628);
      expect(getRadius(0, 100).offset).to.equal(628);
    });

    it(`Offset and length should be equal on a half`, () => {
      // 2 * 3.14 * 100 / 2 = 3.14 * 100 = 314
      expect(getRadius(0.5, 100).stroke).to.equal(628);
      expect(getRadius(0.5, 100).offset).to.equal(314);
    });
  });
});
