import { State } from '../data/data';

const changeLevel = (game: State) => {

  return { ...game, level: ++game.level };
};

export default changeLevel;