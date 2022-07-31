const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const BtnScaleSmaller = document.querySelector('.scale__control--smaller');
const BtnScaleBigger = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
let originalScale = 100;

BtnScaleSmaller.addEventListener('click', () => {
  if (originalScale === MAX_SCALE || originalScale !== MIN_SCALE) {
    originalScale -= STEP_SCALE;
    valueScale.value = `${originalScale}%`;
    imgUploadPreview.style.transform = `scale(${originalScale/MAX_SCALE})`;
  }
});

BtnScaleBigger.addEventListener('click', () => {
  if (originalScale !== MAX_SCALE || originalScale === MIN_SCALE) {
    originalScale += STEP_SCALE;
    valueScale.value = `${originalScale}%`;
    imgUploadPreview.style.transform = `scale(${originalScale/MAX_SCALE})`;
  }
});
//масштаб

//эффекты
const sliderEffect = document.querySelector('.effect-level__slider');
const effectsRadio = document.querySelectorAll('.effects__radio');
const valueEffect = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');


noUiSlider.create(sliderEffect, { //пчм слайдер не появился на картинке?
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderEffect.noUiSlider.on('update', () => {
  valueEffect.value = sliderEffect.noUiSlider.get();
});

effectsList.addEventListener('click', (evt) => { //причина здесь?

  const effectRadio = evt.target.value; //причина здесь?

  switch (effectRadio) { //причина здесь?

    case 'chrome':
      imgUploadPreview.classList.add('effects__preview--chrome');
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      imgUploadPreview.style.filter = `grayscale(${valueEffect.value})`;
      break;
    case 'sepia':
      imgUploadPreview.classList.add('effects__preview--sepia');
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      imgUploadPreview.style.filter = `sepia(${valueEffect.value})`;
      break;
    case 'marvin':
      imgUploadPreview.classList.add('effects__preview--marvin');
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 0,
        step: 1,
      });
      imgUploadPreview.style.filter = `invert(${valueEffect.value}%)`;
      break;
    case 'phobos':
      imgUploadPreview.classList.add('effects__preview--phobos');
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      imgUploadPreview.style.filter = `blur(${valueEffect.value}px)`;
      break;
    case 'heat':
      imgUploadPreview.classList.add('effects__preview--heat');
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 1,
        step: 0.1,
      });
      imgUploadPreview.style.filter = `brightness(${valueEffect.value})`;
      break;
    default:
      imgUploadPreview.classList.add('effects__preview--none');
      imgUploadPreview.style.filter ='none'; // не уверена правильно Для эффекта «Оригинал» CSS-стили filter удаляются
      sliderEffect.removeAttribute('disabled');
  }
});


//sliderEffect.noUiSlider.updateOptions({});

// sliderEffect.removeAttribute('disabled');
// sliderEffect.noUiSlider.destroy();
