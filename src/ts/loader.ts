import Application from './application';
import { GameModel } from './gameModel';
import { State, GAME_SETTINGS } from './data/data';

const SERVER_URL: string = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody`;
const APP_ID: string = '910148';

const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status} (${response.statusText})`);
  }
};

export default class Loader {
  static async loadData() {
    Application.showLoader();
    try {
      const response: Response = await fetch(`https://es31-server.appspot.com/guess-melody/questions`);
      const data = await checkStatus(response).json();
      Application._gameData = data;
      Application.showWelcome();
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  }

  static async saveResults(model: GameModel) {
    const answers: State["answers"] = model.state.answers;
    const lives: State["lives"] = model.state.lives;
    const time: State["time"] = model.state.time;
    const result: State["result"] = model.finalScore;
    const serverData = Object.assign({ answers }, { lives }, { time }, { result });
    const postSettings = {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify(serverData)
    };
    return await fetch(`${SERVER_URL}/stats/${APP_ID}`, postSettings);
  }

  static async loadResults() {
    const response: Response = await fetch(`${SERVER_URL}/stats/${APP_ID}`);
    const data = await checkStatus(response);
    return await data.json();
  }
}

