import {getRandomPositiveInteger, getRandomArrayElement} from './util.js';

const DESCRIPTIONS_PHOTOS =[
  'Котики на природе',
  'Кот и собака',
  'Смешный котята',
  'Весело живем',
  'Клуб в работе',
  'Отдых на море',
  'Веселье в разгаре'
];

const MESSAGES_COMMENT = [
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

const createUniqNumber = () => {
  let id = getRandomPositiveInteger(1, 25);
  if (id === createComment.id) {
    id = getRandomPositiveInteger(1, 25);
    return id;
  }
  return id;
};

function createComment() {
  return {
    id: createUniqNumber(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES_COMMENT),
    name: getRandomArrayElement(USERS_NAMES),
  };
}

const allComments = () => Array.from({length: getRandomPositiveInteger(1, 4)}, createComment);

const createPhotoDiscription = () => ({
  id: createUniqNumber(),
  url: `photos/${createUniqNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS_PHOTOS),
  likes: getRandomPositiveInteger(15, 200),
  comments: allComments(),
});

const allPhotos = () => Array.from({length: 25}, createPhotoDiscription);

export {allPhotos};
