import dayjs from "dayjs";
import {getRandomInteger} from "./../utils";

const getRandomData = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

const directors = [
  `Anthony Mann`,
  `Christopher Nolan`,
  `Luc Besson`,
  `Robert Zemeckis`,
  `Pedro Almodóvar`,
  `Steven Spielberg`
];

const writersFilm = [
  `Anne Wigton, Heinz Herald, Richard Weil`,
  `Danny Boyle`,
  `Anne Wigton, Heinz Herald`,
  `Heinz Herald, Richard Weil`
];

const actors = [
  `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
  `Alan Rickman, Benedict Cumberbatch`,
  `Benicio del Toro`,
  `Vincent Cassel, Viggo Mortensen, James McAvoy, Jake Gyllenhaal`,
  `Daniel Day-Lewis`,
  `Daniel Radcliffe`
];

const countries = [
  `usa`,
  `russia`,
  `Afghanistan`,
  `Albania`,
  `Algeria`,
  `Andorra`
];

const generateTitle = () => {
  const titles = [
    `Sagebrush Trail`,
    `Forrest Gump`,
    `Eat Pray Love`,
    `Seven Pounds`,
    `The Martian`,
    `Tomorrowland`,
    `Side Effects`
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const beginRandomIndex = getRandomInteger(0, descriptions.length - 5);

  const description = descriptions.slice(beginRandomIndex, getRandomInteger(beginRandomIndex + 1, beginRandomIndex + 5));

  return description.toString();
};

const genres = [
  `Drama`,
  `Musical`,
  `Cartoon`,
  `Western`,
  `Comedy`,
  `Mystery`
];


const generatePoster = () => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];

};

const comment = {
  MAX_COUNT: 5,
  MIN_COUNT: 0,
  MESSAGES: [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`, `Not so bad`],
  EMOJIS: [`smile`, `sleeping`, `puke`, `angry`],
  AUTHORS: [`John Doe`, `Doe John`, `John John`, `Doe Doe`, `John John Doe`],
  DATES: [`2013/12/31 23:59`, `2010/10/01 10:10`, `2005/05/15 15:55`, `2020/09/29 22:09`, `2000/01/01 00:01`,
  ],
};

const createComment = () => {
  const messages = comment.MESSAGES;
  const emojis = comment.EMOJIS;
  const authors = comment.AUTHORS;
  const dates = comment.DATES;

  return {
    message: messages[getRandomInteger(messages.length - 1)],
    emoji: emojis[getRandomInteger(emojis.length - 1)],
    author: authors[getRandomInteger(authors.length - 1)],
    date: dates[getRandomInteger(dates.length - 1)]
  };
};

const generateComments = ({MAX_COUNT: maxCount, MIN_COUNT: minCount}) => {
  return new Array(getRandomInteger(maxCount, minCount)).fill().map(createComment.bind(null, Comment));
};


export const generateFilm = () => {
  return {
    title: generateTitle(),
    titleOriginal: `Original: ${generateTitle()}`,
    rating: `${getRandomInteger(1, 10)}.${getRandomInteger(1, 10)}`,
    year: `${getRandomInteger(1930, 2020)}`,
    duration: dayjs().add(getRandomInteger(5, 120), `minute`).format(`H[h] mm[m]`),
    genre: getRandomData(genres),
    poster: generatePoster(),
    posterFull: `the-great-flamarion.jpg`,
    description: generateDescription(),
    director: getRandomData(directors),
    writers: getRandomData(writersFilm),
    actors: getRandomData(actors),
    releaseDate: dayjs().subtract(getRandomInteger(5, 220), `month`).format(`D MMMM YYYY`),
    country: getRandomData(countries),
    age: `${getRandomInteger(0, 18)}+`,
    addToWatchlist: Boolean(getRandomInteger(0, 1)),
    alredyWatched: Boolean(getRandomInteger(0, 1)),
    addToFavorites: Boolean(getRandomInteger(0, 1)),
    comments: generateComments(comment)
  };
};
