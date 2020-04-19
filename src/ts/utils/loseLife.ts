import { State } from '../data/data';

const loseLife = (game: State) => {
  return { ...game, lives: game.lives - 1 };
};

export default loseLife;