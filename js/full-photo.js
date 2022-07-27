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

const makeComment = (comments) => {
  const socialComment = bigPhoto.querySelector('.social__comment');
  const fragmentComments = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const newComment = socialComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    fragmentComments.appendChild(newComment);
  });
  allComments.innerHTML = '';

  allComments.append(fragmentComments);
};

const pressBtnLoader = (comments) => {
  const commentsList = comments.length;

  if (commentsList > NUMBER_COMMENTS_SHOW) {
    makeComment(comments.slice(0, NUMBER_COMMENTS_SHOW));

    commentsLoader.addEventListener('click', () => {
      for (let i = 5; i < comments.length; i += 5) {

        makeComment(comments.slice(i, i + NUMBER_COMMENTS_SHOW));
      }
    });
  } else {
    makeComment(comments);
    socialComCount.textContent = commentsList;
    commentsLoader.classList.add('hidden');
  }
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
  pressBtnLoader(currentElement.comments);
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
