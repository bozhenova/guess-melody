import Application from './application';
import { GameModel } from './gameModel';
import { Data } from './data/data';

const SERVER_URL: string = 'https://es31-server.appspot.com/guess-melody/';
const APP_ID: string = '910246';

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
      const response: Response = await fetch(`${SERVER_URL}/questions`);
      const data = await checkStatus(response).json();
      Application._gameData = data;
      Application.showWelcome();
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  }

  static saveResults(model: GameModel) {
    const answers: Data["answers"] = model.state.answers;
    const notes: Data["lives"] = model.state.lives;
    // const result: Data["result"] = model.finalScore;
    // const serverData = Object.assign({ name }, { answers }, { notes }, { result });
    const postSettings = {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      // body: JSON.stringify(serverData)
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}`, postSettings);
  }

  static async loadResults() {
    const response: Response = await fetch(`${SERVER_URL}/stats/${APP_ID}`);
    const data = await checkStatus(response);
    return data.json();
  }
}

