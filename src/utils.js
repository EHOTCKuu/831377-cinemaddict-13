export const getRandomInteger = (max, min = 0) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
