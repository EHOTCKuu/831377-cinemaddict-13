import {getRandomInteger} from '../util.js';
import {generateId, DESCRIPTIONS} from './description';
import {comments} from './comments';

const MAX_DESCRIPTION_SENTENCES = 5;
const MAX_COMMENTS_NUMBER = 5;

const FILMS = [
  {poster: `./images/posters/made-for-each-other.png`,
    title: `Made for Each Other`},
  {poster: `./images/posters/popeye-meets-sinbad.png`,
    title: `Popeye the Sailor Meets Sindbad the Sailor`},
  {poster: `./images/posters/sagebrush-trail.jpg`,
    title: `Sagebrush Trail`},
  {poster: `./images/posters/santa-claus-conquers-the-martians.jpg`,
    title: `Santa Claus Conquers the Martians`},
  {poster: `./images/posters/the-dance-of-life.jpg`,
    title: `The Dance of Life`},
  {poster: `./images/posters/the-great-flamarion.jpg`,
    title: `The Great Flamarion`},
  {poster: `./images/posters/the-man-with-the-golden-arm.jpg`,
    title: `The Man with the Golden Arm`}
];

const DIRECTORS = [
  `Anthony Mann`,
  `Nick Go`,
  `Tim Top`,
  `Anna Svetlova`,
  `Kate White`
];

const WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Wigton Heinz`,
  `Weil Wigton`,
];

const ACTORS = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Stroheim Dan`,
  `Beth Erich`,
  `Anna Mann`,
  `Anthony Richard`,
];

const GENRES = [`comedy`, `drama`, `romantic`, `classic`, `cartoon`, `thriller`];

const COUNTRIES = [`USA`, `UK`, `USSR`, `Germany`, `France`];

const AGES = [`12`, `16`, `18`];

const generateDescription = () => {
  let description = [];
  for (let i = 0; i < MAX_DESCRIPTION_SENTENCES; i++) {
    description.push(DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]);
  }
  return description.join(` `);
};

const generateDuration = () => {
  const duration = getRandomInteger(30, 240);
  const hours = duration / 60;
  const minutes = duration % 60;
  return hours < 1 ? `${minutes}m` : `${Math.floor(hours)}h ${minutes}m`;
};

const generateRandomSet = (array) => {
  let newArr = [];
  for (let i = 0; i < getRandomInteger(1, array.length - 1); i++) {
    newArr.push(array[getRandomInteger(0, array.length - 1)]);
  }
  return Array.from(new Set(newArr));
};

const generateCommentsIdArr = () => {
  let idArr = [];
  for (let i = 0; i < getRandomInteger(0, MAX_COMMENTS_NUMBER); i++) {
    idArr.push(comments[getRandomInteger(0, comments.length - 1)].id);
  }
  return idArr;
};

export default class MockFilm {
  constructor() {
    this._id = generateId();
    this._filmIndex = getRandomInteger(0, FILMS.length - 1);
    this._poster = FILMS[this._filmIndex].poster;
    this._title = FILMS[this._filmIndex].title;
    this._originalTitle = FILMS[getRandomInteger(0, FILMS.length - 1)].title;
    this._raiting = getRandomInteger(1, 10);
    this._date = new Date(`${getRandomInteger(1935, 2020)},${getRandomInteger(1, 12)},${getRandomInteger(1, 31)}`);
    this._duration = generateDuration();
    this._genre = generateRandomSet(GENRES);
    this._description = generateDescription();
    this._comments = generateCommentsIdArr();
    this._director = DIRECTORS[getRandomInteger(0, DIRECTORS.length - 1)];
    this._writers = generateRandomSet(WRITERS);
    this._actors = generateRandomSet(ACTORS);
    this._isInWatchlist = Boolean(getRandomInteger(0, 1));
    this._isInHistory = Boolean(getRandomInteger(0, 1));
    this._isFavourite = Boolean(getRandomInteger(0, 1));
    this._country = COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)];
    this._age = AGES[getRandomInteger(0, AGES.length - 1)];
  }

  getNewFilm() {
    return {
      id: this._id,
      poster: this._poster,
      title: this._title,
      originalTitle: this._originalTitle,
      raiting: this._raiting,
      date: this._date,
      duration: this._duration,
      genre: this._genre,
      description: this._description,
      isInWatchlist: this._isInWatchlist,
      isInHistory: this._isInHistory,
      isFavourite: this._isFavourite,
      comments: this._comments,
      director: this._director,
      writers: this._writers,
      actors: this._actors,
      country: this._country,
      age: this._age
    };
  }
}
