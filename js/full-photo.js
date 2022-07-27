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

const makeComment = (comments) => {
  //debugger;
  const fragmentComments = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const newComment = socialComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    fragmentComments.appendChild(newComment);
  });

  allComments.append(fragmentComments);
};
//функция показа следующих комментариев
function changeSliceComments (comments) {

  countAllCommentsShow += NUMBER_COMMENTS_SHOW;
  makeComment(comments.slice(countAllCommentsShow, countAllCommentsShow + NUMBER_COMMENTS_SHOW));

  if(countAllCommentsShow >= comments.length) {
    socialComCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    commentsLoader.classList.add('hidden');
  } else {
    socialComCount.textContent = `${countAllCommentsShow} из ${comments.length} комментариев`;
  }
}

const pressBtnLoader = (comments) => {
  const commentsList = comments.length;

  if (commentsList > NUMBER_COMMENTS_SHOW) {
    makeComment(comments.slice(0, NUMBER_COMMENTS_SHOW));
    commentsLoader.addEventListener('click', () => {
      changeSliceComments(comments);
    });
  } else {
    makeComment(comments);
    socialComCount.textContent = `${commentsList} из ${commentsList} комментариев`;
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
  allComments.innerHTML = '';
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
