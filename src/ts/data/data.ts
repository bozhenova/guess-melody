type State = { level: number, lives: number, time: number, answers: { result: boolean, time: number, type: string }[] };

type Data = { level: number, lives: number, result: number, answers: { result: boolean, time: number, type: string }[] };

const INITIAL_STATE: State = Object.freeze({
  level: 1,
  lives: 3,
  time: 300,
  answers: []
});

type GameData = { type: string, song?: { artist: string, src: string }, genre?: string, answers: { picture?: string, artist?: string, src?: string, genre?: string }[] }[];

const QUESTIONS: GameData = [
  {
    "type": `artist`,
    "song": {
      "artist": `Quincas Moreira`,
      "src": `https://es31-server.appspot.com/guess-melody/static/music/Blue_Whale.mp3`
    },
    "answers": [
      {
        "picture": `https://es31-server.appspot.com/guess-melody/static/artist/Quincas_Moreira.jpg`,
        "artist": `Quincas Moreira`
      },
      {
        "picture": `https://es31-server.appspot.com/guess-melody/static/artist/Density_n_Time.jpg`,
        "artist": `Density & Time`
      },
      {
        "picture": `https://es31-server.appspot.com/guess-melody/static/artist/Endless_Love.jpg`,
        "artist": `Endless Love`
      }
    ]
  },
  {
    "type": `genre`,
    "genre": `reggae`,
    "answers": [
      {
        "src": `https://es31-server.appspot.com/guess-melody/static/music/Addis_Ababa.mp3`,
        "genre": `reggae`
      },
      {
        "src": `https://es31-server.appspot.com/guess-melody/static/music/Azure.mp3`,
        "genre": `electronic`
      },
      {
        "src": `https://es31-server.appspot.com/guess-melody/static/music/Whaling_City.mp3`,
        "genre": `country`
      },
      {
        "src": `https://es31-server.appspot.com/guess-melody/static/music/Skanada.mp3`,
        "genre": `reggae`
      }
    ]
  }
];


type Settings = { correctAnswerBonus: number, wrongAnswerFine: number, fastAnswerBonus: number, maxLevel: number, interval: number, dead: number, fail: number, endTime: number, minTime: number, maxTime: number, indexStep: number, radius: number };

const GAME_SETTINGS: Settings = {
  correctAnswerBonus: 1,
  wrongAnswerFine: 2,
  fastAnswerBonus: 2,
  maxLevel: 10,
  interval: 1000,
  dead: -1,
  fail: 0,
  endTime: 0,
  minTime: 10,
  maxTime: 300,
  indexStep: 1,
  radius: 370
};


export { INITIAL_STATE, State, GAME_SETTINGS, Settings, GameData, Data, QUESTIONS };