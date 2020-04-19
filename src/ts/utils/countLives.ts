import { Settings, State } from '../data/data';

const countLives = (game: State, settings: Settings) => {
  if (game.lives === settings.dead) {
    return { ...game, lives: settings.dead };
  }

  return { ...game, lives: game.lives - 1 };
};

export default countLives;