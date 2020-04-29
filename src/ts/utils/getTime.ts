import { State } from '../data/data';

const getTime = (time: number) => {
  let mins = Math.floor(time / 60);
  let secs = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
  return { mins, secs }
};

export default getTime;