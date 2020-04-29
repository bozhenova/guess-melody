import { expect } from "chai";
import getTime from "../utils/getTime";

describe(`Show remaining time`, () => {
  it(`should show correct time`, () => {
    expect(
      getTime(120)).to.deep.equal({ mins: 2, secs: '00' });
    expect(
      getTime(300)).to.deep.equal({ mins: 5, secs: '00' });
    expect(
      getTime(10)).to.deep.equal({ mins: 0, secs: 10 });
  });

});
