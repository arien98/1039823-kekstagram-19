'use strict';

(function () {
  // Применение эффекта к изображению
  var imageForm = document.querySelector('.img-upload__overlay');
  var effectsList = imageForm.querySelector('.effects__list');
  var image = imageForm.querySelector('.img-upload__preview');

  var moveMouseEffectHandler = function () {
    var pin = imageForm.querySelector('.effect-level__pin');
    pin.addEventListener('mouseup', function () {
    });
  };

  var pressEffectButtonHandler = function (evt) {
    image.className = 'img-upload__preview ' + window.utils.filter[evt.target.value].className;

    imageForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    if (evt.target.value !== 'none') {
      imageForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
      moveMouseEffectHandler();
    }
  };

  effectsList.addEventListener('change', pressEffectButtonHandler);
})();
