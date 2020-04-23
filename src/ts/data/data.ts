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

const MOCKED_DATA: any[] = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Quincas Moreira`,
    name: `Firefly`,
    image: `http://www.atribuna.com.br/fileadmin/_processed_/csm_Quincas-Moreira-Foto-Divulgacao_76d1a8b00e.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=79100e44c826e2f7`,
    genre: `Electronic`
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


export { INITIAL_STATE, State, GAME_SETTINGS, Settings, LEVELS, GameData, Data, MOCKED_DATA };