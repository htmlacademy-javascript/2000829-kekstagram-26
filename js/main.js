/* eslint-disable no-console */
function getRandomInt(min, max) {
  if (min === max || min > max) {
    return 'Неправильно введен диапазон';
  }
  if (min <= 0 || 0 >= max) {
    return 'Допустимы только положительные числа';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(2, 12);


function validLenght(line, maxLength) {
  return line <= maxLength;
}

validLenght(25,140);
