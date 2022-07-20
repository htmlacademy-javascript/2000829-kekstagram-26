import {checkStringLength, isEscapeKey} from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const hashtags = form.querySelector('.text__hashtags');
const descriptionText = form.querySelector('.text__description');
const buttomCancel = form.querySelector('#upload-cancel');

const onImgUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  }
};

const openImgUpload = () => {
  uploadFile.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onImgUploadEscKeydown);
  });
};
openImgUpload();

const closeImgUpload = () => {
  buttomCancel.addEventListener('click', () => {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  });
};
closeImgUpload();

const pristine = new Pristine(form);

const validateHeshtags = (value) => {
  const re = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;
  const hashtagArray = value.toLowerCase().trim().split(' ');

  if (value.length > 5) {
    return 'Хэш-тегов не должно быть больше чем 5';
  }

  hashtagArray.forEach((hashtag) => {
    if(!re.test(hashtag)){
      return 'Хэштег должен начинается c #, содержать только буквы и цифры, быть не более 20 символов';
    }
  });

  const uniqueHashtagArray = new Set(hashtagArray);
  if (hashtagArray.length !== uniqueHashtagArray.size) {
    return 'Хэш-теги не должны повторяться';
  }
};

const validateDescriptionText = (string) => {
  if (!checkStringLength(string, 140)) {
    return 'Текст не должен быть более 140 символов';
  }
};

pristine.addValidator(hashtags, validateHeshtags);
pristine.addValidator(descriptionText, validateDescriptionText);

hashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

descriptionText.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

// form.addEventListener ('submit', (evt) => {
//   evt.preventDefault();

//   const isValid = pristine.validate();
//   if (isValid){

//   } else {

//   }
// });
