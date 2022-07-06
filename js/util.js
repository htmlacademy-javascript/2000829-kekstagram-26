/* eslint-disable no-console */
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement (elements){
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength(25,140);

export {getRandomPositiveInteger, getRandomArrayElement};
