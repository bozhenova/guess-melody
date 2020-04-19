type State = { level: number, lives: number, time: number, answers: { result: boolean, time: number, type: string }[] };

type Data = { level: number, lives: number, result: number, answers: { result: boolean, time: number, type: string }[] };

const INITIAL_STATE: State = Object.freeze({
  level: 0,
  lives: 3,
  time: 120,
  answers: []
});

interface GameData { type: string, question: string, genre?: string, src?: string, answers: { src?: string, genre?: string, image?: { url: string, width: number, height: number }, title?: string, isCorrect?: boolean }[] };


const LEVELS: GameData[] = [
  {
    "type": "genre",
    "question": "Выберите все песни в жанре R'n'B",
    "genre": "rnb",
    "answers": [
      {
        "src": "/path/to/file.mp3",
        "genre": "rnb"
      },
      {
        "src": "/path/to/file.mp3",
        "genre": "blues"
      },
      {
        "src": "/path/to/file.mp3",
        "genre": "rock"
      },
      {
        "src": "/path/to/file.mp3",
        "genre": "rnb"
      }
    ]
  },
  {
    "type": "genre",
    "question": "Выберите все блюзовые песни",
    "genre": "blues",
    "answers": [
      {
        "src": "/path/to/file.mp3",
        "genre": "blues"
      },
      {
        "src": "/path/to/file.mp3",
        "genre": "pop"
      },
      {
        "src": "/path/to/file.mp3",
        "genre": "rock"
      },
      {
        "src": "/path/to/file.mp3",
        "genre": "rnb"
      }
    ]
  },
  {
    "type": "artist",
    "question": "Кто исполняет эту песню?",
    "src": "path/to/file.mp3",
    "answers": [
      {
        "image": {
          "url": "http://placehold.it/705x455",
          "width": 300,
          "height": 300
        },
        "title": "Пелагея",
        "isCorrect": false
      },
      {
        "image": {
          "url": "http://placehold.it/705x455",
          "width": 300,
          "height": 300
        },
        "title": "Краснознамённая дивизия имени моей Бабушки",
        "isCorrect": false
      },
      {
        "image": {
          "url": "http://placehold.it/705x455",
          "width": 300,
          "height": 300
        },
        "title": "Кровосток",
        "isCorrect": true
      }
    ]
  }
];

type Settings = { correctAnswerBonus: number, wrongAnswerFine: number, fastAnswerBonus: number, maxLevel: number, interval: number, dead: number, fail: number, endTime: number, minTime: number, maxTime: number, indexStep: number };

const GAME_SETTINGS: Settings = {
  correctAnswerBonus: 1,
  wrongAnswerFine: 2,
  fastAnswerBonus: 2,
  maxLevel: 10,
  interval: 1000,
  dead: -1,
  fail: 0,
  endTime: 0,
  minTime: 30,
  maxTime: 120,
  indexStep: 1
};


export { INITIAL_STATE, State, GAME_SETTINGS, Settings, LEVELS, GameData, Data };