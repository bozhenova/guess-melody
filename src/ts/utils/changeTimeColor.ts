import { GAME_SETTINGS } from '../data/data';

const changeTimeColor = (time: number) => {
  return time === GAME_SETTINGS.endTime ? `timer-value--finished` : ``;
}

export default changeTimeColor;