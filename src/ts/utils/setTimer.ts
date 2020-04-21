import { Settings, State } from '../data/data';

const setTimer = (state: State, settings: Settings) => {
  const second: number = 1;

  return {
    ...state, time: (state.time > settings.endTime) ?
      state.time - second : settings.endTime
  };
};

export default setTimer;