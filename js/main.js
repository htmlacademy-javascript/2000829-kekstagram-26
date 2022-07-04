const DESCRIPTIONS_PHOTOS =[
  'Котики на природе',
  'Кот и собака',
  'Смешный котята',
  'Весело живем',
  'Клуб в работе',
  'Отдых на море',
  'Веселье в разгаре'
];

const MESSAGES_COMMET = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USERS_NAMES = [
  'Алина',
  'Анита',
  'Jerikho',
  'Jane',
  'Water-lily',
  'Test',
  'Даниил',
  'Max',
  'SayHi'
];

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

const createUniqNumber = function() {
  let id = getRandomPositiveInteger(1, 25);
  if (id === this.id || id === this.url) {
    id = getRandomPositiveInteger(1, 25);
    return id;
  }
  return id;
};

function createComment() {
  return {
    id: createUniqNumber(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES_COMMET),
    name: getRandomArrayElement(USERS_NAMES),
  };
}

const allComments = Array.from({length: getRandomPositiveInteger(1, 4)}, createComment);

function createPhotoDiscription() {
  return {
    id: createUniqNumber(),
    url: `photos/${createUniqNumber()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_PHOTOS),
    likes: getRandomPositiveInteger(15, 200),
    commets: allComments,
  };
}

function allPhotos() {
  return Array.from({length: 25}, createPhotoDiscription);
}

allPhotos();
