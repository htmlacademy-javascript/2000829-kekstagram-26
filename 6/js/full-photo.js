const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img');
const photoDescription = bigPhoto.querySelector('.social__caption');
const photoLikes = bigPhoto.querySelector('.social__likes');

//block comments
const allComments = bigPhoto.querySelector('.social__comments');
const commentsCount = bigPhoto.querySelector('.comments-count');
const socialComCaunt = bigPhoto.querySelector('.social__comment-count');
const commentsLoader = bigPhoto.querySelector('.comments-loader');

const makeTemplateCom = function (avatar, name, message) {
  const newComment = document.createElement('li');
  newComment.classList.add('social__commen');
  const newCommentPicture = document.createElement('img');
  newCommentPicture.classList.add('social__picture');
  newCommentPicture.scr = avatar;
  newCommentPicture.alt = name;
  const newCommentText = document.createElement('p');
  newCommentText.classList.add('social__text');
  newCommentText.textContent = message;

  newComment.append(newCommentPicture);
  newComment.append(newCommentText);

  return newComment;
};

//block open bigPhoto
const openBigPhoto = ({url, description,likes, comments}) => {
  body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
  socialComCaunt.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPhotoImg.src = url;
  photoDescription.textContent = description;
  photoLikes.textContent = likes;
  commentsCount.textContent = comments.length;
  const fragmentComments = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragmentComments.appendChild(makeTemplateCom(comment));
  });
  allComments.innerHTML = '';
  allComments.append(fragmentComments);
};

//block close bigPhoto
const closeBigPhoto = () => {
  const closePhotoButton = bigPhoto.querySelector('.cancel');
  closePhotoButton.addEventListener('click', () => {
    body.classList.remove('modal-open');
    bigPhoto.classList.add('hidden');
    socialComCaunt.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      body.classList.remove('modal-open');
      bigPhoto.classList.add('hidden');
      socialComCaunt.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
    }
  });
};

export {openBigPhoto, closeBigPhoto};
