'use strict';

(function () {
  var imageForm = document.querySelector('.img-upload__overlay');
  var effectsList = imageForm.querySelector('.effects__list');
  var image = imageForm.querySelector('.img-upload__preview');
  var pin = imageForm.querySelector('.effect-level__pin');
  var effectDepth = imageForm.querySelector('.effect-level__depth');
  var form = document.querySelector('.img-upload__form');
  var effect = 'none';

  var setEffect = function () {
    image.style.filter = window.utils.filter[effect].type + '(' + window.slider * window.utils.filter[effect].measure + window.utils.filter[effect].unit + ')';
  };

  var resetFilter = function () {
    image.style.filter = '';
    form.querySelector('.scale__control--value').value = '100%';
    form.querySelector('.effect-level__value').value = '20';
  };

  var resetSlider = function () {
    pin.style.left = '20%';
    effectDepth.style.width = '20%';
  };

  var mouseMoveHandler = function () {
    setEffect();
  };

  var pressEffectButtonHandler = function (evt) {
    document.removeEventListener('mousemove', mouseMoveHandler);
    resetFilter();
    resetSlider();
    effect = evt.target.value;
    image.className = 'img-upload__preview ' + window.utils.filter[effect].className;
    imageForm.querySelector('.img-upload__effect-level').classList.add('hidden');
    if (evt.target.value !== 'none') {
      imageForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
      pin.addEventListener('mousedown', function () {
        document.addEventListener('mousemove', mouseMoveHandler);
      });
    }
  };

  effectsList.addEventListener('change', pressEffectButtonHandler);

  window.effects = {
    resetFilter: resetFilter
  };
})();
