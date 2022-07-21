import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const hashtagsText = form.querySelector('.text__hashtags');
const descriptionText = form.querySelector('.text__description');
const buttomCancel = form.querySelector('#upload-cancel');
const MAX_LENGTH_COMMENT = 140;
const MAX_COUNT_HASHTAGS = 5;
const re = /^#[A-Za-zА-яа-яЁё0-9]{2,19}$/;

const onImgUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  }
};

const openImgUpload = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onImgUploadEscKeydown);
};
uploadFile.addEventListener('change', openImgUpload);

const closeImgUpload = () => {
  buttomCancel.addEventListener('click', () => {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onImgUploadEscKeydown);
  });
};
closeImgUpload();

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const validateDescriptionText = (string) => string.length <= MAX_LENGTH_COMMENT;

const hashtagArray = (value) => value.toLowerCase().trim().split(' ');
const validHashteg = (value) => {
  const hashtags = hashtagArray(value);
  hashtags.every((hashtag) => re.test(hashtag));
};
const uniqHashtag = (value) => {
  const hashtags = hashtagArray(value);
  const uniqueHashtagArray = new Set(hashtags);
  return hashtagArray.length === uniqueHashtagArray.size;
};
const checkLengthHashteg = (value) => {
  const hashtags = hashtagArray(value);
  return hashtags.length <= MAX_COUNT_HASHTAGS;
};

pristine.addValidator(descriptionText, validateDescriptionText, `Текст не должен быть более ${MAX_LENGTH_COMMENT} символов`);
pristine.addValidator(hashtagsText, validHashteg, 'Хэштег должен начинается c #, содержать только буквы и цифры, быть не более 20 символов');
pristine.addValidator(hashtagsText, uniqHashtag, 'Хэш-теги не должны повторяться');
pristine.addValidator(hashtagsText, checkLengthHashteg, `Хэш-тегов не должно быть больше ${MAX_COUNT_HASHTAGS}`);


hashtagsText.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

descriptionText.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

form.addEventListener ('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid){
    console.log('Форма не верна');
  }
  console.log('Форма верна');
});
