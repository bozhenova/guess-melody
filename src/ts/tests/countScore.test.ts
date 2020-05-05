import { expect } from "chai";
import countScore from "../utils/countScore";
import { GAME_SETTINGS } from "../data/data";

describe(`Counting user's score`, () => {
  it(`should return -1 if the number of answers is less than 10`, () => {
    expect(countScore(new Array(9), 3, GAME_SETTINGS)).to.equal(-1);
    expect(countScore(new Array(0), 1, GAME_SETTINGS)).to.equal(-1);
  });
  it(`should return 10 points if the player answered 10 questions in the
    normal amount of time with 3 lives left`, () => {
    const playerAnswers = [
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
    ];
    expect(countScore(playerAnswers, 3, GAME_SETTINGS)).to.equal(10);
  });
  it(`should return 4 points if the player answered 10 questions
    in the normal amount of time and made 2 mistakes`, () => {
    const playerAnswers = [
      {
        result: false,
        answerTime: 15,
        type: 'wrong'
      },
      {
        result: false,
        answerTime: 15,
        type: 'wrong'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
      {
        result: true,
        answerTime: 15,
        type: 'correct'
      },
    ];
    expect(countScore(playerAnswers, 1, GAME_SETTINGS)).to.equal(4);
  });
  it(`should return 20 points if the player answered 10 questions
    quickly and made no mistakes`, () => {
    const playerAnswers = [
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
      {
        result: true,
        answerTime: 9,
        type: 'fast'
      },
    ];
    expect(countScore(playerAnswers, 3, GAME_SETTINGS)).to.equal(20);
  });
});
