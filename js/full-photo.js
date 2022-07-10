const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoImg = bigPhoto.querySelector('.big-picture__img img');
const photoDescription = bigPhoto.querySelector('.social__caption');
const photoLikes = bigPhoto.querySelector('.social__likes');

//block comments
const allComments = bigPhoto.querySelector('.social__comments');
const commentsCount = bigPhoto.querySelector('.comments-count');
const socialComCount = bigPhoto.querySelector('.social__comment-count');
const commentsLoader = bigPhoto.querySelector('.comments-loader');


const makeTemplateCom = ({avatar, name, message}) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__commen');
  const newCommentPicture = document.createElement('img');
  newCommentPicture.classList.add('social__picture');
  newCommentPicture.src = avatar;
  newCommentPicture.alt = name;
  newCommentPicture.width = '35';
  newCommentPicture.height = '35';
  const newCommentText = document.createElement('p');
  newCommentText.classList.add('social__text');
  newCommentText.textContent = message;

  newComment.append(newCommentPicture);
  newComment.append(newCommentText);

  return newComment;
};

/*
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
*/
//block open bigPhoto

const openBigPhoto = ({url, description,likes, comments}) => {
  body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');
  socialComCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPhotoImg.src = url;
  photoDescription.textContent = description;
  photoLikes.textContent = likes;
  commentsCount.textContent = comments.length;
  //makeComment(comments);
  const fragmentComments = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragmentComments.appendChild(makeTemplateCom(comment));
  });
  allComments.innerHTML = '';
  allComments.append(fragmentComments);
};

const photoContainer = document.querySelector('.pictures');
photoContainer.onclick = (evt) => {
  const a = evt.target.closest('a');
  if (!a) {return;}

  if (!photoContainer.contains(a)) {return;}

  openBigPhoto(a); // (4)
};

const hideBigPhoto = () => {
  body.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  socialComCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};
//block close bigPhoto
const closeBigPhoto = () => {
  const closePhotoButton = bigPhoto.querySelector('.cancel');
  closePhotoButton.addEventListener('click', () => {
    hideBigPhoto();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      hideBigPhoto();
    }
  });
};

closeBigPhoto();
