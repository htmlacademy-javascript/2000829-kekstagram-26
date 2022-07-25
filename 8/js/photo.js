import {allPhotos} from './data.js';


const allPicture = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photos = allPhotos();

const photoListFragment = document.createDocumentFragment();

photos.forEach(({id, url, comments, likes}) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.dataset.id = id;
  photoListFragment.appendChild(photoElement);
});

allPicture.appendChild(photoListFragment);

export {photos};
