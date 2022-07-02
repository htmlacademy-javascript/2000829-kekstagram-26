/* eslint-disable no-console */
function getRandomInt(min, max) {
  if (min !== max && min >= 0 && 0 <= max && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Не правильно введен диапазон!';
}

getRandomInt(2, 12);


function validLenght(line, maxLeght) {
  if (line >= maxLeght) {
    return false;
  }
  return true;
}

validLenght(10,140);
