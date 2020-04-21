import { State } from '../data/data';

const changeLevel = (game: State, levelNumber: number, maxLevel: number) => {

  return { ...game, level: (levelNumber >= maxLevel) ? maxLevel : ++levelNumber };
};

export default changeLevel;