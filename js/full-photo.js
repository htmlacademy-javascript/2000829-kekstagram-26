import {photos} from './photo.js';
import { isEscapeKey } from './util.js';

const NUMBER_COMMENTS_SHOW = 5;
const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img img');
const photoDescription = bigPhoto.querySelector('.social__caption');
const photoLikes = bigPhoto.querySelector('.likes-count');
const allComments = bigPhoto.querySelector('.social__comments');
const commentsCount = bigPhoto.querySelector('.comments-count');
const socialComCount = bigPhoto.querySelector('.social__comment-count');
const commentsLoader = bigPhoto.querySelector('.comments-loader');
const photoContainer = document.querySelector('.pictures');
const closePhotoButton = bigPhoto.querySelector('.cancel');
const socialComment = bigPhoto.querySelector('.social__comment');
let countAllCommentsShow = 0;

const makeComments = (comments, totalNumberComments) => {

  const fragmentComments = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const newComment = socialComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    fragmentComments.appendChild(newComment);
    countAllCommentsShow++;
  });

  allComments.append(fragmentComments);
  socialComCount.textContent = `${countAllCommentsShow} из ${totalNumberComments} комментариев`;
};

const clearComments = () => {
  allComments.innerHTML = '';
};

const createComments = (comments) => {
  const commentsArrayCopy = comments.slice();
  const allCommentsCount = comments.length;

  if (allCommentsCount <= NUMBER_COMMENTS_SHOW) {
    makeComments(commentsArrayCopy, allCommentsCount);
    commentsLoader.classList.add('hidden');
    return;
  }

  const makeRemainingComments = () => {
    makeComments(commentsArrayCopy.splice(0, NUMBER_COMMENTS_SHOW), allCommentsCount);

    if (commentsArrayCopy.length === 0) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', makeRemainingComments); // убираем обработчик на кнопку загрузки комментариев
    }
  };

  makeComments(commentsArrayCopy.splice(0, NUMBER_COMMENTS_SHOW), allCommentsCount);
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', makeRemainingComments); // добавляем обработчик на кнопку загрузки комментариев
};

const hideBigPhoto = () => {
  body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  socialComCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPhoto();
    document.removeEventListener('keydown', onBigPhotoEscKeydown);
  }
};

const openBigPhoto = (miniPhoto) => {
  body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
  const currentElement = photos.find((item) => item.id === Number(miniPhoto.dataset.id));
  bigPhotoImg.src = currentElement.url;
  photoDescription.textContent = currentElement.description;
  photoLikes.textContent = currentElement.likes;
  commentsCount.textContent = currentElement.comments.length;
  clearComments();
  countAllCommentsShow = 0;
  createComments(currentElement.comments);
  document.addEventListener('keydown', onBigPhotoEscKeydown);
};

photoContainer.addEventListener('click', (evt) => {
  const miniPhoto = evt.target.closest('.picture');
  if (!miniPhoto) {return;}

  if (!photoContainer.contains(miniPhoto)) {return;}

  openBigPhoto(miniPhoto);
});

const closeBigPhoto = () => {
  closePhotoButton.addEventListener('click', () => {
    hideBigPhoto();
    document.removeEventListener('keydown', onBigPhotoEscKeydown);
  });
};

closeBigPhoto();
