'use strict';

(function () {
  // Применение эффекта к изображению
  var imageForm = document.querySelector('.img-upload__overlay');
  var effectsList = imageForm.querySelector('.effects__list');
  var image = imageForm.querySelector('.img-upload__preview');
  var pin = imageForm.querySelector('.effect-level__pin');
  var effect = 'none';

  var setEffect = function () {
    image.style.filter = window.utils.filter[effect].type + '(' + window.slider * window.utils.filter[effect].measure + window.utils.filter[effect].unit + ')';
  };

  var resetFilter = function () {
    image.style.filter = window.utils.filter[effect].type + '(' + 100 * window.utils.filter[effect].measure + window.utils.filter[effect].unit + ')';
  };

  var pressEffectButtonHandler = function (evt) {
    effect = evt.target.value;
    resetFilter();
    image.className = 'img-upload__preview ' + window.utils.filter[effect].className;
    imageForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    if (evt.target.value !== 'none') {
      imageForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
      pin.addEventListener('mousedown', function () {
        document.addEventListener('mousemove', function () {
          setEffect();
        });
      });
    }
  };

  effectsList.addEventListener('change', pressEffectButtonHandler);
})();
