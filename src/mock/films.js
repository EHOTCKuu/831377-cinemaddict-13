import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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
    commentsCount: `${getRandomInteger(0, 5)} comments`
  };
};

export const generateComents = () => {
  return [
    {
      id: 1,
      text: ``,
      emoji: `smile`,
      authorName: ``,
      date: `2019/12/31 23:59`,
    }
  ];
};
