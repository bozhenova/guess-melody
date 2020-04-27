import { GAME_SETTINGS } from '../data/data';

export const getRadius = (time: number, radius: number) => {
  const stroke = Math.round(2 * Math.PI * radius);
  const offset = stroke - Math.round((time / GAME_SETTINGS.maxTime) * stroke);

  return { stroke, offset };
};