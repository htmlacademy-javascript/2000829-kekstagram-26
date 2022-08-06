const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const btnScaleSmaller = document.querySelector('.scale__control--smaller');
const btnScaleBigger = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
let originalScale = 100;

btnScaleSmaller.addEventListener('click', () => {
  if (originalScale === MAX_SCALE || originalScale !== MIN_SCALE) {
    originalScale -= STEP_SCALE;
    valueScale.value = `${originalScale}%`;
    imgUploadPreview.style.transform = `scale(${originalScale/MAX_SCALE})`;
  }
});

btnScaleBigger.addEventListener('click', () => {
  if (originalScale !== MAX_SCALE || originalScale === MIN_SCALE) {
    originalScale += STEP_SCALE;
    valueScale.value = `${originalScale}%`;
    imgUploadPreview.style.transform = `scale(${originalScale/MAX_SCALE})`;
  }
});
//масштаб

//эффекты
const sliderEffect = document.querySelector('.effect-level__slider');
//const effectsRadio = document.querySelectorAll('.effects__radio');
const valueEffect = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const uploadEffectLevel =  document.querySelector('.img-upload__effect-level');
let currentEffect = '';

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
  switch(currentEffect) {
    case 'chrome':
      imgUploadPreview.style.filter = `grayscale(${valueEffect.value})`;
      break;
    case 'sepia':
      imgUploadPreview.style.filter = `sepia(${valueEffect.value})`;
      break;
    case 'marvin':
      imgUploadPreview.style.filter = `invert(${valueEffect.value}%)`;
      break;
    case 'phobos':
      imgUploadPreview.style.filter = `blur(${valueEffect.value}px)`;
      break;
    case 'heat':
      imgUploadPreview.style.filter = `brightness(${valueEffect.value})`;
      break;
    default:
      imgUploadPreview.style.filter ='none';
  }
  //console.log(valueEffect.value);
});
uploadEffectLevel.classList.add('hidden');

effectsList.addEventListener('change', (evt) => { //причина здесь?

  const effectRadio = evt.target.value; //причина здесь?
  currentEffect = effectRadio;
  imgUploadPreview.className = '';
  imgUploadPreview.classList.add(`effects__preview--${effectRadio}`);
  uploadEffectLevel.classList.remove('hidden');
  sliderEffect.removeAttribute('disabled');
  switch (effectRadio) {

    case 'chrome':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'sepia':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'marvin':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    default:
      imgUploadPreview.style.filter = '';
      uploadEffectLevel.classList.add('hidden');
      sliderEffect.setAttribute('disabled', true);
  }
  //console.log(imgUploadPreview);
});


//sliderEffect.noUiSlider.updateOptions({});

// sliderEffect.removeAttribute('disabled');
// sliderEffect.noUiSlider.destroy();
