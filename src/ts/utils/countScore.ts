import { Settings, State } from '../data/data';

const countScore = (answers: State["answers"], lives: number, settings: Settings) => {

  if (answers.length < settings.maxLevel) {
    return settings.dead;
  }

  if (lives === settings.dead) {
    return settings.dead;
  }

  const correctAnswers = answers.filter(answer => answer.result === true);
  const wrongAnswers = answers.filter(answer => answer.result === false);

  let score = 0;

  for (const answer of correctAnswers) {
    if (answer.type === 'fast') {
      score += settings.fastAnswerBonus;
    } else {
      score += settings.correctAnswerBonus;
    }
  }

  return score - wrongAnswers.length * settings.wrongAnswerFine;
}

export default countScore;